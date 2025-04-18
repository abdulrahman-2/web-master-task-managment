import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearDayTasks, clearTasks } from "@/store/features/tasks/tasksSlice";
import { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function TaskClearControls() {
  const dispatch = useAppDispatch();
  const { isInitialized, tasks, selectedDay } = useAppSelector(
    (state) => state.tasks
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const clearTasksForDay = () => {
    dispatch(clearDayTasks(selectedDay));
    setIsConfirmOpen(false);
  };

  const clearAllTasks = () => {
    dispatch(clearTasks());
    setIsConfirmOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <p className="border-2 border-muted rounded-xl py-2 px-4 w-full sm:w-auto text-center">
        {isInitialized ? <>Total tasks: {tasks.length}</> : "Loading tasks…"}
      </p>
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={tasks.length === 0 || !isInitialized}
            className="w-full sm:w-auto"
          >
            Clear All
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete your tasks? You can delete all tasks
            or just the ones from <strong>{selectedDay}</strong>.
          </p>

          <Separator className="my-4" />

          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2">
            <Button
              variant="secondary"
              onClick={clearTasksForDay}
            >
              Delete for this day only
            </Button>
            <Button variant="destructive" onClick={clearAllTasks}>
              Delete all tasks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
