import { eq, and, desc, inArray, count as drizzleCount } from "drizzle-orm";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import type { NormalizedEvent } from "@/src/core/events/types";
import type { Rule } from "@/src/core/rules/types";
import { createDedupeHash } from "@/src/core/events/dedupe";
import * as schema from "./schema";

export interface SourceRecord {
  id: string;
  workspaceId: string;
  name: string;
  pluginId: string;
  config: Record<string, unknown>;
  outputIds: string[];
  outputOverrides?: Record<string, Record<string, unknown>>;
  filter?: {
    includeKeywords?: string[];
    excludeKeywords?: string[];
  };
  pollIntervalSec: number;
  lastCursor?: string;
  lastPolledAt?: string;
  enabled: boolean;
}

export interface OutputSchedule {
  timezone: string;
  windows: Array<{
    days: number[];
    startHour: number;
    endHour: number;
  }>;
}

export interface OutputRecord {
  id: string;
  workspaceId: string;
  pluginId: string;
  config: Record<string, unknown>;
  enabled: boolean;
  mutedUntil?: string;
  priority: number;
  schedule?: OutputSchedule;
}

export interface DeliveryRecord {
  id: string;
  workspaceId: string;
  eventId: string;
  outputId: string;
  status: "pending" | "sent" | "retrying" | "failed";
  attemptCount: number;
  lastError?: string;
  nextRetryAt?: string;
  sentAt?: string;
  receipt?: Record<string, unknown>;
}

export interface Repository {
  listSources(workspaceId: string): Promise<SourceRecord[]>;
  upsertSource(source: SourceRecord): Promise<void>;
  deleteSource(workspaceId: string, sourceId: string): Promise<void>;
  updateSourceLastPolledAt(sourceId: string, iso: string): Promise<void>;
  listOutputs(workspaceId: string): Promise<OutputRecord[]>;
  upsertOutput(output: OutputRecord): Promise<void>;
  deleteOutput(workspaceId: string, outputId: string): Promise<void>;
  listRules(workspaceId: string): Promise<Rule[]>;
  upsertRule(rule: Rule): Promise<void>;
  upsertEvent(event: NormalizedEvent): Promise<{ inserted: boolean }>;
  listEvents(workspaceId: string): Promise<NormalizedEvent[]>;
  countEvents(workspaceId: string): Promise<number>;
  listEventsPaginated(
    workspaceId: string,
    opts: { page: number; pageSize: number },
  ): Promise<NormalizedEvent[]>;
  listDeliveriesByEventIds(eventIds: string[]): Promise<DeliveryRecord[]>;
  upsertDelivery(delivery: DeliveryRecord): Promise<void>;
  listDeliveries(workspaceId: string): Promise<DeliveryRecord[]>;
  getSetting(workspaceId: string, key: string): Promise<string | null>;
  setSetting(workspaceId: string, key: string, value: string): Promise<void>;
}

// ---------------------------------------------------------------------------
// D1 (Drizzle) implementation
// ---------------------------------------------------------------------------

type Db = DrizzleD1Database<Record<string, never>>;

class D1Repository implements Repository {
  constructor(private db: Db) {}

  async listSources(workspaceId: string): Promise<SourceRecord[]> {
    const rows = await this.db
      .select()
      .from(schema.sources)
      .where(eq(schema.sources.workspaceId, workspaceId));
    return rows.map(rowToSource);
  }

  async upsertSource(source: SourceRecord): Promise<void> {
    const values = sourceToRow(source);
    await this.db
      .insert(schema.sources)
      .values(values)
      .onConflictDoUpdate({
        target: schema.sources.id,
        set: {
          workspaceId: values.workspaceId,
          name: values.name,
          pluginId: values.pluginId,
          configJson: values.configJson,
          outputIdsJson: values.outputIdsJson,
          outputOverridesJson: values.outputOverridesJson,
          filterJson: values.filterJson,
          pollIntervalSec: values.pollIntervalSec,
          lastCursor: values.lastCursor,
          lastPolledAt: values.lastPolledAt,
          enabled: values.enabled,
        },
      });
  }

  async updateSourceLastPolledAt(sourceId: string, iso: string): Promise<void> {
    await this.db
      .update(schema.sources)
      .set({ lastPolledAt: iso })
      .where(eq(schema.sources.id, sourceId));
  }

