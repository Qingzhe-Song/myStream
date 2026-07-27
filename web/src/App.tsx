import { Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "./components/ui/theme-provider";
import TopMenu from "./components/TopMenu";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <div>
          <div className="flex justify-center pt-4">
            <TopMenu />
          </div>
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      }
    </ThemeProvider>
  );
}

export default App;
