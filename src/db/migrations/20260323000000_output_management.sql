ALTER TABLE `outputs` ADD COLUMN `muted_until` text;
ALTER TABLE `outputs` ADD COLUMN `priority` integer DEFAULT 0 NOT NULL;
ALTER TABLE `outputs` ADD COLUMN `schedule_json` text;
