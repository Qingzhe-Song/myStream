import { Hono } from "hono";
import { db } from "../db/index.js";
import { videos } from "../db/schema/videos.js";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/", async (c) => {
    const data = await db.select().from(videos);
    
    return c.json(data, 200);
})

app.get("/:id", async (c) => {
    const {id} = c.req.param();
    const data = await db.select().from(videos).where(eq(videos.id, id));

    if (data.length == 0) {
        return c.json({message: "Video not found"}, 404);
    }

    return c.json(data[0], 200);
})

export default app;