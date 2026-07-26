import { useEffect, useState } from "react";
import Library from "./Library";
import Pinned from "./Pinned";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function get() {
      const res = await fetch("http://localhost:3000/video");
      const temp = await res.json();
      setData(temp);
    }

    get();
  }, [])

  return (
    <div className="flex flex-col justify-center mt-15 px-12 gap-20">
      <Pinned />
      <Library arr={data!}/>
    </div>
  );
}

export default Home;
