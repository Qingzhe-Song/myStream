PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_videos` (
	`id` text PRIMARY KEY,
	`name` text,
	`path` text
);
--> statement-breakpoint
INSERT INTO `__new_videos`(`id`, `name`, `path`) SELECT `id`, `name`, `path` FROM `videos`;--> statement-breakpoint
DROP TABLE `videos`;--> statement-breakpoint
ALTER TABLE `__new_videos` RENAME TO `videos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP TABLE `users`;