import { Kysely, sql } from "kysely";
import type { Selectable, Insertable } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { NormalizedEvent } from "@/src/core/events/types";
import type { Rule } from "@/src/core/rules/types";
import { createDedupeHash } from "@/src/core/events/dedupe";
import type {
  Database,
  SourcesTable,
  OutputsTable,
  EventsTable,
  RulesTable,
  DeliveriesTable,
  PollLogsTable,
} from "./schema";

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

export interface PollLogRecord {
  id: string;
  workspaceId: string;
  sourceId: string;
  sourceName: string;
  connectorId: string;
  startedAt: string;
  completedAt?: string;
  status: "success" | "error";
  itemsFetched?: number;
  newEvents?: number;
  errorMessage?: string;
  details?: Record<string, unknown>;
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
  insertPollLog(log: PollLogRecord): Promise<void>;
  listPollLogsPaginated(
    workspaceId: string,
    opts: { page: number; pageSize: number },
  ): Promise<{ data: PollLogRecord[]; total: number }>;
  listPollIncidents(
    workspaceId: string,
    opts: { gapThresholdSec: number; limit: number },
  ): Promise<Array<{ gapStart: string; gapEnd: string; gapSec: number }>>;
}

// ---------------------------------------------------------------------------
// D1 (Kysely) implementation
// ---------------------------------------------------------------------------

class D1Repository implements Repository {
  constructor(private db: Kysely<Database>) {}

  async listSources(workspaceId: string): Promise<SourceRecord[]> {
    const rows = await this.db
      .selectFrom("sources")
      .selectAll()
      .where("workspace_id", "=", workspaceId)
      .execute();
    return rows.map(rowToSource);
  }

