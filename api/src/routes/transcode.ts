import { Job, Queue, QueueEvents } from "bullmq";
import { Hono } from "hono";
import { db } from "../db/index.js";
import { videos } from "../db/schema/videos.js";
import { eq } from "drizzle-orm";
import type { TranscoderData } from "../types/transcoder.types.js";
import { Transcoder } from "../tools/transcoder.js";

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
  },
});

app.get("/:id/output/:segment", async (c) => {
  const { id, segment } = c.req.param();
  const segmentIndex = Number(
    segment.replace("segment_", "").replace(".ts", ""),
  );
  const result = await db.select().from(videos).where(eq(videos.id, id));
  if (result.length === 0) {
    return c.json({message: "Video not found"}, 404);
  }

  const path = result[0].path;
  const sec = await Transcoder.getTotalSec(path!);

  const job: Job<TranscoderData> = await queue.add(
    "transcode",
    {
      inputVideoPath: path,
      segmentIndex,
      totalVideoSec: sec,
    },
    {
      jobId: `${id}-${segmentIndex}`,
    },
  );

  for (let i = 1; i <= 4; i++) {
    const newSegmentIndex = segmentIndex + i;

    await queue.add(
      "transcode",
      {
        inputVideoPath: path,
        segmentIndex: newSegmentIndex,
        totalVideoSec: sec,
      },
      {
        jobId: `${id}-${newSegmentIndex}`,
      },
    );
  }

  await job.waitUntilFinished(event);
  c.header("X-Accel-Redirect", `/re-serve/${id}/output/${segment}`);

  return c.body(null, 200);
});

export default app;
