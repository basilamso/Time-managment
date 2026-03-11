import { useState, useEffect } from "react";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  /** Optional ISO date string for when this task is due */
  dueDate?: string;
  /** Optional short text estimate, e.g. \"1h\", \"3d\" */
  estimate?: string;
  createdAt: string;
  completedAt?: string;
}

const STORAGE_KEY = "content-calendar-kanban-tasks";

export function useKanbanStorage() {
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
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

  const addTask = (task: Omit<KanbanTask, "id" | "createdAt">) => {
    const newTask: KanbanTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTask = (id: string, updates: Partial<KanbanTask>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updatedTask: KanbanTask = {
            ...t,
            status: newStatus,
          };
          if (newStatus === "done" && !t.completedAt) {
            updatedTask.completedAt = new Date().toISOString();
          }
          return updatedTask;
        }
        return t;
      })
    );
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((t) => t.status === status);
  };

  const getTaskCount = (status: TaskStatus) => {
    return tasks.filter((t) => t.status === status).length;
  };

  return {
    tasks,
    isLoaded,
    addTask,
    deleteTask,
    updateTask,
    moveTask,
    getTasksByStatus,
    getTaskCount,
  };
}
