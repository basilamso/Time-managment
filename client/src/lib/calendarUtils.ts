export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function getMonthName(date: Date): string {
  return date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function getTaskTypeColor(type: string): string {
  switch (type) {
    case "work":
      return "bg-[oklch(0.65_0.25_25)]"; // Coral
    case "personal":
      return "bg-[oklch(0.62_0.18_142)]"; // Sage Green
    case "content":
      return "bg-[oklch(0.65_0.20_200)]"; // Sky Blue
    default:
      return "bg-gray-400";
  }
}

export function getTaskTypeLabel(type: string): string {
  switch (type) {
    case "work":
      return "Work";
    case "personal":
      return "Personal";
    case "content":
      return "Content";
    default:
      return type;
  }
}

export function generateCalendarDays(date: Date): (number | null)[] {
  const daysInMonth = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  const emptyDays = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  return [...emptyDays, ...days];
}
