export function StatusBadge({ status }) {
  const s = status?.toLowerCase().trim();

  // ✅ normalize status
  let normalized = "todo";

  if (s === "todo") normalized = "todo";
  else if (s === "in progress" || s === "in-progress")
    normalized = "in-progress";
  else if (s === "done") normalized = "done";

  // ✅ colors mapped correctly
  const colors = {
    todo: "bg-yellow-200 text-yellow-800",
    "in-progress": "bg-blue-200 text-blue-800",
    done: "bg-green-200 text-green-800",
  };

  // ✅ labels
  const labels = {
    todo: "Todo",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${colors[normalized]}`}
    >
      {labels[normalized]}
    </span>
  );
}