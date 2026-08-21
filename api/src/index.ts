import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import transcode from "./routes/transcode.js";
import video from "./routes/video.js";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  }),
);

app.route("/video", video);
app.route("/transcode", transcode);

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.HONO_PORT ?? 3000),
    hostname: process.env.HONO_HOST ?? "localhost"
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  },
);
