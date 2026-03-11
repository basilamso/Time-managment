import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TaskFormProps {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  estimate?: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  onEstimateChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function TaskForm({
  title,
  description,
  priority,
  dueDate,
  estimate,
  onTitleChange,
  onDescriptionChange,
  onPriorityChange,
  onDueDateChange,
  onEstimateChange,
  onSubmit,
  isLoading = false,
}: TaskFormProps) {
  const handlePriorityChange = (value: string) => {
    if (value === "low" || value === "medium" || value === "high") {
      onPriorityChange(value);
    }
  };

  return (
    <Card className="p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[oklch(0.90_0.03_260)] bg-gradient-to-br from-white to-[oklch(0.97_0.04_250)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-[oklch(0.58_0.12_250)] to-[oklch(0.65_0.15_240)] rounded-lg">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[oklch(0.30_0.03_250)]">
            Add New Task
          </h2>
          <p className="text-xs text-[oklch(0.55_0.02_250)]">
            Capture all details so you never lose track.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2 space-y-4">
          {/* Task Title */}
          <div>
            <Label
              htmlFor="task-title"
              className="text-sm font-semibold text-[oklch(0.30_0.03_250)] block mb-2"
            >
              Task Title
            </Label>
            <Input
              id="task-title"
              placeholder="Write a clear, action-focused title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="border-2 border-[oklch(0.90_0.03_260)] focus:ring-2 focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg transition-all"
            />
          </div>

          {/* Task Description */}
          <div>
            <Label
              htmlFor="task-description"
              className="text-sm font-semibold text-[oklch(0.30_0.03_250)] block mb-2"
            >
              Description
            </Label>
            <Textarea
              id="task-description"
              placeholder="Add context, acceptance criteria, or a short brief..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="border-2 border-[oklch(0.90_0.03_260)] focus:ring-2 focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg resize-none transition-all"
              rows={3}
            />
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <Label
            htmlFor="task-due-date"
            className="text-sm font-semibold text-[oklch(0.30_0.03_250)]"
          >
            Due Date (optional)
          </Label>
          <Input
            id="task-due-date"
            type="date"
            value={dueDate ?? ""}
            onChange={(e) => onDueDateChange(e.target.value)}
            className="border-2 border-[oklch(0.90_0.03_260)] focus:ring-2 focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg transition-all"
          />
        </div>

        {/* Estimate */}
        <div className="space-y-2">
          <Label
            htmlFor="task-estimate"
            className="text-sm font-semibold text-[oklch(0.30_0.03_250)]"
          >
            Effort Estimate
          </Label>
          <Input
            id="task-estimate"
            placeholder='e.g. "1h", "3d", "S/M/L"'
            value={estimate ?? ""}
            onChange={(e) => onEstimateChange(e.target.value)}
            className="border-2 border-[oklch(0.90_0.03_260)] focus:ring-2 focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg transition-all"
          />
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[oklch(0.30_0.03_250)]">
            Priority
          </Label>
          <Select value={priority} onValueChange={handlePriorityChange}>
            <SelectTrigger className="border-2 border-[oklch(0.90_0.03_260)] focus:ring-2 focus:ring-[oklch(0.58_0.12_250)] rounded-lg transition-all">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.80_0.06_180)]" />
                  Low
                </span>
              </SelectItem>
              <SelectItem value="medium">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.75_0.09_230)]" />
                  Medium
                </span>
              </SelectItem>
              <SelectItem value="high">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.65_0.12_260)]" />
                  High
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full mt-6 bg-gradient-to-r from-[oklch(0.58_0.12_250)] to-[oklch(0.65_0.15_240)] hover:from-[oklch(0.55_0.12_250)] hover:to-[oklch(0.62_0.14_240)] text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add Task
          </>
        )}
      </Button>
    </Card>
  );
}
