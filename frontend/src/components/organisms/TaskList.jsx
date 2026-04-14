import { TaskCard } from "../molecules/TaskCard";
import { EmptyState } from "../molecules/EmptyState";
import { useDispatch } from "react-redux";
import { updateTaskAsync } from "../../redux/slices/taskSlice";

export function TaskList({ tasks, onEdit, onDelete }) {
  const dispatch = useDispatch();

  if (!tasks || tasks.length === 0) {
    return <EmptyState message="No tasks yet. Create one!" />;
  }

  const handleStatusChange = (task, newStatus) => {
    dispatch(
      updateTaskAsync({
        userId: task.userId,   // IMPORTANT
        taskId: task.id,
        title: task.title,
        description: task.description,
        status: newStatus,
      })
    );
  };

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}