  async upsertSource(source: SourceRecord): Promise<void> {
    const values = sourceToRow(source);
    await this.db
      .insertInto("sources")
      .values(values)
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          workspace_id: values.workspace_id,
          name: values.name,
          plugin_id: values.plugin_id,
          config_json: values.config_json,
          output_ids_json: values.output_ids_json,
          output_overrides_json: values.output_overrides_json,
          filter_json: values.filter_json,
          poll_interval_sec: values.poll_interval_sec,
          last_cursor: values.last_cursor,
          last_polled_at: values.last_polled_at,
          enabled: values.enabled,
        }),
      )
      .execute();
  }

  async updateSourceLastPolledAt(sourceId: string, iso: string): Promise<void> {
    await this.db
      .updateTable("sources")
      .set({ last_polled_at: iso })
      .where("id", "=", sourceId)
      .execute();
  }

  async deleteSource(workspaceId: string, sourceId: string): Promise<void> {
    const eventRows = await this.db
      .selectFrom("events")
      .select("id")
      .where("source_id", "=", sourceId)
      .execute();

    if (eventRows.length > 0) {
      const eventIds = eventRows.map((r) => r.id);
      await this.db
        .deleteFrom("deliveries")
        .where("event_id", "in", eventIds)
        .execute();
    }

    await this.db
      .deleteFrom("events")
      .where("source_id", "=", sourceId)
      .execute();

    await this.db
      .deleteFrom("sources")
      .where("id", "=", sourceId)
      .execute();
  }

  async listOutputs(workspaceId: string): Promise<OutputRecord[]> {
    const rows = await this.db
      .selectFrom("outputs")
      .selectAll()
      .where("workspace_id", "=", workspaceId)
      .execute();
    return rows.map(rowToOutput);
  }

  async upsertOutput(output: OutputRecord): Promise<void> {
    const values = outputToRow(output);
    await this.db
      .insertInto("outputs")
      .values(values)
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          workspace_id: values.workspace_id,
          plugin_id: values.plugin_id,
          config_json: values.config_json,
          enabled: values.enabled,
          muted_until: values.muted_until,
          priority: values.priority,
          schedule_json: values.schedule_json,
        }),
      )
      .execute();
  }

  async deleteOutput(workspaceId: string, outputId: string): Promise<void> {
    await this.db
      .deleteFrom("outputs")
      .where("id", "=", outputId)
      .execute();
  }

  async listRules(workspaceId: string): Promise<Rule[]> {
    const rows = await this.db
      .selectFrom("rules")
      .selectAll()
      .where("workspace_id", "=", workspaceId)
      .execute();
    return rows.map(rowToRule);
  }

  async upsertRule(rule: Rule): Promise<void> {
    const values = ruleToRow(rule);
    await this.db
      .insertInto("rules")
      .values(values)
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          workspace_id: values.workspace_id,
          name: values.name,
          priority: values.priority,
          enabled: values.enabled,
          match_json: values.match_json,
          action_json: values.action_json,
        }),
      )
      .execute();
  }

  async upsertEvent(event: NormalizedEvent): Promise<{ inserted: boolean }> {
    const values = eventToRow(event);
    const result = await this.db
      .insertInto("events")
      .values(values)
      .onConflict((oc) => oc.doNothing())
      .returning("id")
      .execute();
    return { inserted: result.length > 0 };
  }

  async listEvents(workspaceId: string): Promise<NormalizedEvent[]> {
    const rows = await this.db
      .selectFrom("events")
      .selectAll()
      .where("workspace_id", "=", workspaceId)
      .orderBy("published_at", "desc")
      .execute();
    return rows.map(rowToEvent);
  }

  async countEvents(workspaceId: string): Promise<number> {
    const result = await this.db
      .selectFrom("events")
      .select(({ fn }) => fn.countAll<number>().as("count"))
      .where("workspace_id", "=", workspaceId)
      .executeTakeFirst();
    return Number(result?.count ?? 0);
  }

  async listEventsPaginated(
    workspaceId: string,
    opts: { page: number; pageSize: number },
  ): Promise<NormalizedEvent[]> {
    const rows = await this.db
      .selectFrom("events")
      .selectAll()
      .where("workspace_id", "=", workspaceId)
      .orderBy("published_at", "desc")
      .limit(opts.pageSize)
      .offset((opts.page - 1) * opts.pageSize)
      .execute();
    return rows.map(rowToEvent);
  }

  async listDeliveriesByEventIds(eventIds: string[]): Promise<DeliveryRecord[]> {
    if (eventIds.length === 0) return [];
    const rows = await this.db
      .selectFrom("deliveries")
      .selectAll()
      .where("event_id", "in", eventIds)
      .execute();
    return rows.map(rowToDelivery);
  }

  async upsertDelivery(delivery: DeliveryRecord): Promise<void> {
    const values = deliveryToRow(delivery);
    await this.db
      .insertInto("deliveries")
      .values(values)
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          workspace_id: values.workspace_id,
          event_id: values.event_id,
          output_id: values.output_id,
          status: values.status,
          attempt_count: values.attempt_count,
          last_error: values.last_error,
          next_retry_at: values.next_retry_at,
          sent_at: values.sent_at,
          receipt_json: values.receipt_json,
        }),
      )
      .execute();
  }

  async listDeliveries(workspaceId: string): Promise<DeliveryRecord[]> {
    const rows = await this.db
      .selectFrom("deliveries")
      .selectAll()
      .where("workspace_id", "=", workspaceId)
      .execute();
    return rows.map(rowToDelivery);
  }

  async getSetting(workspaceId: string, key: string): Promise<string | null> {
    const row = await this.db
      .selectFrom("workspace_settings")
      .select("value")
      .where("workspace_id", "=", workspaceId)
      .where("key", "=", key)
      .executeTakeFirst();
    return row?.value ?? null;
  }

  async setSetting(
    workspaceId: string,
    key: string,
    value: string,
  ): Promise<void> {
    await this.db
      .insertInto("workspace_settings")
      .values({ workspace_id: workspaceId, key, value })
      .onConflict((oc) =>
        oc.columns(["workspace_id", "key"]).doUpdateSet({ value }),
      )
      .execute();
  }

  async insertPollLog(log: PollLogRecord): Promise<void> {
    await this.db
      .insertInto("poll_logs")
      .values({
        id: log.id,
        workspace_id: log.workspaceId,
        source_id: log.sourceId,
        source_name: log.sourceName,
        connector_id: log.connectorId,
        started_at: log.startedAt,
        completed_at: log.completedAt ?? null,
        status: log.status,
        items_fetched: log.itemsFetched ?? null,
        new_events: log.newEvents ?? null,
        error_message: log.errorMessage ?? null,
        details_json: log.details != null ? JSON.stringify(log.details) : null,
      })
      .execute();
  }

  async listPollLogsPaginated(
    workspaceId: string,
    opts: { page: number; pageSize: number },
  ): Promise<{ data: PollLogRecord[]; total: number }> {
    const [rows, countResult] = await Promise.all([
      this.db
        .selectFrom("poll_logs")
        .selectAll()
        .where("workspace_id", "=", workspaceId)
        .orderBy("started_at", "desc")
        .limit(opts.pageSize)
        .offset((opts.page - 1) * opts.pageSize)
        .execute(),
      this.db
        .selectFrom("poll_logs")
        .select(({ fn }) => fn.countAll<number>().as("count"))
        .where("workspace_id", "=", workspaceId)
        .executeTakeFirst(),
    ]);
    return {
      data: rows.map(rowToPollLog),
      total: Number(countResult?.count ?? 0),
    };
  }
  async listPollIncidents(
    workspaceId: string,
    opts: { gapThresholdSec: number; limit: number },
  ): Promise<Array<{ gapStart: string; gapEnd: string; gapSec: number }>> {
    const rows = await sql<{
      gap_start: string;
      gap_end: string;
      gap_sec: number;
    }>`
      WITH ordered AS (
        SELECT
          started_at,
          LAG(started_at) OVER (ORDER BY started_at) AS prev_started_at
        FROM poll_logs
        WHERE workspace_id = ${workspaceId}
      )
      SELECT
        prev_started_at AS gap_start,
        started_at      AS gap_end,
        ROUND((julianday(started_at) - julianday(prev_started_at)) * 86400) AS gap_sec
      FROM ordered
      WHERE gap_sec > ${opts.gapThresholdSec}
      ORDER BY started_at DESC
      LIMIT ${opts.limit}
    `.execute(this.db);

    return rows.rows.map((r) => ({
      gapStart: r.gap_start,
      gapEnd: r.gap_end,
      gapSec: r.gap_sec,
    }));
  }
}

