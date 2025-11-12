import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import Business from "./pages/Business";
import Books from "./pages/Books";
import About from "./pages/About";
import Philosophy from "./pages/Philosophy";
import Manifest from "./pages/Manifest";
import Synergies from "./pages/Synergies";
import Resonance from "./pages/Resonance";
import AdminSubmissions from "./pages/AdminSubmissions";


function Router() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/business"} component={Business} />
        <Route path={"/philosophy"} component={Philosophy} />
        <Route path={"/books"} component={Books} />
        <Route path={"/manifest"} component={Manifest} />
        <Route path={"/synergies"} component={Synergies} />
        <Route path={"/resonance"} component={Resonance} />

        <Route path={"/admin/submissions"} component={AdminSubmissions} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
