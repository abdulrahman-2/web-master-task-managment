export type Priority = "Low" | "Medium" | "High";
export type Status = "Todo" | "In Progress" | "Done" | "Cancelled";

export default interface Task {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  status: Status;
};
