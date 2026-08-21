import "dotenv/config";
import { Queue, QueueEvents } from "bullmq";

export const redisConnection = {
  host: process.env.REDIS_HOST ?? "localhost",
  port: Number(process.env.REDIS_PORT ?? 6379),
};

export const transcodeQueue = new Queue("Transcode", {
  connection: redisConnection,
});

export const transcodeEvent = new QueueEvents("Transcode", {
  connection: redisConnection,
});
