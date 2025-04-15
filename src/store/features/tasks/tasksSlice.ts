import {
  createAction,
  createSlice,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type Task from "@/types/task";
import type { Priority, Status } from "@/types/task";

export type SortOption = "name" | "priority" | "status";
export type SortDirection = "asc" | "desc";

interface InitialState {
  isInitialized: boolean;

  tasks: Task[];
  filteredTasks: Task[];

  searchQuery: string;
  statusFilter: Status | "all";
  priorityFilter: Priority | "all";
  sortBy: SortOption;
  sortDirection: SortDirection;
}

const initialState: InitialState = {
  isInitialized: false,

  tasks: [],
  filteredTasks: [],

  searchQuery: "",
  statusFilter: "all",
  priorityFilter: "all",
  sortBy: "name",
  sortDirection: "desc",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initialize: (state) => {
      state.isInitialized = true;
    },

    setFilteredTasks: (state, action: PayloadAction<Task[]>) => {
      state.filteredTasks = action.payload;
    },

    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    deleteAllTasks: (state) => {
      state.tasks = [];
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<Status | "all">) => {
      state.statusFilter = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<Priority | "all">) => {
      state.priorityFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },

    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const id = nanoid();
      const taskData = action.payload;

      state.tasks = [...state.tasks, { id, ...taskData }];
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    updateTaskName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, name };
        }
        return task;
      });
    },
    updateTaskDescription: (
      state,
      action: PayloadAction<{ id: string; description: string }>
    ) => {
      const { id, description } = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, description };
        }
        return task;
      });
    },
    updateTaskPriority: (
      state,
      action: PayloadAction<{ id: string; priority: Priority }>
    ) => {
      const { id, priority } = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, priority };
        }
        return task;
      });
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: Status }>
    ) => {
      const { id, status } = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status };
        }
        return task;
      });
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: task.status === "Done" ? "In Progress" : "Done",
          };
        }
        return task;
      });
    },
  },
});

export const initializeTasks = createAction<void>("tasks/initialize");

export const {
  initialize,
  setFilteredTasks,
  setAllTasks,
  setSearchQuery,
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  setSortDirection,
  deleteAllTasks,
  addTask,
  deleteTask,
  updateTaskName,
  updateTaskDescription,
  updateTaskStatus,
  updateTaskPriority,
  toggleTaskStatus,
} = tasksSlice.actions;
export default tasksSlice.reducer;
