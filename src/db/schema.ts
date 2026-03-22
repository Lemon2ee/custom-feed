import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const sources = sqliteTable(
  "sources",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull(),
    name: text("name").notNull().default(""),
    pluginId: text("plugin_id").notNull(),
    configJson: text("config_json").notNull(),
    outputIdsJson: text("output_ids_json").notNull().default("[]"),
    filterJson: text("filter_json"),
    pollIntervalSec: integer("poll_interval_sec").notNull().default(300),
    lastCursor: text("last_cursor"),
    lastPolledAt: text("last_polled_at"),
    enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    workspaceEnabledIdx: uniqueIndex("sources_workspace_id_id_uq").on(
      table.workspaceId,
      table.id,
    ),
  }),
);

export const outputs = sqliteTable(
  "outputs",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull(),
    pluginId: text("plugin_id").notNull(),
    configJson: text("config_json").notNull(),
    enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    workspaceEnabledIdx: uniqueIndex("outputs_workspace_id_id_uq").on(
      table.workspaceId,
      table.id,
    ),
  }),
);

export const events = sqliteTable(
  "events",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull(),
    sourceId: text("source_id").notNull(),
    sourceType: text("source_type").notNull(),
    externalItemId: text("external_item_id").notNull(),
    dedupeHash: text("dedupe_hash").notNull(),
    title: text("title").notNull(),
    url: text("url"),
    contentText: text("content_text"),
    author: text("author"),
    publishedAt: text("published_at"),
    imageUrl: text("image_url"),
    authorImageUrl: text("author_image_url"),
    tagsJson: text("tags_json").notNull(),
    rawJson: text("raw_json").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    sourceExternalUniq: uniqueIndex("events_workspace_source_external_uq").on(
      table.workspaceId,
      table.sourceId,
      table.externalItemId,
    ),
    hashUniq: uniqueIndex("events_workspace_hash_uq").on(
      table.workspaceId,
      table.dedupeHash,
    ),
  }),
);

export const rules = sqliteTable("rules", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  name: text("name").notNull(),
  priority: integer("priority").notNull().default(100),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  matchJson: text("match_json").notNull(),
  actionJson: text("action_json").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const deliveries = sqliteTable(
  "deliveries",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull(),
    eventId: text("event_id").notNull(),
    outputId: text("output_id").notNull(),
    status: text("status").notNull(),
    attemptCount: integer("attempt_count").notNull().default(0),
    lastError: text("last_error"),
    nextRetryAt: text("next_retry_at"),
    sentAt: text("sent_at"),
    receiptJson: text("receipt_json"),
  },
  (table) => ({
    uniqueEventOutput: uniqueIndex("deliveries_event_output_uq").on(
      table.eventId,
      table.outputId,
    ),
  }),
);

export const pluginInstalls = sqliteTable(
  "plugin_installs",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull(),
    pluginId: text("plugin_id").notNull(),
    version: text("version").notNull(),
    manifestJson: text("manifest_json").notNull(),
    artifactUrl: text("artifact_url").notNull(),
    integrityHash: text("integrity_hash").notNull(),
    signature: text("signature").notNull(),
    enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  },
  (table) => ({
    workspacePluginUnique: uniqueIndex("plugin_installs_workspace_plugin_uq").on(
      table.workspaceId,
      table.pluginId,
    ),
  }),
);

export const workspaceSettings = sqliteTable(
  "workspace_settings",
  {
    workspaceId: text("workspace_id").notNull(),
    key: text("key").notNull(),
    value: text("value").notNull(),
  },
  (table) => ({
    pk: uniqueIndex("workspace_settings_pk").on(table.workspaceId, table.key),
  }),
);

export const pluginSecrets = sqliteTable("plugin_secrets", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  pluginId: text("plugin_id").notNull(),
  key: text("key").notNull(),
  encryptedValue: text("encrypted_value").notNull(),
});
