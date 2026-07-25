import { Worker, Job } from "bullmq";
import { Transcoder } from "./tools/transcoder.js";
import type { TranscoderData } from "./types/transcoder.types.js";

const worker = new Worker(
  "Transcode",
  async (job: Job) => {
    const data: TranscoderData = job.data;

    const transcoder = new Transcoder(data.inputVideoPath, data.segmentIndex, data.totalVideoSec);
    await transcoder.start();
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed`);
});

worker.on("failed", (job) => {
  console.log(`Job ${job?.id} has failed`);
})

console.log("Worker started");
