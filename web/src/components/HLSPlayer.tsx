import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { Route } from "../routes/watch.$id";

function HlsPlayer() {
  const { id } = Route.useParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hls = new Hls();
    const video = videoRef.current;
    const streamURL = import.meta.env.VITE_NGINX;
    hls.loadSource(`${streamURL}/stream/${id}/playlist.m3u8`);
    hls.attachMedia(video!);
  }, [id]);

  return (
    <video
      className="w-full h-full object-contain"
      ref={videoRef}
      controls
      playsInline
    ></video>
  );
}

export default HlsPlayer;
