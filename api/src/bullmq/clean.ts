import { transcodeEvent, transcodeQueue } from "./queue.js";

try {
  await transcodeQueue.obliterate({ force: true });
  console.log("Queue is cleared");
} finally {
  await transcodeQueue.close();
  await transcodeEvent.close();
}
