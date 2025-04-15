import { createListenerMiddleware } from "@reduxjs/toolkit";
import { initialize, initializeTasks, setFilteredTasks } from "./tasksSlice";
import type { AppDispatch, RootState } from "@/store/store";

// Create listener middleware
const tasksListener = createListenerMiddleware();
const listen = tasksListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for tasks initialization and fetch user tasks
listen({
  actionCreator: initializeTasks,

  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isInitialized } = getState().tasks;

    if (isInitialized) return;

    dispatch(initialize());
  },
});

// Listen for filter changes
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.tasks.searchQuery !== previousState.tasks.searchQuery ||
    currentState.tasks.statusFilter !== previousState.tasks.statusFilter ||
    currentState.tasks.priorityFilter !== previousState.tasks.priorityFilter ||
    currentState.tasks.sortBy !== previousState.tasks.sortBy ||
    currentState.tasks.sortDirection !== previousState.tasks.sortDirection ||
    currentState.tasks.tasks !== previousState.tasks.tasks,
  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const {
      isInitialized,
      tasks,
      searchQuery,
      statusFilter,
      priorityFilter,
      sortBy,
      sortDirection,
    } = getState().tasks;

    if (!isInitialized) return;

    let filteredTasks = [...tasks];

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(query)
      );
    }

    // Completion Filter
    if (statusFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === statusFilter
      );
    }

    // // Priority Filter
    if (priorityFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    // Sorting
    filteredTasks.sort((a, b) => {
      const isAsc = sortDirection === "asc";

      if (sortBy === "name") {
        return isAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      if (sortBy === "priority") {
        const order = { High: 3, Medium: 2, Low: 1 };
        return isAsc
          ? order[a.priority] - order[b.priority]
          : order[b.priority] - order[a.priority];
      }

      return 0;
    });

    // Dispatch to update tasks
    dispatch(setFilteredTasks(filteredTasks));
  },
});

export default tasksListener;