// ---------------------------------------------------------------------------
// Row <-> domain mappers
// ---------------------------------------------------------------------------

function rowToSource(row: Selectable<SourcesTable>): SourceRecord {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    name: row.name,
    pluginId: row.plugin_id,
    config: JSON.parse(row.config_json) as Record<string, unknown>,
    outputIds: JSON.parse(row.output_ids_json) as string[],
    outputOverrides: row.output_overrides_json?.startsWith("{")
      ? (JSON.parse(row.output_overrides_json) as Record<string, Record<string, unknown>>)
      : undefined,
    filter: row.filter_json
      ? (JSON.parse(row.filter_json) as SourceRecord["filter"])
      : undefined,
    pollIntervalSec: row.poll_interval_sec,
    lastCursor: row.last_cursor ?? undefined,
    lastPolledAt: row.last_polled_at ?? undefined,
    enabled: row.enabled === 1,
  };
}

function sourceToRow(source: SourceRecord): Insertable<SourcesTable> {
  return {
    id: source.id,
    workspace_id: source.workspaceId,
    name: source.name,
    plugin_id: source.pluginId,
    config_json: JSON.stringify(source.config),
    output_ids_json: JSON.stringify(source.outputIds),
    output_overrides_json: source.outputOverrides
      ? JSON.stringify(source.outputOverrides)
      : null,
    filter_json: source.filter ? JSON.stringify(source.filter) : null,
    poll_interval_sec: source.pollIntervalSec,
    last_cursor: source.lastCursor ?? null,
    last_polled_at: source.lastPolledAt ?? null,
    enabled: source.enabled ? 1 : 0,
  };
}

function rowToOutput(row: Selectable<OutputsTable>): OutputRecord {
  let mutedUntil: string | undefined;
  if (row.muted_until && !Number.isNaN(new Date(row.muted_until).getTime())) {
    mutedUntil =
      new Date(row.muted_until).getTime() > Date.now()
        ? row.muted_until
        : undefined;
  }
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    pluginId: row.plugin_id,
    config: JSON.parse(row.config_json) as Record<string, unknown>,
    enabled: row.enabled === 1,
    mutedUntil,
    priority: row.priority,
    schedule: row.schedule_json?.startsWith("{")
      ? (JSON.parse(row.schedule_json) as OutputSchedule)
      : undefined,
  };
}

