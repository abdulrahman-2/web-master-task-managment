"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyList from "@/components/tasks/EmptyList";
import Task from "@/components/tasks/Task";
import TopCards from "@/components/tasks/TopCards";
import TitleAndActions from "@/components/tasks/TitleAndActions";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import LoadingList from "@/components/tasks/LoadingList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAllTasks,
  initializeTasks,
} from "@/store/features/tasks/tasksSlice";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const { isInitialized, filteredTasks } = useAppSelector(
    (state) => state.tasks
  );

  const clearAll = () => {
    dispatch(deleteAllTasks());
  };

  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-135px)] flex items-center justify-center">
      <div className="border rounded-xl shadow mx-auto p-4 max-w-4xl">
        <TopCards />
        <TitleAndActions />
        <TaskFilters />

        <ScrollArea className="relative space-y-4 mb-6 sm:max-h-[360px]">
          <div className="relative sm:min-h-[360px]">
            <AnimatePresence mode="popLayout">
              {!isInitialized ? (
                <LoadingList />
              ) : filteredTasks.length === 0 ? (
                <EmptyList />
              ) : (
                <div className="sm:absolute flex flex-col gap-2 h-full w-full sm:min-h-[360px]">
                  <AnimatePresence mode="popLayout">
                    {filteredTasks.map((task, idx) => (
                      <Task key={task.id} idx={idx} task={task} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="border-2 border-muted rounded-xl py-2 px-4 w-full sm:w-auto text-center">
            {isInitialized ? (
              <>Total tasks: {filteredTasks.length}</>
            ) : (
              "Loading tasks…"
            )}
          </p>
          <Button
            variant="destructive"
            onClick={clearAll}
            disabled={filteredTasks.length === 0 || !isInitialized}
            className="w-full sm:w-auto"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
