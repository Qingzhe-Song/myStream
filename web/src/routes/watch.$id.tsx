import WatchPage from "@/components/WatchPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/watch/$id")({
  component: WatchPage,
});
