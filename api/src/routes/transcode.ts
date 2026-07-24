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

  const match = segment.match(/segment_(\d+)\.ts/);
  if (!match) {
    return c.json({ message: "Invalid segment filename" }, 400);
  }

  const segmentIndex = parseInt(match[1], 10);

  const result = await db.select().from(videos).where(eq(videos.id, id));
  if (result.length == 0) {
    return c.json({ message: "Failed" }, 404);
  }

  const path = result[0].path;
  if (
    existsSync(
      `${dirname(path!)}/output/segment_${String(segmentIndex).padStart(3, "0")}.ts`,
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
      seg : segmentIndex,
      path,
    },
    {
      jobId: `${id}-${segmentIndex}`,
    },
  );

  for (let i = 1; i < 4; i++) {
    const newSeg = segmentIndex + i;

    await queue.add("transcode", {
      id,
      seg: newSeg,
      path,
    }, {
      jobId : `${id}-${newSeg}`
    })
  }

  await job.waitUntilFinished(event);

  c.header("X-Accel-Redirect", `/reserve/${id}/output/${segment}`);

  return c.body(null, 200);
});

await queue.obliterate({ force: true });

export default app;
