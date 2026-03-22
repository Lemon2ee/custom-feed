import { randomUUID } from "node:crypto";
import type { InputConnector, OutputConnector } from "../connectors/types";
import { normalizeEvent } from "../events/normalize";
import { defaultRuleEngine } from "../rules/engine";
import { logger } from "../observability/logger";
import { getRepository } from "@/src/db/repositories";

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

  const polled = await input.poll(
    { workspaceId, sourceId, cursor: source.lastCursor },
    source.config,
  );
  const rules = await repo.listRules(workspaceId);

  for (const item of polled.items) {
    const sourceType = (["rss", "youtube", "stock", "webhook", "custom"].includes(
      connectorId,
    )
      ? connectorId
      : "custom") as "rss" | "youtube" | "stock" | "webhook" | "custom";
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
      tags: item.tags,
      rawPayload: item.rawPayload,
    });
    const inserted = await repo.upsertEvent(event);
    if (!inserted.inserted) continue;

    const actions = defaultRuleEngine.evaluate(event, rules);
    for (const action of actions) {
      for (const outputId of action.outputIds) {
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
  }

  await repo.upsertSource({ ...source, lastCursor: polled.nextCursor });
  logger.info("source poll completed", {
    workspaceId,
    sourceId,
    connectorId,
    polledItems: polled.items.length,
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

  for (const delivery of pending) {
    const output = outputs.find((item) => item.id === delivery.outputId && item.enabled);
    const event = events.find((item) => item.id === delivery.eventId);
    if (!output || !event) continue;

    const connector = registry.outputs[output.pluginId];
    if (!connector) continue;

    const result = await connector.send(
      event,
      { workspaceId, outputId: output.id },
      output.config,
    );

    if (result.status === "sent") {
      await repo.upsertDelivery({
        ...delivery,
        status: "sent",
        attemptCount: delivery.attemptCount + 1,
        sentAt: new Date().toISOString(),
        receipt: result.receipt,
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
  }
}
