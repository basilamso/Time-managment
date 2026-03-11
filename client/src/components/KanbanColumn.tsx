import { TaskStatus, KanbanTask } from "@/hooks/useKanbanStorage";
import { TaskCard } from "./TaskCard";
import { getStatusColor, getStatusLabel } from "@/lib/kanbanUtils";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: KanbanTask[];
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, status: TaskStatus) => void;
}

/**
 * Design Philosophy: Warm Playful Gradient
 * - Column with soft background and rounded corners
 * - Header showing status and task count
 * - Droppable area for drag-and-drop
 * - Scrollable task list with smooth animations
 * - Enhanced visual feedback during drag operations
 */
export function KanbanColumn({
  status,
  tasks,
  onDeleteTask,
  onMoveTask,
}: KanbanColumnProps) {
  const statusColor = getStatusColor(status);
  const statusLabel = getStatusLabel(status);
  const wipLimit = status === "in-progress" ? 3 : undefined;
  const isOverLimit =
    typeof wipLimit === "number" ? tasks.length > wipLimit : false;
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    disabled: false,
  });

  return (
    <div className="flex flex-col bg-gradient-to-b from-[oklch(0.99_0.002_65)] to-[oklch(0.98_0.008_65)] rounded-xl border-2 border-[oklch(0.92_0.01_65)] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Column Header */}
      <div
        className={`${statusColor} px-4 py-4 flex items-center justify-between border-b-2 border-[oklch(0.92_0.01_65)]`}
      >
        <div>
          <h3 className="font-bold text-[oklch(0.3_0.02_65)] text-lg">
            {statusLabel}
          </h3>
          <p className="text-xs text-[oklch(0.5_0.01_65)] mt-1">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            {status === "todo" && " • Pull work when you’re ready"}
            {status === "done" && tasks.length > 0 && " • Celebrate your wins"}
          </p>
          {wipLimit && (
            <p
              className={`text-[10px] mt-1 font-semibold ${
                isOverLimit
                  ? "text-[oklch(0.65_0.25_25)]"
                  : "text-[oklch(0.5_0.01_65)]"
              }`}
            >
              WIP limit: {tasks.length}/{wipLimit}
              {isOverLimit && " • Too much in progress – finish something first"}
            </p>
          )}
        </div>
        <span className="bg-white/60 text-[oklch(0.3_0.02_65)] font-bold px-3 py-1.5 rounded-full text-sm shadow-sm">
          {tasks.length}
        </span>
      </div>

      {/* Droppable Tasks List */}
      <div
        ref={setNodeRef}
        className={`flex-1 overflow-y-auto p-4 space-y-3 max-h-[600px] transition-all duration-200 ${
          isOver
            ? "bg-gradient-to-b from-[oklch(0.65_0.25_25)]/5 to-[oklch(0.70_0.15_40)]/5 border-t-2 border-[oklch(0.65_0.25_25)]"
            : ""
        }`}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-[oklch(0.5_0.01_65)]">
            <p className="text-sm text-center font-medium">
              {isOver ? "Drop task here" : "No tasks yet"}
            </p>
            <p className="text-xs mt-1">
              {!isOver && "Create one to get started"}
            </p>
          </div>
        ) : (
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onMove={onMoveTask}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
