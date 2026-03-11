import { useState } from "react";
import { CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { KanbanColumn } from "./KanbanColumn";
import { useKanbanStorage, TaskStatus } from "@/hooks/useKanbanStorage";
import { toast } from "sonner";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";

/**
 * Design Philosophy: Warm Playful Gradient
 * - Three-column Kanban layout with drag-and-drop
 * - Enhanced animations and visual feedback
 * - Task form with improved styling
 * - Statistics dashboard
 * - Smooth transitions and micro-interactions
 */
export function KanbanBoard() {
  const { tasks, addTask, deleteTask, moveTask, getTasksByStatus, isLoaded } =
    useKanbanStorage();
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    description: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTask = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    setIsSubmitting(true);
    try {
      addTask({
        title: formData.title,
        description: formData.description,
        status: "todo",
        priority: formData.priority,
      });
      setFormData({ title: "", description: "", priority: "medium" });
      toast.success("Task added! 📝");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast.success("Task removed");
  };

  const handleMoveTask = (id: string, newStatus: TaskStatus) => {
    moveTask(id, newStatus);

    // Show contextual notifications
    if (newStatus === "done") {
      toast.success("Task completed! 🎉", {
        icon: <CheckCircle2 className="w-4 h-4" />,
      });
    } else if (newStatus === "in-progress") {
      toast.info("Task in progress", {
        icon: <Zap className="w-4 h-4" />,
      });
    } else if (newStatus === "todo") {
      toast.info("Task moved back to To Do", {
        icon: <AlertCircle className="w-4 h-4" />,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);
    const overId = String(over.id);

    // Only react when dropped on a column, not on another card
    const validStatuses: TaskStatus[] = ["todo", "in-progress", "done"];
    if (!validStatuses.includes(overId as TaskStatus)) {
      return;
    }

    const newStatus = overId as TaskStatus;

    // Only move if status actually changed
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      moveTask(taskId, newStatus);

      // Show notification based on new status
      if (newStatus === "done") {
        toast.success("Task completed! 🎉", {
          icon: <CheckCircle2 className="w-4 h-4" />,
        });
      } else if (newStatus === "in-progress") {
        toast.info("Task in progress", {
          icon: <Zap className="w-4 h-4" />,
        });
      } else if (newStatus === "todo") {
        toast.info("Task moved back to To Do", {
          icon: <AlertCircle className="w-4 h-4" />,
        });
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[oklch(0.92_0.01_65)] border-t-[oklch(0.65_0.25_25)] animate-spin mx-auto mb-4" />
          <p className="text-[oklch(0.5_0.01_65)] font-semibold">Loading tasks...</p>
        </div>
      </div>
    );
  }

  const todoTasks = getTasksByStatus("todo");
  const inProgressTasks = getTasksByStatus("in-progress");
  const doneTasks = getTasksByStatus("done");
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? Math.round((doneTasks.length / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Task Form */}
      <TaskForm
        title={formData.title}
        description={formData.description}
        priority={formData.priority}
        dueDate={undefined}
        estimate={undefined}
        onTitleChange={(value) =>
          setFormData((prev) => ({ ...prev, title: value }))
        }
        onDescriptionChange={(value) =>
          setFormData((prev) => ({ ...prev, description: value }))
        }
        onDueDateChange={() => {}}
        onEstimateChange={() => {}}
        onPriorityChange={(value) => {
          if (value === "low" || value === "medium" || value === "high") {
            setFormData((prev) => ({
              ...prev,
              priority: value as "low" | "medium" | "high",
            }));
          }
        }}
        onSubmit={handleAddTask}
        isLoading={isSubmitting}
      />

      {/* Summary Stats */}
      {totalTasks > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-white to-[oklch(0.99_0.002_65)] rounded-xl p-4 border-2 border-[oklch(0.92_0.01_65)] shadow-md hover:shadow-lg transition-shadow">
            <p className="text-3xl font-bold text-[oklch(0.3_0.02_65)]">
              {totalTasks}
            </p>
            <p className="text-xs text-[oklch(0.5_0.01_65)] mt-1 font-medium">
              Total Tasks
            </p>
          </div>
          <div className="bg-gradient-to-br from-[oklch(0.92_0.01_65)] to-[oklch(0.98_0.008_65)] rounded-xl p-4 border-2 border-[oklch(0.92_0.01_65)] shadow-md hover:shadow-lg transition-shadow">
            <p className="text-3xl font-bold text-[oklch(0.3_0.02_65)]">
              {todoTasks.length}
            </p>
            <p className="text-xs text-[oklch(0.5_0.01_65)] mt-1 font-medium">
              To Do
            </p>
          </div>
          <div className="bg-gradient-to-br from-[oklch(0.70_0.15_40)]/10 to-[oklch(0.70_0.15_40)]/5 rounded-xl p-4 border-2 border-[oklch(0.70_0.15_40)]/30 shadow-md hover:shadow-lg transition-shadow">
            <p className="text-3xl font-bold text-[oklch(0.3_0.02_65)]">
              {inProgressTasks.length}
            </p>
            <p className="text-xs text-[oklch(0.5_0.01_65)] mt-1 font-medium">
              In Progress
            </p>
          </div>
          <div className="bg-gradient-to-br from-[oklch(0.62_0.18_142)]/10 to-[oklch(0.62_0.18_142)]/5 rounded-xl p-4 border-2 border-[oklch(0.62_0.18_142)]/30 shadow-md hover:shadow-lg transition-shadow">
            <p className="text-3xl font-bold text-[oklch(0.3_0.02_65)]">
              {completionRate}%
            </p>
            <p className="text-xs text-[oklch(0.5_0.01_65)] mt-1 font-medium">
              Complete
            </p>
          </div>
        </div>
      )}

      {/* Kanban Board with Drag and Drop */}
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KanbanColumn
            status="todo"
            tasks={todoTasks}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
          />
          <KanbanColumn
            status="in-progress"
            tasks={inProgressTasks}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
          />
          <KanbanColumn
            status="done"
            tasks={doneTasks}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
          />
        </div>
      </DndContext>
    </div>
  );
}
