import { Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "./components/ui/theme-provider";
import HlsPlayer from "./HlsPlayer";
import Home from "./Home";
import TopMenu from "./TopMenu";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <div className="flex flex-col">
          <TopMenu />
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      }
    </ThemeProvider>
  );
}

export default App;
