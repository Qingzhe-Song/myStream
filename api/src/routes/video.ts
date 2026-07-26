import { Hono } from "hono";
import { db } from "../db/index.js";
import { videos } from "../db/schema/videos.js";

const app = new Hono();

app.get("/", async (c) => {
    const data = await db.select().from(videos);
    
    return c.json(data, 200);
})

export default app;