"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyList from "@/components/tasks/EmptyList";
import Task from "@/components/tasks/Task";
import TopCards from "@/components/tasks/TopCards";
import TitleAndActions from "@/components/tasks/TitleAndActions";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import LoadingList from "@/components/tasks/LoadingList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeTasks, reset } from "@/store/features/tasks/tasksSlice";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import TaskClearControls from "@/components/tasks/TaskClearControls";

export default function TaskList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuthContext();
  const { isInitialized, filteredTasks } = useAppSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      dispatch(initializeTasks());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, router, user]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="border rounded-xl shadow mx-auto p-4 w-full">
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
                      <Task key={task._id} idx={idx} task={task} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <TaskClearControls />
      </div>
    </div>
  );
}
