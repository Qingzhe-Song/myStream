import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { VideoData } from "./types/test.type";

type VideoCardProp = {
    video: VideoData;
}

function VideoCard({video} : VideoCardProp) {

  return (
    <div>
      <Card>
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
