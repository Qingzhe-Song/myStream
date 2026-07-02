import { ThemeProvider } from "./components/ui/theme-provider";
import Home from "./Home";
import TopMenu from "./TopMenu";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <div className="flex flex-col">
          <TopMenu />
          <Home />
        </div>
      }
    </ThemeProvider>
  );
}

export default App;