function outputToRow(output: OutputRecord): Insertable<OutputsTable> {
  return {
    id: output.id,
    workspace_id: output.workspaceId,
    plugin_id: output.pluginId,
    config_json: JSON.stringify(output.config),
    enabled: output.enabled ? 1 : 0,
    muted_until: output.mutedUntil ?? null,
    priority: output.priority,
    schedule_json: output.schedule ? JSON.stringify(output.schedule) : null,
  };
}

function rowToRule(row: Selectable<RulesTable>): Rule {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    name: row.name,
    priority: row.priority,
    enabled: row.enabled === 1,
    condition: JSON.parse(row.match_json) as Rule["condition"],
    action: JSON.parse(row.action_json) as Rule["action"],
  };
}

function ruleToRow(rule: Rule): Insertable<RulesTable> {
  return {
    id: rule.id,
    workspace_id: rule.workspaceId,
    name: rule.name,
    priority: rule.priority,
    enabled: rule.enabled ? 1 : 0,
    match_json: JSON.stringify(rule.condition),
    action_json: JSON.stringify(rule.action),
  };
}

function rowToEvent(row: Selectable<EventsTable>): NormalizedEvent {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    sourceId: row.source_id,
    sourceType: row.source_type as NormalizedEvent["sourceType"],
    externalItemId: row.external_item_id,
    title: row.title,
    url: row.url ?? undefined,
    contentText: row.content_text ?? undefined,
    author: row.author ?? undefined,
    publishedAt: row.published_at ?? undefined,
    imageUrl: row.image_url ?? undefined,
    authorImageUrl: row.author_image_url ?? undefined,
    tags: JSON.parse(row.tags_json) as string[],
    rawPayload: JSON.parse(row.raw_json) as unknown,
    createdAt: row.created_at,
  };
}

function eventToRow(event: NormalizedEvent): Insertable<EventsTable> {
  return {
    id: event.id,
    workspace_id: event.workspaceId,
    source_id: event.sourceId,
    source_type: event.sourceType,
    external_item_id: event.externalItemId,
    dedupe_hash: createDedupeHash(event),
    title: event.title,
    url: event.url ?? null,
    content_text: event.contentText ?? null,
    author: event.author ?? null,
    published_at: event.publishedAt ?? null,
    image_url: event.imageUrl ?? null,
    author_image_url: event.authorImageUrl ?? null,
    tags_json: JSON.stringify(event.tags),
    raw_json: JSON.stringify(event.rawPayload),
    created_at: event.createdAt,
  };
}

function rowToDelivery(row: Selectable<DeliveriesTable>): DeliveryRecord {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    eventId: row.event_id,
    outputId: row.output_id,
    status: row.status as DeliveryRecord["status"],
    attemptCount: row.attempt_count,
    lastError: row.last_error ?? undefined,
    nextRetryAt: row.next_retry_at ?? undefined,
    sentAt: row.sent_at ?? undefined,
    receipt: row.receipt_json
      ? (JSON.parse(row.receipt_json) as Record<string, unknown>)
      : undefined,
  };
}

function deliveryToRow(delivery: DeliveryRecord): Insertable<DeliveriesTable> {
  return {
    id: delivery.id,
    workspace_id: delivery.workspaceId,
    event_id: delivery.eventId,
    output_id: delivery.outputId,
    status: delivery.status,
    attempt_count: delivery.attemptCount,
    last_error: delivery.lastError ?? null,
    next_retry_at: delivery.nextRetryAt ?? null,
    sent_at: delivery.sentAt ?? null,
    receipt_json: delivery.receipt ? JSON.stringify(delivery.receipt) : null,
  };
}

function rowToPollLog(row: Selectable<PollLogsTable>): PollLogRecord {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    sourceId: row.source_id,
    sourceName: row.source_name,
    connectorId: row.connector_id,
    startedAt: row.started_at,
    completedAt: row.completed_at ?? undefined,
    status: row.status as PollLogRecord["status"],
    itemsFetched: row.items_fetched ?? undefined,
    newEvents: row.new_events ?? undefined,
    errorMessage: row.error_message ?? undefined,
    details: row.details_json != null
      ? (JSON.parse(row.details_json) as Record<string, unknown>)
      : undefined,
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
  const db = new Kysely<Database>({
    dialect: new D1Dialect({ database: d1 }),
  });
  return new D1Repository(db);
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
