import { db } from "./index.js";
import { videos } from "./schema/videos.js";

await db.insert(videos).values({id: crypto.randomUUID(), name: "Sponge Bob", path: "/sponge"});
console.log("done");