import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TaskFormProps {
  title: string;
  date: string;
  type: "work" | "personal" | "content";
  description: string;
  imageUrl: string;
  notifyAt: string;
  onTitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
  onNotifyAtChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function TaskForm({
  title,
  date,
  type,
  description,
  imageUrl,
  notifyAt,
  onTitleChange,
  onDateChange,
  onTypeChange,
  onDescriptionChange,
  onImageUrlChange,
  onNotifyAtChange,
  onSubmit,
  isLoading = false,
}: TaskFormProps) {
  const handleTypeChange = (value: string) => {
    if (value === "work" || value === "personal" || value === "content") {
      onTypeChange(value);
    }
  };

  return (
    <Card className="p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-[oklch(0.90_0.03_260)] bg-gradient-to-br from-white to-[oklch(0.97_0.03_250)]">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-[oklch(0.58_0.12_250)] to-[oklch(0.65_0.15_240)]">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-[oklch(0.30_0.03_250)]">
          Add New Task
        </h2>
        <span className="ml-auto text-[11px] font-medium text-[oklch(0.55_0.02_250)]">
          Calendar view
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="title"
            className="text-sm font-semibold text-[oklch(0.30_0.03_250)]"
          >
            Task Title
          </Label>
          <Input
            id="title"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="mt-2 border-[oklch(0.90_0.03_260)] focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg"
          />
        </div>

        <div>
          <Label
            htmlFor="date"
            className="text-sm font-semibold text-[oklch(0.30_0.03_250)]"
          >
            Deadline
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="mt-2 border-[oklch(0.90_0.03_260)] focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold text-[oklch(0.30_0.03_250)]">
            Task Type
          </Label>
          <Select value={type} onValueChange={handleTypeChange}>
            <SelectTrigger className="mt-2 border-[oklch(0.90_0.03_260)] focus:ring-[oklch(0.58_0.12_250)] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[oklch(0.60_0.14_260)]" />
                  Work
                </span>
              </SelectItem>
              <SelectItem value="personal">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[oklch(0.80_0.04_190)]" />
                  Personal
                </span>
              </SelectItem>
              <SelectItem value="content">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[oklch(0.70_0.10_240)]" />
                  Content
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor="imageUrl"
            className="text-sm font-semibold text-[oklch(0.30_0.03_250)]"
          >
            Image URL (Optional)
          </Label>
          <Input
            id="imageUrl"
            placeholder="Paste image link..."
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            className="mt-2 border-[oklch(0.90_0.03_260)] focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg"
          />
        </div>

        <div>
          <Label
            htmlFor="notifyAt"
            className="text-sm font-semibold text-[oklch(0.30_0.03_250)]"
          >
            Reminder Time (Optional)
          </Label>
          <Input
            id="notifyAt"
            type="datetime-local"
            value={notifyAt}
            onChange={(e) => onNotifyAtChange(e.target.value)}
            className="mt-2 border-[oklch(0.90_0.03_260)] focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] rounded-lg"
          />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="text-sm font-semibold text-[oklch(0.30_0.03_250)]"
          >
            Description (Optional)
          </Label>
          <Textarea
            id="description"
            placeholder="Add task details..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="mt-2 border-[oklch(0.90_0.03_260)] focus:ring-[oklch(0.58_0.12_250)] focus:border-[oklch(0.58_0.12_250)] resize-none rounded-lg"
            rows={3}
          />
        </div>

        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-[oklch(0.58_0.12_250)] to-[oklch(0.65_0.15_240)] hover:from-[oklch(0.55_0.12_250)] hover:to-[oklch(0.62_0.14_240)] text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isLoading ? "Adding..." : "Add to Calendar"}
        </Button>
      </div>
    </Card>
  );
}
