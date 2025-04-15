import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaskFormData, taskSchema } from "@/utils/tasks/taskFormValidation";

export default function useTaskForm() {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "Low",
      status: "Todo",
    },
  });

  return { form };
}
