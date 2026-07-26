import { Label } from "./components/ui/label";
import type { VideoData } from "./types/test.type";
import VideoCard from "./VideoCard";

type LibraryProp = {
  arr: VideoData[]
}

function Library(videoArr: LibraryProp) {
  const {arr} = videoArr;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,200px)] gap-4 justify-center">
      <Label className="text-2xl col-span-full">Your Library</Label>
      {arr.map((v) => {
        return <VideoCard key={v.id} video={v}/>
      })}
    </div>
  );
}

export default Library;
