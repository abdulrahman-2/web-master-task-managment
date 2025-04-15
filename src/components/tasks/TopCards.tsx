import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "./AnimatedCounter";
import { useAppSelector } from "@/store/hooks";

export default function TopCards() {
  const { tasks } = useAppSelector((state) => state.tasks);

  // Calculate metrics for top cards
  const completed = tasks.filter((task) => task.status === "Done").length;
  const pending = tasks.filter((task) => task.status === "In Progress").length;
  const total = tasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            <AnimatedCounter value={completed} /> Tasks
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            <AnimatedCounter value={pending} /> Tasks
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            <AnimatedCounter value={progress} /> %
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
