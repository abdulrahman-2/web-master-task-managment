import Task from "@/types/task";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const response = await fetch("http://localhost:3000/api/tasks");
    const data = await response.json();
    return data;
});

export const createTasks = createAsyncThunk(
    "tasks/createTasks",
    async (taskData: any) => {
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });
        const data = await response.json();
        return data;
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.data as Task;
  }
);
export const deleteTaskAsync = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId: string) => {
        const response = await fetch(
            `http://localhost:3000/api/tasks/${taskId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        return data;
    }
);