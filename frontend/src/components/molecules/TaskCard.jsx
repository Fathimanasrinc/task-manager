import { Card } from "../atoms/Card";
import { StatusBadge } from "../atoms/StatusBadge";
import { IconButton } from "../atoms/IconButton";

import { Pencil, Trash2 } from "lucide-react";

export function TaskCard({ task, onEdit, onDelete }) {
  const createdTime = task.createdAt
    ? new Date(task.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <Card className="hover:shadow-lg transition">

      {/* MAIN ROW */}
      <div className="flex justify-between gap-4">

        {/* LEFT CONTENT */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#2a2438]">
            {task.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {task.description}
          </p>

          <p className="text-xs text-gray-400 mt-3">
            Created: {createdTime}
          </p>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex flex-col items-end gap-2">

          <StatusBadge status={task.status} />

          <div className="flex gap-2 mt-2">

            <IconButton
              onClick={() => onEdit(task)}
              className="w-9 h-9 flex items-center justify-center rounded-lg 
                         bg-blue-500/10 text-blue-600 
                         hover:bg-blue-500 hover:text-white 
                         transition"
            >
              <Pencil size={16} />
            </IconButton>

            <IconButton
              onClick={() => onDelete(task.id)}
              className="w-9 h-9 flex items-center justify-center rounded-lg 
                         bg-red-500/10 text-red-600 
                         hover:bg-red-500 hover:text-white 
                         transition"
            >
              <Trash2 size={16} />
            </IconButton>

          </div>

        </div>
      </div>

    </Card>
  );
}