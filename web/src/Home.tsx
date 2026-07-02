import Library from "./Library";
import Pinned from "./Pinned";

function Home() {
  return (
    <div className="flex flex-col justify-center mt-15 px-12 gap-20">
      <Pinned />
      <Library />
    </div>
  );
}

export default Home;
