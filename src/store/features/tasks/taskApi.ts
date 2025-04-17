import type Task from "@/types/task";

const API_BASE_URL = "/api/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data.data;
};
