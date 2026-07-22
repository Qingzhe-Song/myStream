import { ChildProcess, spawn } from "node:child_process";
import { dirname } from "node:path";

export class Transcoder {
  private inputVideo: string;
  private args: string[];
  private response: string | null = null;

  constructor(inputVideo: string, segmentIndex: number, segmentDuration = 6) {
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
      const child = spawn("mkdir", [dirname(this.inputVideo) + "/output"]);
      child.on("close", () => {
        resolve();
      });
    });
  }

  public async start(): Promise<ChildProcess> {
    await this.makeOutput();
    const child: ChildProcess = spawn("ffmpeg", this.args);

    child.stderr?.on("data", (data) => {
      this.response += data;
    });

    return child;
  }

  public getResponse(): string | null {
    return this.response;
  }
}
