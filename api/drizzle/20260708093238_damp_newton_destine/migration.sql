CREATE TABLE `users` (
	`id` text PRIMARY KEY
);
--> statement-breakpoint
ALTER TABLE `videos` RENAME COLUMN `uuid` TO `id`;--> statement-breakpoint
ALTER TABLE `videos` ADD `owner_id` text REFERENCES users(id);