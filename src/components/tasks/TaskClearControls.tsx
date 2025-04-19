import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { clearDayTasks, clearTasks } from '@/store/features/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';

export default function TaskClearControls() {
  const dispatch = useAppDispatch();
  const { isInitialized, tasks, selectedDay } = useAppSelector((state) => state.tasks);
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
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <p className="border-muted w-full rounded-xl border-2 px-4 py-2 text-center sm:w-auto">
        {isInitialized ? <>Total tasks: {tasks.length}</> : 'Loading tasks…'}
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

          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete your tasks? You can delete all tasks or just the ones
            from <strong>{selectedDay}</strong>.
          </p>

          <Separator />

          <DialogFooter className="flex flex-col justify-end gap-2 sm:flex-row">
            <Button variant="secondary" onClick={clearTasksForDay}>
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
