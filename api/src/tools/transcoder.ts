import { ChildProcess, spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export class Transcoder {
  private inputVideoPath: string = "";
  private args: string[];
  private buffer: string = "";
  private outputFile: string = "";

  constructor(
    inputVideoPath: string,
    segmentIndex: number,
    segmentDuration: number = 5,
  ) {
    const startTime = segmentIndex * segmentDuration;
    const endTime = startTime + segmentDuration;

    this.inputVideoPath = inputVideoPath;
    this.outputFile = `${dirname(inputVideoPath)}/output/${segmentIndex}.ts`;

    this.args = [
      "-y",
      "-ss",
      String(startTime),
      "-copyts",
      "-i",
      inputVideoPath,
      "-to",
      String(endTime),
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "256k",
      "-f",
      "mpegts",
      this.outputFile,
    ];
  }

  public async start(): Promise<void> {
    await mkdir(`${dirname(this.inputVideoPath)}/output`, { recursive: true });

    return new Promise((resolve, reject) => {
      const child: ChildProcess = spawn("ffmpeg", this.args);

      child.stderr?.on("data", (data) => {
        this.buffer += data;
      });

      child.on("close", (code) => {
        if (code !== 0) return reject(new Error(`Bad exit code: ${code}`));
        return resolve();
      });
      child.on("error", reject);
    });
  }

  public getBuffer(): string | null {
    return this.buffer;
  }

  public static getTotalSec(inputVideoPath: string): Promise<number> {
    const args = [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      inputVideoPath,
    ];

    return new Promise((resolve, reject) => {
      const child: ChildProcess = spawn("ffprobe", args);
      let duration: string = "";
      child.stdout?.on("data", (data) => {
        duration += data;
      });

      child.on("close", (code) => {
        if (code !== 0) return reject(new Error(`Bad exit code: ${code}`));
        if (duration.trim() === "")
          return reject(new Error("Bad FFprobe data"));
        return resolve(Number(duration.trim()));
      });

      child.on("error", reject);
    });
  }

  public static async generatePlaylist(
    inputVideoPath: string,
    duration: number = 5,
  ): Promise<void> {
    const folder = dirname(inputVideoPath);
    await mkdir(`${folder}/output`, { recursive: true });

    const totalTime = Number(await this.getTotalSec(inputVideoPath));
    const totalSeg = Math.ceil(totalTime / duration);

    let buffer: string = "";
    buffer += `#EXTM3U\n#EXT-X-VERSION:6\n#EXT-X-TARGETDURATION:${duration}\n#EXT-X-PLAYLIST-TYPE:VOD\n`;

    for (let i = 0; i < totalSeg; i++) {
      if (i === totalSeg - 1) {
        const finalTime: number = i * duration;
        const realTime: number = totalTime - finalTime;
        buffer += `#EXTINF:${realTime.toFixed(3)},\n${i}.ts\n`;
      } else {
        buffer += `#EXTINF:${duration.toFixed(3)},\n${i}.ts\n`;
      }
    }

    buffer += "#EXT-X-ENDLIST";

    await writeFile(`${folder}/output/playlist.m3u8`, buffer, "utf8");
  }
}
