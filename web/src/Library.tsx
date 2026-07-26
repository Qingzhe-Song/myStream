import { Label } from "./components/ui/label";
import type { VideoData } from "./types/video.types";
import VideoCard from "./VideoCard";

type LibraryProp = {
  arr: VideoData[];
};

function Library(videoArr: LibraryProp) {
  const { arr } = videoArr;

  return (
    <div>
      <div>
        <Label className="text-2xl">Library</Label>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,200px)] gap-4 justify-left pt-4">
        {arr.map((v) => {
          return <VideoCard key={v.id} video={v} />;
        })}
      </div>
    </div>
  );
}

export default Library;
