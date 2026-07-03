import { ChildProcess, spawn } from "node:child_process";
import { dirname } from "node:path";

export class Transcoder {
  private inputVideo: string;
  private args: string[];
  private response: string | null = null;

  constructor(inputVideo: string) {
    this.inputVideo = inputVideo;
    this.args = [
      "-i",
      this.inputVideo,
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
      "-g",
      "48",
      "-keyint_min",
      "48",
      "-sc_threshold",
      "0",
      "-hls_time",
      "6",
      "-hls_playlist_type",
      "vod",
      "-hls_segment_filename",
      dirname(this.inputVideo) + "/output/segment_%03d.ts",
      dirname(this.inputVideo) + "/output/playlist.m3u8",
    ];
  }

  private makeOutput(): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn("mkdir", [dirname(this.inputVideo) + "/output"]);
        child.on("close", () => {
            resolve();
        })
    })
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