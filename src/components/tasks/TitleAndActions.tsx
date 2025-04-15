import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "./TaskForm";

export default function TitleAndActions() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      {/* Title and Date */}
      <div className="w-full sm:w-auto text-center sm:text-left">
        <h1 className="text-2xl font-bold">Today&apos;s tasks</h1>
        <p className="text-muted-foreground">
          {format(new Date(), "EEE MMM dd yyyy")}
        </p>
      </div>

      {/* Add Task Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">Add Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm text-muted-foreground">
            Add a new task to your list by filling out the form below.
          </p>
          <TaskForm
            closeModal={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
