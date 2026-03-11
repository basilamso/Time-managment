import { useState } from "react";
import { Trash2, GripVertical, Info } from "lucide-react";
import { KanbanTask, TaskStatus } from "@/hooks/useKanbanStorage";
import {
  getPriorityBadgeColor,
  formatTaskDate,
} from "@/lib/kanbanUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: KanbanTask;
  onDelete: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
}

/**
 * Design Philosophy: Warm Playful Gradient
 * - Floating card with soft shadows and rounded corners
 * - Color-coded priority badges
 * - Drag handle for visual feedback
 * - Smooth transitions and animations
 * - Enhanced hover effects
 */
export function TaskCard({ task, onDelete, onMove }: TaskCardProps) {
  const [open, setOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Keep card fully visible while dragging for better feedback
    opacity: 1,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white rounded-xl p-4 shadow-md transition-shadow duration-200 border-2 group border-[oklch(0.90_0.03_260)] hover:shadow-lg hover:border-[oklch(0.58_0.12_250)] ${
          isDragging ? "shadow-2xl" : ""
        }`}
      >
        {/* Drag Handle and Header */}
        <div className="flex items-start gap-2 mb-3">
          <div
            className="pt-1 text-[oklch(0.55_0.02_250)] hover:text-[oklch(0.58_0.12_250)] transition-colors cursor-grab active:cursor-grabbing"
            title="Drag to move task"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[oklch(0.30_0.03_250)] text-sm leading-snug">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-[oklch(0.55_0.02_250)] mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <DialogTrigger
              asChild
            >
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="px-2 py-1 text-[oklch(0.58_0.12_250)] hover:bg-[oklch(0.95_0.03_250)] rounded-lg text-[11px] font-semibold flex items-center gap-1"
                title="View details"
              >
                <Info className="w-3 h-3" />
                <span>Details</span>
              </button>
            </DialogTrigger>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="p-1 text-[oklch(0.60_0.14_260)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[oklch(0.95_0.03_250)] rounded-lg"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Priority Badge */}
        <div className="flex items-center justify-between gap-2 ml-6">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${getPriorityBadgeColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          {task.description && (
            <DialogDescription>{task.description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4 space-y-2 text-sm text-[oklch(0.35_0.03_250)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Priority:</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getPriorityBadgeColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span className="capitalize">
              {task.status.replace("-", " ")}
            </span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Due date:</span>
              <span>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {task.estimate && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Estimate:</span>
              <span>{task.estimate}</span>
            </div>
          )}
          {task.completedAt && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Completed:</span>
              <span>{formatTaskDate(task.completedAt)}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
