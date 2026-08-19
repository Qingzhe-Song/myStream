import "dotenv/config";
import chokidar from 'chokidar';
import { mkdir, rename } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { db } from "../db/index.js";
import { videos } from "../db/schema/videos.js";
import { basename, dirname, extname } from "node:path";
import { Transcoder } from "../tools/transcoder.js";

const target = process.env.VIDEO_DIR ?? (await mkdir("./temp-video", {recursive: true}), "./temp-video");

const watcher = chokidar.watch(target, {
    ignored: (path, stats) => stats?.isFile() === true && !path.endsWith(".mp4"),
    depth: 0,
    awaitWriteFinish: true
});

watcher.on("add", async (path) => {
    const uuid = randomUUID();
    const realPath = `${dirname(path)}/${uuid}/${basename(path)}`;
    const fileName = basename(path, extname(path));

    await db.insert(videos).values({
        id: uuid,
        name: fileName,
        path: realPath,
        duration: String(await Transcoder.getTotalSec(path)),
        thumbnail: "TBD"
    })

    const dir = `${dirname(path)}/${uuid}`;
    const output = `${dirname(path)}/${uuid}/output`;
    await mkdir(output, {recursive: true});
    await rename(path, `${dir}/${basename(path)}`);
    await Transcoder.generatePlaylist(`${dir}/${basename(path)}`);
})