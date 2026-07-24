import { Transcoder } from "./tools/transcoder.js";
import { db } from "./db/index.js";
import { videos } from "./db/schema/videos.js";

// await db
//   .insert(videos)
//   .values({ id: crypto.randomUUID(), name: "test", path: "/home/qs-ubuntu/myStream/test/video.mp4" });

const trans = new Transcoder("/home/qs-ubuntu/myStream/test/video.mp4", 12);
trans.start();

console.log("done");
