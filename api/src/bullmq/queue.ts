import { Queue, QueueEvents } from "bullmq";

export const redisConnection = {
  host: "localhost",
  port: 6379,
};

export const transcodeQueue = new Queue("Transcode", {
  connection: redisConnection,
});

export const transcodeEvent = new QueueEvents("Transcode", {
  connection: redisConnection,
});

await transcodeQueue.obliterate({ force: true });
