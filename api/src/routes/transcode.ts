import { Job } from "bullmq";
import { Hono } from "hono";
import { db } from "../db/index.js";
import { videos } from "../db/schema/videos.js";
import { eq } from "drizzle-orm";
import type { TranscoderData } from "../types/transcoder.types.js";
import { Transcoder } from "../tools/transcoder.js";
import { transcodeEvent, transcodeQueue } from "../bullmq/queue.js";

const app = new Hono();

app.get("/:id/playlist.m3u8", async (c) => {
  const { id } = c.req.param();
  c.header("X-Accel-Redirect", `/re-serve/${id}/output/playlist.m3u8`);

  return c.body(null, 200);
});

app.get("/:id/:segment", async (c) => {
  const { id, segment } = c.req.param();
  const segmentIndex = Number(segment);
  
  const result = await db.select().from(videos).where(eq(videos.id, id));
  if (result.length === 0) {
    return c.json({ message: "Video not found" }, 404);
  }

  const path = result[0].path;
  const sec = await Transcoder.getTotalSec(path!);

  const job: Job<TranscoderData> = await transcodeQueue.add(
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

  const max = Math.ceil(sec / 5);
  for (let i = 1; i <= 4 && segmentIndex + i <= max; i++) {
    const newSegmentIndex = segmentIndex + i;

    await transcodeQueue.add(
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

  await job.waitUntilFinished(transcodeEvent);
  c.header("X-Accel-Redirect", `/re-serve/${id}/output/${segment}`);

  return c.body(null, 200);
});

export default app;
