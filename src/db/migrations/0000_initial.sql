CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY NOT NULL,
  workspace_id TEXT NOT NULL,
  plugin_id TEXT NOT NULL,
  config_json TEXT NOT NULL,
  poll_interval_sec INTEGER NOT NULL DEFAULT 300,
  last_cursor TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outputs (
  id TEXT PRIMARY KEY NOT NULL,
  workspace_id TEXT NOT NULL,
  plugin_id TEXT NOT NULL,
  config_json TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY NOT NULL,
  workspace_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  source_type TEXT NOT NULL,
  external_item_id TEXT NOT NULL,
  dedupe_hash TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  content_text TEXT,
  author TEXT,
  published_at TEXT,
  tags_json TEXT NOT NULL,
  raw_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rules (
  id TEXT PRIMARY KEY NOT NULL,
  workspace_id TEXT NOT NULL,
  name TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 100,
  enabled INTEGER NOT NULL DEFAULT 1,
  match_json TEXT NOT NULL,
  action_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deliveries (
  id TEXT PRIMARY KEY NOT NULL,
  workspace_id TEXT NOT NULL,
  event_id TEXT NOT NULL,
  output_id TEXT NOT NULL,
  status TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  next_retry_at TEXT,
  sent_at TEXT,
  receipt_json TEXT
);

CREATE TABLE IF NOT EXISTS plugin_installs (
  id TEXT PRIMARY KEY NOT NULL,
  workspace_id TEXT NOT NULL,
  plugin_id TEXT NOT NULL,
  version TEXT NOT NULL,
  manifest_json TEXT NOT NULL,
  artifact_url TEXT NOT NULL,
  integrity_hash TEXT NOT NULL,
  signature TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS plugin_secrets (
  id TEXT PRIMARY KEY NOT NULL,
  workspace_id TEXT NOT NULL,
  plugin_id TEXT NOT NULL,
  key TEXT NOT NULL,
  encrypted_value TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS events_workspace_source_external_uq
ON events (workspace_id, source_id, external_item_id);

CREATE UNIQUE INDEX IF NOT EXISTS events_workspace_hash_uq
ON events (workspace_id, dedupe_hash);

CREATE UNIQUE INDEX IF NOT EXISTS deliveries_event_output_uq
ON deliveries (event_id, output_id);
