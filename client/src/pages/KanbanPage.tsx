import { KanbanBoard } from "@/components/KanbanBoard";
import { CheckSquare } from "lucide-react";

/**
 * Design Philosophy: Warm Playful Gradient
 * - Full-page Kanban board view with enhanced styling
 * - Task management with three columns (To Do, In Progress, Done)
 * - Notifications when tasks are completed or moved
 * - Drag-and-drop support for smooth task management
 * - Responsive layout that works on mobile and desktop
 */
export default function KanbanPage() {
  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-[oklch(0.98_0.03_250)] to-white backdrop-blur-md border-b border-[oklch(0.90_0.03_260)]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[oklch(0.58_0.12_250)] to-[oklch(0.65_0.15_240)] rounded-xl shadow-lg">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[oklch(0.30_0.03_250)]">
                Task Board
              </h1>
              <p className="text-sm text-[oklch(0.55_0.02_250)] mt-1">
                Organize and track your tasks with drag-and-drop
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <KanbanBoard />
      </div>
    </div>
  );
}
