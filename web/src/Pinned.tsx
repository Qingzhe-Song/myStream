import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Label } from "@/components/ui/label";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const test = (
  <div>
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
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

function Pinned() {
  return (
    <div className="flex flex-col w-full max-w-[95%] gap-4">
      <Label className="text-2xl">Your Pinned</Label>

      <Carousel className="">
        <CarouselContent>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
          <CarouselItem className="basis-1/4">{test}</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Pinned;
