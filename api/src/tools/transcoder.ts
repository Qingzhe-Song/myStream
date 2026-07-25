import { ChildProcess, spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export class Transcoder {
  private inputVideoPath: string = "";
  private args: string[];
  private buffer: string = "";
  private outputFile: string = "";

  constructor(
    inputVideoPath: string,
    segmentIndex: number,
    totalVideoSec: number,
    segmentDuration: number = 5,
  ) {
    const startTime = segmentIndex * segmentDuration;
    const endTime = startTime + segmentDuration;
    const digit = String(totalVideoSec / segmentDuration).length;

    this.inputVideoPath = inputVideoPath;
    this.outputFile = `${dirname(inputVideoPath)}/output/segment_${String(segmentIndex).padStart(digit, "0")}.ts`;

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
}
