import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users.js";

export const videos = sqliteTable("videos", {
    id: text().primaryKey(),
    name: text(),
    path: text(),
    ownerID: text("owner_id").references(() => users.id)
});