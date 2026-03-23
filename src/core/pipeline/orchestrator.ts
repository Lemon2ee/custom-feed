import { randomUUID } from "node:crypto";
import type { InputConnector, OutputConnector } from "../connectors/types";
import { normalizeEvent } from "../events/normalize";
import { logger } from "../observability/logger";
import { getRepository, type OutputSchedule } from "@/src/db/repositories";

export function isWithinDeliveryWindow(
  schedule: OutputSchedule | undefined,
  now = new Date(),
): boolean {
  if (!schedule || schedule.windows.length === 0) return true;

  let localNow: Date;
  try {
    const formatted = now.toLocaleString("en-US", { timeZone: schedule.timezone });
    localNow = new Date(formatted);
  } catch {
    return true;
  }

  const day = localNow.getDay();
  const hour = localNow.getHours();

  return schedule.windows.some((w) => {
    if (!w.days.includes(day)) return false;
    if (w.startHour <= w.endHour) {
      return hour >= w.startHour && hour < w.endHour;
    }
    // Overnight window (e.g., 22 -> 6)
    return hour >= w.startHour || hour < w.endHour;
  });
}

export function matchesSourceFilter(
  item: {
    title: string;
    contentText?: string;
    tags?: string[];
  },
  filter?: {
    includeKeywords?: string[];
    excludeKeywords?: string[];
  },
): boolean {
  if (!filter) return true;
  const haystack = [item.title, item.contentText, ...(item.tags ?? [])]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();

  const include = filter.includeKeywords?.filter(Boolean) ?? [];
  if (include.length > 0) {
    const matched = include.some((keyword) =>
      haystack.includes(keyword.toLowerCase()),
    );
    if (!matched) return false;
  }

  const exclude = filter.excludeKeywords?.filter(Boolean) ?? [];
  if (exclude.length > 0) {
    const blocked = exclude.some((keyword) =>
      haystack.includes(keyword.toLowerCase()),
    );
    if (blocked) return false;
  }

  return true;
}

export interface ConnectorRegistry {
  inputs: Record<string, InputConnector<unknown>>;
  outputs: Record<string, OutputConnector<unknown>>;
}

export async function runSourcePoll(
  workspaceId: string,
  sourceId: string,
  connectorId: string,
  registry: ConnectorRegistry,
) {
  const repo = getRepository();
  const source = (await repo.listSources(workspaceId)).find((item) => item.id === sourceId);
  if (!source || !source.enabled) return;

  const input = registry.inputs[connectorId];
  if (!input) throw new Error(`input connector not found: ${connectorId}`);

  let polled;
  try {
    polled = await input.poll(
      { workspaceId, sourceId, cursor: source.lastCursor },
      source.config,
    );
  } catch (error) {
    logger.error("source poll failed", {
      workspaceId,
      sourceId,
      connectorId,
      error: error instanceof Error ? error.message : String(error),
    });
    return;
  }
  const isInitialSync = !source.lastCursor && !source.lastPolledAt;

  for (const item of polled.items) {
    if (!matchesSourceFilter(item, source.filter)) {
      continue;
    }
    const knownSourceTypes = ["rss", "youtube", "bilibili", "hackernews", "steam-news", "stock", "webhook", "custom"] as const;
    const sourceType = (knownSourceTypes as readonly string[]).includes(connectorId)
      ? (connectorId as (typeof knownSourceTypes)[number])
      : "custom";
    const event = normalizeEvent({
      workspaceId,
      sourceId,
      sourceType,
      externalItemId: item.externalItemId,
      title: item.title,
      url: item.url,
      contentText: item.contentText,
      author: item.author,
      publishedAt: item.publishedAt,
      imageUrl: item.imageUrl,
      authorImageUrl: item.authorImageUrl,
      tags: item.tags,
      rawPayload: item.rawPayload,
    });
    const inserted = await repo.upsertEvent(event);
    if (!inserted.inserted) continue;

    if (isInitialSync) continue;

    for (const outputId of source.outputIds) {
      const deliveryId = randomUUID();
      await repo.upsertDelivery({
        id: deliveryId,
        workspaceId,
        eventId: event.id,
        outputId,
        status: "pending",
        attemptCount: 0,
      });
    }
  }

  const polledAt = new Date().toISOString();
  await repo.upsertSource({
    ...source,
    lastCursor: polled.nextCursor ?? source.lastCursor,
    lastPolledAt: polledAt,
  });
  logger.info("source poll completed", {
    workspaceId,
    sourceId,
    connectorId,
    polledItems: polled.items.length,
    initialSync: isInitialSync,
  });
}

export async function runPendingDeliveries(
  workspaceId: string,
  registry: ConnectorRegistry,
) {
  const repo = getRepository();
  const deliveries = await repo.listDeliveries(workspaceId);
  const pending = deliveries.filter((delivery) =>
    delivery.status === "pending" || delivery.status === "retrying"
  );
  const outputs = await repo.listOutputs(workspaceId);
  const events = await repo.listEvents(workspaceId);
  const sources = await repo.listSources(workspaceId);

  const outputPriorityMap = new Map(outputs.map((o) => [o.id, o.priority]));
  pending.sort((a, b) =>
    (outputPriorityMap.get(b.outputId) ?? 0) - (outputPriorityMap.get(a.outputId) ?? 0),
  );

  for (const delivery of pending) {
    const output = outputs.find((item) => item.id === delivery.outputId && item.enabled);
    const event = events.find((item) => item.id === delivery.eventId);
    if (!output || !event) continue;

    if (output.mutedUntil && new Date(output.mutedUntil) > new Date()) continue;
    if (!isWithinDeliveryWindow(output.schedule)) continue;

    const connector = registry.outputs[output.pluginId];
    if (!connector) continue;

    const source = sources.find((item) => item.id === event.sourceId);
    const overrides = source?.outputOverrides?.[output.id];
    const mergedConfig = overrides
      ? { ...output.config, ...overrides }
      : output.config;
    const result = await connector.send(
      event,
      { workspaceId, outputId: output.id, sourceName: source?.name },
      mergedConfig,
    );

    if (result.status === "sent") {
      await repo.upsertDelivery({
        ...delivery,
        status: "sent",
        attemptCount: delivery.attemptCount + 1,
        sentAt: new Date().toISOString(),
        receipt: result.receipt,
      });
      logger.info("delivery sent", {
        workspaceId,
        outputId: output.id,
        eventId: event.id,
      });
      continue;
    }

    const isRetryable = result.status === "retryable_error";
    const nextRetryAt = isRetryable
      ? new Date(Date.now() + (delivery.attemptCount + 1) * 60_000).toISOString()
      : undefined;
    await repo.upsertDelivery({
      ...delivery,
      status: isRetryable ? "retrying" : "failed",
      attemptCount: delivery.attemptCount + 1,
      nextRetryAt,
      lastError: result.error ?? "unknown error",
    });
    logger.warn("delivery failed", {
      workspaceId,
      outputId: output.id,
      eventId: event.id,
      retryable: isRetryable,
      error: result.error ?? "unknown error",
    });
  }
}
