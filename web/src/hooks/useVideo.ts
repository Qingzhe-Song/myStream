import { getVideos } from "@/api/video.api";
import { useQuery } from "@tanstack/react-query";

export const useVideo = () => {
  return useQuery({
    queryKey: ["getVideos"],
    queryFn: getVideos,
  });
};
