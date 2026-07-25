import { Transcoder } from "./tools/transcoder.js";
// await db
//   .insert(videos)
//   .values({ id: crypto.randomUUID(), name: "test", path: "/home/qs-ubuntu/myStream/test/video.mp4" });

// const trans = new Transcoder("/home/qs-ubuntu/myStream/test/video.mp4", 12);

const test = () => {
  return Transcoder.getTotalSec(
    "/home/qs-ubuntu/myStream/video/658e7b18-1096-4ddd-903f-77ec912f27c8/video.mp4",
  );
};

console.log(await test());
