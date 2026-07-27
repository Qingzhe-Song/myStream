import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const videos = sqliteTable("videos", {
  id: text().primaryKey(),
  name: text(),
  thumbnail: text(),
  path: text(),
  duration: text(),
});
