import { ChildProcess, spawn } from "node:child_process";
import { dirname } from "node:path";

export class Transcoder {
  private inputVideo: string;
  private args: string[];
  private buffer: string = "";

  constructor(inputVideo: string, segmentIndex: number, segmentDuration = 5) {
    this.inputVideo = inputVideo;
    const startTime = segmentIndex * segmentDuration;
    const outputPath = `${dirname(this.inputVideo)}/output/segment_${String(segmentIndex).padStart(3, "0")}.ts`;

    const fastSeekTarget = Math.max(0, startTime - 2);
  const preciseOffset = startTime - fastSeekTarget;

  this.args = [
  "-ss", String(fastSeekTarget),
  "-i", this.inputVideo,
  "-ss", String(preciseOffset),

  "-t", String(segmentDuration),

  "-c:v", "libx264",
  "-preset", "veryfast",
  "-crf", "23",
  "-pix_fmt", "yuv420p",

  "-g", "150",            // if 30fps × 5s
  "-keyint_min", "150",
  "-sc_threshold", "0",

  "-c:a", "aac",
  "-b:a", "128k",
  "-ar", "48000",
  "-ac", "2",

  "-fflags", "+genpts",
  "-avoid_negative_ts", "make_zero",

  "-muxpreload", "0",
  "-muxdelay", "0",

  "-f", "mpegts",

  outputPath,
];
  }

  private makeOutput(): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = spawn("mkdir", [
        "-p",
        dirname(this.inputVideo) + "/output",
      ]);

      child.on("close", resolve);
      child.on("error", reject);
    });
  }

  public async start(): Promise<void> {
    await this.makeOutput();

    return new Promise((resolve, reject) => {
      const child: ChildProcess = spawn("ffmpeg", this.args);

      child.stderr?.on("data", (data) => {
        this.buffer += data;
      });

      child.on("close", (code) => {
        resolve();
      });

      child.on("error", reject);
    });
  }

  public getBuffer(): string | null {
    return this.buffer;
  }
}
