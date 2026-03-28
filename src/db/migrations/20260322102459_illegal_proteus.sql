CREATE TABLE `deliveries` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`event_id` text NOT NULL,
	`output_id` text NOT NULL,
	`status` text NOT NULL,
	`attempt_count` integer DEFAULT 0 NOT NULL,
	`last_error` text,
	`next_retry_at` text,
	`sent_at` text,
	`receipt_json` text
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`source_id` text NOT NULL,
	`source_type` text NOT NULL,
	`external_item_id` text NOT NULL,
	`dedupe_hash` text NOT NULL,
	`title` text NOT NULL,
	`url` text,
	`content_text` text,
	`author` text,
	`published_at` text,
	`image_url` text,
	`tags_json` text NOT NULL,
	`raw_json` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `outputs` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`plugin_id` text NOT NULL,
	`config_json` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `plugin_installs` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`plugin_id` text NOT NULL,
	`version` text NOT NULL,
	`manifest_json` text NOT NULL,
	`artifact_url` text NOT NULL,
	`integrity_hash` text NOT NULL,
	`signature` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `plugin_secrets` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`plugin_id` text NOT NULL,
	`key` text NOT NULL,
	`encrypted_value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rules` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`name` text NOT NULL,
	`priority` integer DEFAULT 100 NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`match_json` text NOT NULL,
	`action_json` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`plugin_id` text NOT NULL,
	`config_json` text NOT NULL,
	`output_ids_json` text DEFAULT '[]' NOT NULL,
	`filter_json` text,
	`poll_interval_sec` integer DEFAULT 300 NOT NULL,
	`last_cursor` text,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `deliveries_event_output_uq` ON `deliveries` (`event_id`,`output_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `events_workspace_source_external_uq` ON `events` (`workspace_id`,`source_id`,`external_item_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `events_workspace_hash_uq` ON `events` (`workspace_id`,`dedupe_hash`);--> statement-breakpoint
CREATE UNIQUE INDEX `outputs_workspace_id_id_uq` ON `outputs` (`workspace_id`,`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `plugin_installs_workspace_plugin_uq` ON `plugin_installs` (`workspace_id`,`plugin_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `sources_workspace_id_id_uq` ON `sources` (`workspace_id`,`id`);