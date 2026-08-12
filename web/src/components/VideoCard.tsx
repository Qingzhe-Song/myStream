import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { VideoData } from "../types/video.types";
import { useNavigate } from "@tanstack/react-router";

type VideoCardProps = {
  video: VideoData;
};

const api = import.meta.env.VITE_API;

function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();

  return (
    <div>
      <Card
        onClick={() => {
          navigate({ to: "/watch/$id", params: { id: video.id } });
        }}
      >
        <CardContent>
          <img src={`${api}/${video.id}/thumbnail`} className="aspect-video object-cover"></img>
        </CardContent>
        <CardHeader>
          <CardTitle className="line-clamp-2 hover:line-clamp-none">{video.name}</CardTitle>
        </CardHeader>
        <CardFooter>
          <p>Duration: {video.duration}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VideoCard;
