import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { VideoData } from "../types/video.types";
import { useNavigate } from "@tanstack/react-router";

type VideoCardProps = {
  video: VideoData;
};

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
          <p>Include Picture Later</p>
        </CardContent>
        <CardHeader>
          <CardTitle>{video.name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardFooter>
          <p>Include Time Later</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VideoCard;
