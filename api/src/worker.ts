import { Worker, Job } from "bullmq";
import { Transcoder } from "./tools/transcoder.js";

const worker = new Worker(
  "Transcode",
  async (job: Job) => {
    const data = job.data;
    const transcoder = new Transcoder(data.path, data.seg);

    await transcoder.start();

    return "working";
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);

worker.on("completed", (job: Job, returnvalue: any) => {
  console.log("good");
});

worker.on("failed", (job: Job | undefined, error: Error, prev: string) => {
  console.log("bad");
});

console.log("worker is working");
