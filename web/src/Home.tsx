import { useEffect, useState } from "react";
import Library from "./Library";
import Pinned from "./Pinned";
import type { VideoData } from "./types/video.types";

function Home() {
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const {videos} = useVideo()
  }, [])

  return (
    <div className="flex flex-col justify-center mt-15 px-12 gap-20">
      {/* <Pinned /> */}
      <Library arr={data!}/>
    </div>
  );
}

export default Home;
