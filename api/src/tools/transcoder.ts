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

    this.args = [
      "-ss",
      String(startTime),
      "-i",
      this.inputVideo,
      "-t",
      String(segmentDuration),
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "23",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-avoid_negative_ts",
      "make_zero",
      "-f",
      "mpegts",
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
