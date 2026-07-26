import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { VideoData } from "./types/video.types";
import { useNavigate } from "@tanstack/react-router";

type VideoCardProp = {
    video: VideoData;
}

function VideoCard({video} : VideoCardProp) {
  const nav = useNavigate();
  
  return (
    <div>
      <Card onClick={() => {
        nav({to: "/watch/$id", params: {id: video.id}})
      }}>
        <CardHeader>
          <CardTitle>{video.name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VideoCard;
