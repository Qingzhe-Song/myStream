import { Button } from "@/components/ui/button";

function TopMenu() {
  return (
    <div className="flex justify-center mt-4 gap-7">
      <Button className="scale-145" variant="ghost">
        Home
      </Button>
      <Button className="scale-145" variant="ghost">
        Library
      </Button>
    </div>
  );
}

export default TopMenu;
