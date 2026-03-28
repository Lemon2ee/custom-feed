// Kysely Database type definitions.
// Column names mirror the actual SQLite column names (snake_case).
// Boolean columns are typed as 0 | 1 — SQLite has no native boolean type.
// Generated<T> marks columns that have SQL DEFAULTs: required in selects,
// optional in inserts.

import type { Generated } from "kysely";

export interface SourcesTable {
  id: string;
  workspace_id: string;
  name: string;
  plugin_id: string;
  config_json: string;
  output_ids_json: string;
  output_overrides_json: string | null;
  filter_json: string | null;
  poll_interval_sec: number;
  last_cursor: string | null;
  last_polled_at: string | null;
  enabled: 0 | 1;
  created_at: Generated<string>;
}

export interface OutputsTable {
  id: string;
  workspace_id: string;
  plugin_id: string;
  config_json: string;
  enabled: 0 | 1;
  muted_until: string | null;
  priority: number;
  schedule_json: string | null;
  created_at: Generated<string>;
}

export interface EventsTable {
  id: string;
  workspace_id: string;
  source_id: string;
  source_type: string;
  external_item_id: string;
  dedupe_hash: string;
  title: string;
  url: string | null;
  content_text: string | null;
  author: string | null;
  published_at: string | null;
  image_url: string | null;
  author_image_url: string | null;
  tags_json: string;
  raw_json: string;
  created_at: Generated<string>;
}

export interface RulesTable {
  id: string;
  workspace_id: string;
  name: string;
  priority: number;
  enabled: 0 | 1;
  match_json: string;
  action_json: string;
  created_at: Generated<string>;
}

export interface DeliveriesTable {
  id: string;
  workspace_id: string;
  event_id: string;
  output_id: string;
  status: string;
  attempt_count: number;
  last_error: string | null;
  next_retry_at: string | null;
  sent_at: string | null;
  receipt_json: string | null;
}

export interface WorkspaceSettingsTable {
  workspace_id: string;
  key: string;
  value: string;
}

export interface PollLogsTable {
  id: string;
  workspace_id: string;
  source_id: string;
  source_name: string;
  connector_id: string;
  started_at: string;
  completed_at: string | null;
  status: string; // "success" | "error"
  items_fetched: number | null;
  new_events: number | null;
  error_message: string | null;
  details_json: string | null;
}

export interface Database {
  sources: SourcesTable;
  outputs: OutputsTable;
  events: EventsTable;
  rules: RulesTable;
  deliveries: DeliveriesTable;
  workspace_settings: WorkspaceSettingsTable;
  poll_logs: PollLogsTable;
}
