import { useState } from "react";
import { DashboardHeader } from "../molecules/DashboardHeader";
import { TaskList } from "./TaskList";

export function DashboardContent({ tasks, onEdit, onDelete }) {
  const [filter, setFilter] = useState("all");

  const total = tasks?.length || 0;
  const todo = tasks?.filter(t => t.status === "todo").length || 0;
  const inProgress = tasks?.filter(t => t.status === "in-progress").length || 0;
  const done = tasks?.filter(t => t.status === "done").length || 0;

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="space-y-6 py-5">

      {/* HEADER */}
      <div className="bg-white/40 backdrop-blur-sm rounded-xl  p-5 shadow-sm">

        <DashboardHeader title="My Tasks">

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 flex-wrap">

            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === "all"
                  ? "bg-[#5c5470] text-white"
                  : "bg-white/60"
              }`}
            >
              All ({total})
            </button>

            <button
              onClick={() => setFilter("todo")}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === "todo"
                  ? "bg-blue-500 text-white"
                  : "bg-white/60"
              }`}
            >
              Todo ({todo})
            </button>

            <button
              onClick={() => setFilter("in-progress")}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === "in-progress"
                  ? "bg-orange-500 text-white"
                  : "bg-white/60"
              }`}
            >
              In Progress ({inProgress})
            </button>

            <button
              onClick={() => setFilter("done")}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === "done"
                  ? "bg-green-600 text-white"
                  : "bg-white/60"
              }`}
            >
              Done ({done})
            </button>

          </div>

        </DashboardHeader>

      </div>

      {/* TASK LIST */}
      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 shadow-sm min-h-[60vh]">

        <TaskList
          tasks={filteredTasks}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </div>

    </div>
  );
}