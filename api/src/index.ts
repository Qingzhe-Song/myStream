import { serve } from "@hono/node-server";
import { Hono } from "hono";
import transcode from "./routes/transcode.js";

const app = new Hono();

app.route("/transcode", transcode);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
