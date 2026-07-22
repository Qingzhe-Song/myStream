import { Queue } from "bullmq";
import { Hono } from "hono";
import { db } from "./db/index.js";
import { videos } from "./db/schema/videos.js";
import { eq } from "drizzle-orm";

const app = new Hono();
const queue = new Queue("Transcode");

app.get("/:id/:second", async (c) => {
  const { id, second } = c.req.param();
  const segmentIndex = Math.floor(Number(second) / 5);

  const result = await db.select().from(videos).where(eq(videos.id, id));
  if (result.length == 0) {
    c.json({ message: "Failed" }, 404);
  }

  const path = result[0].path;

  await queue.add(
    "transcode",
    {
      id,
      segmentIndex,
      path,
    },
    {
      jobId: `${id}:${segmentIndex}`,
    },
  );
});

export default app;
