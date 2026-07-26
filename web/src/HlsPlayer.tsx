import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { Route } from "./routes/watch.$id";

function HlsPlayer() {
    const {id} = Route.useParams();
    const [data, setData] = useState("");

    useEffect(() => {
        async function get() {
            const res = await fetch("http://localhost:3000/video/" + id);
            const temp = await res.json();
            setData(temp.path);

            const hls = new Hls();
            const video = videoRef.current;

            hls.loadSource("http://172.25.70.77:6767/stream/" + id + "/output/playlist.m3u8");
            hls.attachMedia(video!);
        }

        get();
    }, []);

    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <video ref={videoRef} controls playsInline></video>
    )
}

export default HlsPlayer;