import { Card } from "@/components/ui/card";
import { Trash2, ImageIcon } from "lucide-react";
import { TaskEntry } from "@/hooks/useCalendarStorage";
import { getTaskTypeColor, getTaskTypeLabel } from "@/lib/calendarUtils";

interface VideoListProps {
  videos: TaskEntry[];
  onDeleteVideo: (id: string) => void;
}

/**
 * Design Philosophy: Warm Playful Gradient
 * - Clean list layout with color-coded type indicators
 * - Hover effects for interactivity
 * - Sorted by date for easy planning
 * - Shows metadata (date, type, description)
 */
export function VideoList({ videos, onDeleteVideo }: VideoListProps) {
  if (videos.length === 0) {
    return null;
  }

  const sortedVideos = [...videos].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card className="p-6 shadow-lg border-0 bg-white">
      <h3 className="text-lg font-bold text-[oklch(0.3_0.02_65)] mb-4">
        Scheduled Tasks ({videos.length})
      </h3>
      <div className="space-y-3">
        {sortedVideos.map((video) => (
          <div
            key={video.id}
            className="flex items-start justify-between p-3 bg-[oklch(0.99_0.002_65)] rounded-lg border border-[oklch(0.92_0.01_65)] hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${getTaskTypeColor(
                    video.type
                  )}`}
                />
                <h4 className="font-semibold text-[oklch(0.3_0.02_65)]">
                  {video.title}
                </h4>
              </div>
              <div className="text-xs text-[oklch(0.5_0.01_65)] space-x-2">
                <span>
                  📅 {new Date(video.date).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>{getTaskTypeLabel(video.type)}</span>
              </div>
              {video.imageUrl && (
                <div className="mt-1 flex items-center gap-1 text-xs text-[oklch(0.5_0.01_65)]">
                  <ImageIcon className="w-3 h-3" />
                  <span className="truncate max-w-[200px]">
                    {video.imageUrl}
                  </span>
                </div>
              )}
              {video.description && (
                <p className="text-sm text-[oklch(0.5_0.01_65)] mt-1">
                  {video.description}
                </p>
              )}
            </div>
            <button
              onClick={() => onDeleteVideo(video.id)}
              className="ml-4 p-2 text-[oklch(0.65_0.25_25)] hover:bg-[oklch(0.98_0.008_65)] rounded-lg transition-colors"
              title="Delete video"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
