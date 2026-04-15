import { useState } from "react";
import { DashboardHeader } from "../molecules/DashboardHeader";
import { TaskList } from "./TaskList";

export function DashboardContent({ tasks = [], onEdit, onDelete }) {
  const [filter, setFilter] = useState("all");

  // safe counts with normalization
  const total = tasks.length;

  const todo = tasks.filter(
    (t) => t.status?.toLowerCase().trim() === "todo",
  ).length;

  const inProgress = tasks.filter(
    (t) =>
      t.status?.toLowerCase().trim() === "in progress" ||
      t.status?.toLowerCase().trim() === "in-progress",
  ).length;

  const done = tasks.filter(
    (t) => t.status?.toLowerCase().trim() === "done",
  ).length;

  // filtered tasks (FIXED)
  const filteredTasks = tasks.filter((task) => {
    const status = task.status?.toLowerCase().trim();

    if (filter === "all") return true;
    return status === filter;
  });

  const getButtonStyle = (type) => {
    const base = "px-3 py-1 rounded-lg text-sm transition";

    const active = {
      all: "bg-[#5c5470] text-white",
      todo: "bg-orange-100 text-orange-700",
      "in-progress": "bg-blue-100 text-blue-700",
      done: "bg-green-100 text-green-700",
    };

    const inactive = "bg-white/60 text-gray-600 hover:bg-white";

    return `${base} ${filter === type ? active[type] : inactive}`;
  };
  return (
    <div className="space-y-6 py-5">
      {/* HEADER */}
      <div className="bg-white/40 backdrop-blur-sm rounded-xl p-5 shadow-sm">
        <DashboardHeader title="My Tasks">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={getButtonStyle("all")}
            >
              All ({total})
            </button>

            <button
              onClick={() => setFilter("todo")}
              className={getButtonStyle("todo")}
            >
              Todo ({todo})
            </button>

            <button
              onClick={() => setFilter("in-progress")}
              className={getButtonStyle("in-progress")}
            >
              In Progress ({inProgress})
            </button>

            <button
              onClick={() => setFilter("done")}
              className={getButtonStyle("done")}
            >
              Done ({done})
            </button>
          </div>
        </DashboardHeader>
      </div>

      {/* TASK LIST */}
      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 shadow-sm min-h-[60vh]">
        <TaskList tasks={filteredTasks} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
