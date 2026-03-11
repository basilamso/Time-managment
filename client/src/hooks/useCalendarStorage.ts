import { useState, useEffect } from "react";

export type TaskType = "work" | "personal" | "content";

export interface TaskEntry {
  id: string;
  title: string;
  /**
   * ISO date string representing the task deadline (YYYY-MM-DD).
   */
  date: string;
  type: TaskType;
  description: string;
  /**
   * Optional image associated with the task (thumbnail, reference, etc.).
   */
  imageUrl?: string;
  /**
   * Optional ISO datetime string for when a reminder notification should fire.
   */
  notifyAt?: string;
  /**
   * Set to true once we've already fired a notification for this task.
   */
  notified?: boolean;
}

const STORAGE_KEY = "content-calendar-calendar-tasks";

export function useCalendarStorage() {
  const [tasks, setTasks] = useState<TaskEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored tasks:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (task: Omit<TaskEntry, "id" | "notified">) => {
    const newTask: TaskEntry = {
      ...task,
      id: Date.now().toString(),
      notified: task.notified ?? false,
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTask = (id: string, updates: Partial<TaskEntry>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const getTasksByDate = (date: Date) => {
    return tasks.filter((t) => {
      const taskDate = new Date(t.date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getTasksByMonth = (date: Date) => {
    return tasks.filter((t) => {
      const taskDate = new Date(t.date);
      return (
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return {
    tasks,
    isLoaded,
    addTask,
    deleteTask,
    updateTask,
    getTasksByDate,
    getTasksByMonth,
  };
}
