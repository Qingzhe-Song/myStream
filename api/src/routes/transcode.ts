import { Queue, QueueEvents } from "bullmq";
import { Hono } from "hono";
import { db } from "../db/index.js";
import { videos } from "../db/schema/videos.js";
import { eq } from "drizzle-orm";
import { existsSync } from "fs";
import { dirname } from "path";

const app = new Hono();

const queue = new Queue("Transcode", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const event = new QueueEvents("Transcode", {
  connection: {
    host: "localhost",
    port: 6379,
  }
})

app.get("/:id/output/:segment", async (c) => {
  const { id, segment } = c.req.param();

  const result = await db.select().from(videos).where(eq(videos.id, id));
  if (result.length == 0) {
    return c.json({ message: "Failed" }, 404);
  }

  const path = result[0].path;
  if (
    existsSync(
      `${dirname(path!)}/output/segment_${String(segment).padStart(3, "0")}.ts`,
    )
  ) {
    return c.json(
      {
        message: "File Already Exists",
      },
      404,
    );
  }

  const job = await queue.add(
    "transcode",
    {
      id,
      segment,
      path,
    },
    {
      jobId: `${id}-${segment}`,
    },
  );

  for (let i = 0; i < 4; i++) {
    const newSeg = segment + i;

    await queue.add("transcode", {
      id,
      newSeg,
      path,
    })
  }

  await job.waitUntilFinished(event);

  c.header("X-Accel-Redirect", `/reserve/${id}/output/segment_${String(segment).padStart(3, "0")}.ts`);

  return c.json(
    {
      message: "Successfully queued and sent header back to nginx",
    },
    200,
  );
});

export default app;
