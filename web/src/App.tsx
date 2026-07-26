import { ThemeProvider } from "./components/ui/theme-provider";
import HlsPlayer from "./Hls";
import Home from "./Home";
import TopMenu from "./TopMenu";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <div className="flex flex-col">
          <TopMenu />
          <Home />
          <HlsPlayer source="http://172.25.70.77:6767/stream/658e7b18-1096-4ddd-903f-77ec912f27c8/output/playlist.m3u8"/>
        </div>
      }
    </ThemeProvider>
  );
}

export default App;
