import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

function TopMenu() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        className="scale-145"
        variant="ghost"
        onClick={() => {
          navigate({
            to: "/home",
          });
        }}
      >
        Home
      </Button>
    </div>
  );
}

export default TopMenu;
