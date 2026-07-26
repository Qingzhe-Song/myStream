import { getVideos } from "@/api/video.api"
import type { VideoData } from "@/types/video.types"
import { useEffect, useState } from "react"

export const useVideo = () => {
    const [videos, setVideos] = useState<VideoData[]>([]);
    const loadVideos = async () => {
        const data = await getVideos();
        setVideos(data);
    }

    useEffect(() => {
        loadVideos();
    }, []);

    return {videos, loadVideos}
}