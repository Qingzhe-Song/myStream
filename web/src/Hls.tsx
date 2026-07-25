import Hls from "hls.js";
import { useEffect, useRef } from "react";

type HlsProp = {
    source: string
}

function HlsPlayer(prop: HlsProp) {
    const {source} = prop;
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const hls = new Hls();
        const video = videoRef.current;

        hls.loadSource(source);
        hls.attachMedia(video!);
    }, [])

    return (
        <video ref={videoRef} controls playsInline></video>
    )
}

export default HlsPlayer;