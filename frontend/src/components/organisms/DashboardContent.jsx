import { DashboardHeader } from "../molecules/DashboardHeader";
import { TaskList } from "./TaskList";

export function DashboardContent({ tasks, onEdit, onDelete, children }) {
  return (
    <div>
      <DashboardHeader title="My Tasks">
        {children}
      </DashboardHeader>

      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}