  async deleteSource(workspaceId: string, sourceId: string): Promise<void> {
    const eventRows = await this.db
      .select({ id: schema.events.id })
      .from(schema.events)
      .where(eq(schema.events.sourceId, sourceId));

    for (const row of eventRows) {
      await this.db
        .delete(schema.deliveries)
        .where(eq(schema.deliveries.eventId, row.id!));
      await this.db.delete(schema.events).where(eq(schema.events.id, row.id!));
    }

    await this.db
      .delete(schema.sources)
      .where(eq(schema.sources.id, sourceId));
  }

  async listOutputs(workspaceId: string): Promise<OutputRecord[]> {
    const rows = await this.db
      .select()
      .from(schema.outputs)
      .where(eq(schema.outputs.workspaceId, workspaceId));
    return rows.map(rowToOutput);
  }

  async upsertOutput(output: OutputRecord): Promise<void> {
    const values = outputToRow(output);
    await this.db
      .insert(schema.outputs)
      .values(values)
      .onConflictDoUpdate({
        target: schema.outputs.id,
        set: {
          workspaceId: values.workspaceId,
          pluginId: values.pluginId,
          configJson: values.configJson,
          enabled: values.enabled,
          mutedUntil: values.mutedUntil,
          priority: values.priority,
          scheduleJson: values.scheduleJson,
        },
      });
  }

  async deleteOutput(workspaceId: string, outputId: string): Promise<void> {
    await this.db
      .delete(schema.outputs)
      .where(eq(schema.outputs.id, outputId));
  }

  async listRules(workspaceId: string): Promise<Rule[]> {
    const rows = await this.db
      .select()
      .from(schema.rules)
      .where(eq(schema.rules.workspaceId, workspaceId));
    return rows.map(rowToRule);
  }

  async upsertRule(rule: Rule): Promise<void> {
    const values = ruleToRow(rule);
    await this.db
      .insert(schema.rules)
      .values(values)
      .onConflictDoUpdate({
        target: schema.rules.id,
        set: {
          workspaceId: values.workspaceId,
          name: values.name,
          priority: values.priority,
          enabled: values.enabled,
          matchJson: values.matchJson,
          actionJson: values.actionJson,
        },
      });
  }

  async upsertEvent(event: NormalizedEvent): Promise<{ inserted: boolean }> {
    const values = eventToRow(event);
    const result = await this.db
      .insert(schema.events)
      .values(values)
      .onConflictDoNothing()
      .returning({ id: schema.events.id });
    return { inserted: result.length > 0 };
  }

  async listEvents(workspaceId: string): Promise<NormalizedEvent[]> {
    const rows = await this.db
      .select()
      .from(schema.events)
      .where(eq(schema.events.workspaceId, workspaceId))
      .orderBy(desc(schema.events.publishedAt));
    return rows.map(rowToEvent);
  }

  async countEvents(workspaceId: string): Promise<number> {
    const rows = await this.db
      .select({ value: drizzleCount() })
      .from(schema.events)
      .where(eq(schema.events.workspaceId, workspaceId));
    return rows[0]?.value ?? 0;
  }

  async listEventsPaginated(
    workspaceId: string,
    opts: { page: number; pageSize: number },
  ): Promise<NormalizedEvent[]> {
    const rows = await this.db
      .select()
      .from(schema.events)
      .where(eq(schema.events.workspaceId, workspaceId))
      .orderBy(desc(schema.events.publishedAt))
      .limit(opts.pageSize)
      .offset((opts.page - 1) * opts.pageSize);
    return rows.map(rowToEvent);
  }

  async listDeliveriesByEventIds(eventIds: string[]): Promise<DeliveryRecord[]> {
    if (eventIds.length === 0) return [];
    const rows = await this.db
      .select()
      .from(schema.deliveries)
      .where(inArray(schema.deliveries.eventId, eventIds));
    return rows.map(rowToDelivery);
  }

