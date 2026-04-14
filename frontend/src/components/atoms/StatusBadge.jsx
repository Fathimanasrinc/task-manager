export function StatusBadge({ status }) {
  const colors = {
    pending: "bg-yellow-200 text-yellow-800",
    "in-progress": "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
}