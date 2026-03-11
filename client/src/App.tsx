import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import KanbanPage from "./pages/KanbanPage";
import { Calendar, CheckSquare } from "lucide-react";

function Router() {
  const [activePage, setActivePage] = useState<"calendar" | "kanban">(
    "calendar"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-[oklch(0.98_0.03_250)] to-white backdrop-blur-md border-b border-[oklch(0.90_0.03_260)] shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex w-full gap-2 py-2">
            <button
              onClick={() => setActivePage("calendar")}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm sm:text-base font-semibold transition-all duration-200 ${
                activePage === "calendar"
                  ? "bg-[oklch(0.58_0.12_250)] text-white shadow-md"
                  : "bg-transparent text-[oklch(0.55_0.02_250)] hover:bg-[oklch(0.96_0.03_250)]"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Content Calendar</span>
            </button>
            <button
              onClick={() => setActivePage("kanban")}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm sm:text-base font-semibold transition-all duration-200 ${
                activePage === "kanban"
                  ? "bg-[oklch(0.58_0.12_250)] text-white shadow-md"
                  : "bg-transparent text-[oklch(0.55_0.02_250)] hover:bg-[oklch(0.96_0.03_250)]"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Task Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div>
        {activePage === "calendar" && <Home />}
        {activePage === "kanban" && <KanbanPage />}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
