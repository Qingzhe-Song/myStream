import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { Route } from "../routes/watch.$id";

function HlsPlayer() {
  const { id } = Route.useParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hls = new Hls();
    const video = videoRef.current;
    hls.loadSource(
      `http://172.25.70.77:6767/stream/${id}/output/playlist.m3u8`,
    );
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
