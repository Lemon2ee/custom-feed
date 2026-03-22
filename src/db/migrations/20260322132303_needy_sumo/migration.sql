CREATE TABLE `workspace_settings` (
	`workspace_id` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `sources` ADD `last_polled_at` text;--> statement-breakpoint
CREATE UNIQUE INDEX `workspace_settings_pk` ON `workspace_settings` (`workspace_id`,`key`);