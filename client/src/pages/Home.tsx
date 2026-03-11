import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TaskForm } from "@/components/VideoForm";
import { CalendarGrid } from "@/components/CalendarGrid";
import { VideoList } from "@/components/VideoList";
import { useCalendarStorage, TaskType } from "@/hooks/useCalendarStorage";
import { toast } from "sonner";

/**
 * Design Philosophy: Warm Playful Gradient
 * - Soft peach to lavender gradient background
 * - Floating card design with rounded corners and soft shadows
 * - Color-coded video types (coral, sage, sky blue)
 * - Playful micro-interactions and celebratory animations
 * - Poppins typography for modern, friendly feel
 * 
 * Layout:
 * - Header with branding and gradient
 * - Two-column layout: Form (left) + Calendar (right)
 * - Video list below calendar
 * - Enhanced shadows and borders
 */
export default function Home() {
  const { tasks, addTask, deleteTask, isLoaded } = useCalendarStorage();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState<{
    title: string;
    date: string;
    type: TaskType;
    description: string;
    imageUrl: string;
    notifyAt: string;
  }>({
    title: "",
    date: "",
    type: "work",
    description: "",
    imageUrl: "",
    notifyAt: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTask = async () => {
    if (!formData.title || !formData.date) {
      toast.error("Please fill in title and date");
      return;
    }

    setIsSubmitting(true);
    try {
      addTask({
        title: formData.title,
        date: formData.date,
        type: formData.type,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        notifyAt: formData.notifyAt || undefined,
      });
      setFormData({
        title: "",
        date: "",
        type: "work",
        description: "",
        imageUrl: "",
        notifyAt: "",
      });
      toast.success("Task added to calendar! 🎉");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast.success("Task removed");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[oklch(0.98_0.03_250)] via-[oklch(0.96_0.04_240)] to-[oklch(0.94_0.03_220)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[oklch(0.92_0.03_250)] border-t-[oklch(0.58_0.12_250)] animate-spin mx-auto mb-4" />
          <p className="text-[oklch(0.30_0.03_250)] font-semibold">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-[oklch(0.98_0.03_250)] to-white backdrop-blur-md border-b-2 border-white/40">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[oklch(0.58_0.12_250)] to-[oklch(0.65_0.15_240)] rounded-xl shadow-lg">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[oklch(0.30_0.03_250)]">
                Content Calendar
              </h1>
              <p className="text-sm text-[oklch(0.55_0.02_250)] mt-1">
                Plan and schedule your tasks with a clear blue overview.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Form - Left Side */}
          <div className="lg:col-span-2">
            <TaskForm
              title={formData.title}
              date={formData.date}
              type={formData.type}
              description={formData.description}
              imageUrl={formData.imageUrl}
              notifyAt={formData.notifyAt}
              onTitleChange={(value) =>
                setFormData((prev) => ({ ...prev, title: value }))
              }
              onDateChange={(value) =>
                setFormData((prev) => ({ ...prev, date: value }))
              }
              onTypeChange={(value) => {
                setFormData((prev) => ({ ...prev, type: value as TaskType }));
              }}
              onDescriptionChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              onImageUrlChange={(value) =>
                setFormData((prev) => ({ ...prev, imageUrl: value }))
              }
              onNotifyAtChange={(value) =>
                setFormData((prev) => ({ ...prev, notifyAt: value }))
              }
              onSubmit={handleAddTask}
              isLoading={isSubmitting}
            />
          </div>

          {/* Calendar - Right Side */}
          <div className="lg:col-span-3">
            <Card className="p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[oklch(0.92_0.01_65)] bg-gradient-to-br from-white to-[oklch(0.99_0.002_65)]">
              <CalendarGrid
                currentMonth={currentMonth}
                tasks={tasks}
                onPrevMonth={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1
                    )
                  )
                }
                onNextMonth={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1
                    )
                  )
                }
                onToday={() => setCurrentMonth(new Date())}
                onDeleteTask={handleDeleteTask}
              />
            </Card>

            {/* Task List */}
            <div className="mt-6">
              <VideoList videos={tasks} onDeleteVideo={handleDeleteTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