  async upsertDelivery(delivery: DeliveryRecord): Promise<void> {
    const values = deliveryToRow(delivery);
    await this.db
      .insert(schema.deliveries)
      .values(values)
      .onConflictDoUpdate({
        target: schema.deliveries.id,
        set: {
          workspaceId: values.workspaceId,
          eventId: values.eventId,
          outputId: values.outputId,
          status: values.status,
          attemptCount: values.attemptCount,
          lastError: values.lastError,
          nextRetryAt: values.nextRetryAt,
          sentAt: values.sentAt,
          receiptJson: values.receiptJson,
        },
      });
  }

  async listDeliveries(workspaceId: string): Promise<DeliveryRecord[]> {
    const rows = await this.db
      .select()
      .from(schema.deliveries)
      .where(eq(schema.deliveries.workspaceId, workspaceId));
    return rows.map(rowToDelivery);
  }

  async getSetting(workspaceId: string, key: string): Promise<string | null> {
    const rows = await this.db
      .select()
      .from(schema.workspaceSettings)
      .where(
        and(
          eq(schema.workspaceSettings.workspaceId, workspaceId),
          eq(schema.workspaceSettings.key, key),
        ),
      )
      .limit(1);
    return rows[0]?.value ?? null;
  }

  async setSetting(
    workspaceId: string,
    key: string,
    value: string,
  ): Promise<void> {
    await this.db
      .insert(schema.workspaceSettings)
      .values({ workspaceId, key, value })
      .onConflictDoUpdate({
        target: [
          schema.workspaceSettings.workspaceId,
          schema.workspaceSettings.key,
        ],
        set: { value },
      });
  }
}

// ---------------------------------------------------------------------------
// Row <-> domain mappers
// ---------------------------------------------------------------------------

function rowToSource(row: typeof schema.sources.$inferSelect): SourceRecord {
  return {
    id: row.id!,
    workspaceId: row.workspaceId,
    name: row.name,
    pluginId: row.pluginId,
    config: JSON.parse(row.configJson) as Record<string, unknown>,
    outputIds: JSON.parse(row.outputIdsJson) as string[],
    outputOverrides: row.outputOverridesJson?.startsWith("{")
      ? (JSON.parse(row.outputOverridesJson) as Record<string, Record<string, unknown>>)
      : undefined,
    filter: row.filterJson
      ? (JSON.parse(row.filterJson) as SourceRecord["filter"])
      : undefined,
    pollIntervalSec: row.pollIntervalSec,
    lastCursor: row.lastCursor ?? undefined,
    lastPolledAt: row.lastPolledAt ?? undefined,
    enabled: row.enabled,
  };
}

function sourceToRow(source: SourceRecord) {
  return {
    id: source.id,
    workspaceId: source.workspaceId,
    name: source.name,
    pluginId: source.pluginId,
    configJson: JSON.stringify(source.config),
    outputIdsJson: JSON.stringify(source.outputIds),
    outputOverridesJson: source.outputOverrides
      ? JSON.stringify(source.outputOverrides)
      : null,
    filterJson: source.filter ? JSON.stringify(source.filter) : null,
    pollIntervalSec: source.pollIntervalSec,
    lastCursor: source.lastCursor ?? null,
    lastPolledAt: source.lastPolledAt ?? null,
    enabled: source.enabled,
  };
}

function rowToOutput(row: typeof schema.outputs.$inferSelect): OutputRecord {
  let mutedUntil: string | undefined;
  if (row.mutedUntil && !Number.isNaN(new Date(row.mutedUntil).getTime())) {
    mutedUntil =
      new Date(row.mutedUntil).getTime() > Date.now()
        ? row.mutedUntil
        : undefined;
  }
  return {
    id: row.id!,
    workspaceId: row.workspaceId,
    pluginId: row.pluginId,
    config: JSON.parse(row.configJson) as Record<string, unknown>,
    enabled: row.enabled,
    mutedUntil,
    priority: row.priority,
    schedule: row.scheduleJson?.startsWith("{")
      ? (JSON.parse(row.scheduleJson) as OutputSchedule)
      : undefined,
  };
}

function outputToRow(output: OutputRecord) {
  return {
    id: output.id,
    workspaceId: output.workspaceId,
    pluginId: output.pluginId,
    configJson: JSON.stringify(output.config),
    enabled: output.enabled,
    mutedUntil: output.mutedUntil ?? null,
    priority: output.priority,
    scheduleJson: output.schedule ? JSON.stringify(output.schedule) : null,
  };
}

