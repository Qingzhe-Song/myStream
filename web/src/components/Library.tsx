import { Label } from "./ui/label";
import { useVideo } from "../hooks/useVideo";
import VideoCard from "./VideoCard";

function Library() {
  const { data: videos = [] } = useVideo();

  return (
    <div>
      <div>
        <Label className="text-2xl">Library</Label>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-4">
        {videos.map((v) => {
          return <VideoCard key={v.id} video={v} />;
        })}
      </div>
    </div>
  );
}

export default Library;
