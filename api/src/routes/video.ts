import { Hono } from "hono";
import { db } from "../db/index.js";
import { videos } from "../db/schema/videos.js";
import { eq } from "drizzle-orm";
import { readFile } from "node:fs/promises";

const app = new Hono();

app.get("/", async (c) => {
  const data = await db.select().from(videos);

  return c.json(data, 200);
});

app.get("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await db.select().from(videos).where(eq(videos.id, id));

  if (data.length == 0) {
    return c.json({ message: "Video not found" }, 404);
  }

  return c.json(data[0], 200);
});

app.get("/:id/thumbnail", async (c) => {
  const { id } = c.req.param();
  const data = await db
    .select({ thumbnailPath: videos.thumbnail })
    .from(videos)
    .where(eq(videos.id, id));

  if (data.length == 0) {
    return c.json({ message: "Thumbnail not found" }, 404);
  }

  const thumbnail = await readFile(data[0].thumbnailPath!);

  c.header("Content-Type", "image/jpeg");
  c.header("Cache-Control", "public, max-age=86400");

  return c.body(thumbnail);
});

export default app;
