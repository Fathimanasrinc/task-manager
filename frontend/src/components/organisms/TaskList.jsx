import { TaskCard } from "../molecules/TaskCard";
import { EmptyState } from "../molecules/EmptyState";

export function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <EmptyState message="No tasks yet. Create one!" />;
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}