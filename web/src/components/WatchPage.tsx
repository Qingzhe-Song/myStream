import HlsPlayer from "./HlsPlayer";

function WatchPage() {
  return (
    <div className="flex justify-center pt-4">
      <div className="w-[75%] aspect-video">
        <HlsPlayer />
      </div>
    </div>
  );
}

export default WatchPage;
