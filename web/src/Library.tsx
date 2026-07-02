import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./components/ui/label";

function Library() {
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

  return (
    <div className="grid grid-cols-[repeat(auto-fill,200px)] gap-4 justify-center">
      <Label className="text-2xl col-span-full">Your Library</Label>
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
      {test}
    </div>
  );
}

export default Library;
