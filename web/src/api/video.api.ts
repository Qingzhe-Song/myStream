import type { VideoData } from "@/types/video.types";

export const getVideos = async (): Promise<VideoData[]> => {
  const res = await fetch("http://localhost:3000/video");
  if (!res.ok) {
    throw new Error("Failed fetching all videos");
  }

  const videos: VideoData[] = await res.json();
  return videos;
};
