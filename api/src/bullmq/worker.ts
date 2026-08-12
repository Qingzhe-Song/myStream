import { Worker, Job } from "bullmq";
import { Transcoder } from "../tools/transcoder.js";
import type { TranscoderData } from "../types/transcoder.types.js";
import { redisConnection } from "./queue.js";

const worker = new Worker(
  "Transcode",
  async (job: Job) => {
    const data: TranscoderData = job.data;

    const transcoder = new Transcoder(data.inputVideoPath, data.segmentIndex);
    await transcoder.start();
  },
  {
    connection: redisConnection,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed`);
});

worker.on("failed", (job) => {
  console.log(`Job ${job?.id} has failed`);
});

console.log("Worker started");
