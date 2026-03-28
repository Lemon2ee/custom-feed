CREATE TABLE `poll_logs` (
	`id` text PRIMARY KEY,
	`workspace_id` text NOT NULL,
	`source_id` text NOT NULL,
	`source_name` text DEFAULT '' NOT NULL,
	`connector_id` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text,
	`status` text NOT NULL,
	`items_fetched` integer,
	`new_events` integer,
	`error_message` text
);
