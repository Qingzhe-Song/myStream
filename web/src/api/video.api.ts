import type { VideoData } from "@/types/video.types";

const api = import.meta.env.VITE_API;

export const getVideos = async (): Promise<VideoData[]> => {
  const res = await fetch(`${api}/video`);
  if (!res.ok) {
    throw new Error("Failed fetching all videos");
  }

  const videos: VideoData[] = await res.json();
  return videos;
};
