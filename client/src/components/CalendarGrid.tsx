import { Button } from "@/components/ui/button";
import { Trash2, ImageIcon } from "lucide-react";
import {
  generateCalendarDays,
  getTaskTypeColor,
  getMonthName,
  isSameDay,
} from "@/lib/calendarUtils";
import { TaskEntry } from "@/hooks/useCalendarStorage";

interface CalendarGridProps {
  currentMonth: Date;
  tasks: TaskEntry[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onDeleteTask: (id: string) => void;
}

/**
 * Design Philosophy: Warm Playful Gradient
 * - Soft rounded corners and gentle shadows
 * - Color-coded video type badges
 * - Hover effects reveal delete button
 * - Responsive grid layout
 */
export function CalendarGrid({
  currentMonth,
  tasks,
  onPrevMonth,
  onNextMonth,
  onToday,
  onDeleteTask,
}: CalendarGridProps) {
  const getTasksForDate = (day: number) => {
    return tasks.filter((t) => {
      const taskDate = new Date(t.date);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentMonth.getMonth() &&
        taskDate.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  const calendarDays = generateCalendarDays(currentMonth);
  const monthName = getMonthName(currentMonth);
  const today = new Date();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Month Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-[oklch(0.30_0.03_250)]">
          {monthName}
        </h2>
        <div className="inline-flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevMonth}
            className="border-[oklch(0.90_0.03_260)] text-[oklch(0.30_0.03_250)] hover:bg-[oklch(0.96_0.03_250)]"
          >
            ← Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onToday}
            className="border-[oklch(0.90_0.03_260)] text-[oklch(0.30_0.03_250)] hover:bg-[oklch(0.96_0.03_250)]"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextMonth}
            className="border-[oklch(0.90_0.03_260)] text-[oklch(0.30_0.03_250)] hover:bg-[oklch(0.96_0.03_250)]"
          >
            Next →
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-bold text-sm text-[oklch(0.35_0.03_250)] py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, idx) => {
          const dayTasks = day ? getTasksForDate(day) : [];
          const cellDate =
            day != null
              ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
              : null;
          const isToday =
            cellDate && isSameDay(cellDate, today);
          const hasTasks = dayTasks.length > 0;
          const isOverdue =
            cellDate && hasTasks && cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

          return (
            <div
              key={idx}
              className={`min-h-12 sm:min-h-24 p-1.5 sm:p-2 rounded-lg border-2 transition-all duration-200 ${
                day
                  ? `bg-[oklch(0.99_0.02_250)] ${
                      isToday
                        ? "border-[oklch(0.58_0.12_250)] shadow-md"
                        : "border-[oklch(0.90_0.03_260)] hover:border-[oklch(0.58_0.12_250)] hover:shadow-md"
                    } ${
                      isOverdue
                        ? "ring-2 ring-[oklch(0.60_0.14_260)] ring-offset-1"
                        : ""
                    }`
                  : "bg-transparent border-transparent"
              }`}
            >
              {day && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[oklch(0.35_0.03_250)]">
                      {day}
                    </span>
                    {hasTasks && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[oklch(0.92_0.02_250)] text-[oklch(0.30_0.03_250)] font-semibold">
                        {dayTasks.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded text-white font-semibold group relative ${getTaskTypeColor(
                          task.type
                        )} hover:opacity-90 transition-opacity cursor-pointer`}
                        title={task.title}
                      >
                        <div className="flex items-center gap-1 truncate">
                          {task.imageUrl && (
                            <ImageIcon className="w-3 h-3 shrink-0" />
                          )}
                          <span className="truncate">{task.title}</span>
                        </div>
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
