import { Card } from "../atoms/Card";
import { StatusBadge } from "../atoms/StatusBadge";
import { IconButton } from "../atoms/IconButton";

export function TaskCard({ task, onEdit, onDelete }) {
  const createdTime = new Date(task.createdAt).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

  return (
    <Card>
      <div className="flex justify-between items-start">
        
        <div>
          <h3 className="text-lg font-semibold text-[#2a2438]">
            {task.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {task.description}
          </p>

          {/* ⏰ CREATED TIME */}
          <p className="text-xs text-gray-400 mt-2">
            Created: {createdTime}
          </p>
        </div>

        <StatusBadge status={task.status} />
      </div>

      <div className="flex gap-2 mt-4">
        <IconButton color="bg-blue-200" onClick={() => onEdit(task)}>
          Edit
        </IconButton>

        <IconButton color="bg-red-200" onClick={() => onDelete(task.id)}>
          Delete
        </IconButton>
      </div>
    </Card>
  );
}