function rowToRule(row: typeof schema.rules.$inferSelect): Rule {
  return {
    id: row.id!,
    workspaceId: row.workspaceId,
    name: row.name,
    priority: row.priority,
    enabled: row.enabled,
    condition: JSON.parse(row.matchJson) as Rule["condition"],
    action: JSON.parse(row.actionJson) as Rule["action"],
  };
}

function ruleToRow(rule: Rule) {
  return {
    id: rule.id,
    workspaceId: rule.workspaceId,
    name: rule.name,
    priority: rule.priority,
    enabled: rule.enabled,
    matchJson: JSON.stringify(rule.condition),
    actionJson: JSON.stringify(rule.action),
  };
}

function rowToEvent(row: typeof schema.events.$inferSelect): NormalizedEvent {
  return {
    id: row.id!,
    workspaceId: row.workspaceId,
    sourceId: row.sourceId,
    sourceType: row.sourceType as NormalizedEvent["sourceType"],
    externalItemId: row.externalItemId,
    title: row.title,
    url: row.url ?? undefined,
    contentText: row.contentText ?? undefined,
    author: row.author ?? undefined,
    publishedAt: row.publishedAt ?? undefined,
    imageUrl: row.imageUrl ?? undefined,
    authorImageUrl: row.authorImageUrl ?? undefined,
    tags: JSON.parse(row.tagsJson) as string[],
    rawPayload: JSON.parse(row.rawJson) as unknown,
    createdAt: row.createdAt,
  };
}

function eventToRow(event: NormalizedEvent) {
  return {
    id: event.id,
    workspaceId: event.workspaceId,
    sourceId: event.sourceId,
    sourceType: event.sourceType,
    externalItemId: event.externalItemId,
    dedupeHash: createDedupeHash(event),
    title: event.title,
    url: event.url ?? null,
    contentText: event.contentText ?? null,
    author: event.author ?? null,
    publishedAt: event.publishedAt ?? null,
    imageUrl: event.imageUrl ?? null,
    authorImageUrl: event.authorImageUrl ?? null,
    tagsJson: JSON.stringify(event.tags),
    rawJson: JSON.stringify(event.rawPayload),
    createdAt: event.createdAt,
  };
}

function rowToDelivery(
  row: typeof schema.deliveries.$inferSelect,
): DeliveryRecord {
  return {
    id: row.id!,
    workspaceId: row.workspaceId,
    eventId: row.eventId,
    outputId: row.outputId,
    status: row.status as DeliveryRecord["status"],
    attemptCount: row.attemptCount,
    lastError: row.lastError ?? undefined,
    nextRetryAt: row.nextRetryAt ?? undefined,
    sentAt: row.sentAt ?? undefined,
    receipt: row.receiptJson
      ? (JSON.parse(row.receiptJson) as Record<string, unknown>)
      : undefined,
  };
}

function deliveryToRow(delivery: DeliveryRecord) {
  return {
    id: delivery.id,
    workspaceId: delivery.workspaceId,
    eventId: delivery.eventId,
    outputId: delivery.outputId,
    status: delivery.status,
    attemptCount: delivery.attemptCount,
    lastError: delivery.lastError ?? null,
    nextRetryAt: delivery.nextRetryAt ?? null,
    sentAt: delivery.sentAt ?? null,
    receiptJson: delivery.receipt ? JSON.stringify(delivery.receipt) : null,
  };
}

// ---------------------------------------------------------------------------
// Factory -- resolves D1 from Cloudflare Workers env
// ---------------------------------------------------------------------------

let _d1: D1Database | undefined;
try {
  const mod = await import("cloudflare:workers");
  _d1 = (mod.env as { DB?: D1Database }).DB;
} catch {
  // cloudflare:workers unavailable — use wrangler dev locally
}

let cachedRepo: Repository | undefined;

export function createD1Repository(d1: D1Database): Repository {
  return new D1Repository(drizzle(d1) as unknown as Db);
}

export function getRepository(): Repository {
  if (cachedRepo) return cachedRepo;
  if (!_d1) {
    throw new Error(
      "D1 database binding not found. Run the app with `wrangler dev` or deploy to Cloudflare Workers.",
    );
  }
  cachedRepo = createD1Repository(_d1);
  return cachedRepo;
}
