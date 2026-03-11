import { TaskStatus } from "@/hooks/useKanbanStorage";

export function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case "todo":
      return "bg-[oklch(0.96_0.03_250)]"; // Light blue
    case "in-progress":
      return "bg-[oklch(0.86_0.06_240)]"; // Mid blue
    case "done":
      return "bg-[oklch(0.80_0.04_180)]"; // Soft teal/green
    default:
      return "bg-gray-400";
  }
}

export function getStatusLabel(status: TaskStatus): string {
  switch (status) {
    case "todo":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return status;
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "low":
      return "text-[oklch(0.80_0.04_190)]"; // Soft teal
    case "medium":
      return "text-[oklch(0.70_0.09_240)]"; // Blue
    case "high":
      return "text-[oklch(0.60_0.14_260)]"; // Deep blue
    default:
      return "text-gray-500";
  }
}

export function getPriorityBadgeColor(priority: string): string {
  switch (priority) {
    case "low":
      return "bg-[oklch(0.80_0.04_190)]/10 text-[oklch(0.80_0.04_190)]";
    case "medium":
      return "bg-[oklch(0.70_0.09_240)]/10 text-[oklch(0.70_0.09_240)]";
    case "high":
      return "bg-[oklch(0.60_0.14_260)]/10 text-[oklch(0.60_0.14_260)]";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function getNextStatus(status: TaskStatus): TaskStatus {
  switch (status) {
    case "todo":
      return "in-progress";
    case "in-progress":
      return "done";
    case "done":
      return "todo";
    default:
      return "todo";
  }
}

export function formatTaskDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
