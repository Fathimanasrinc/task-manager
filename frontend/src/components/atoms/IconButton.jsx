export function IconButton({ children, onClick, color = "bg-gray-200" }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg ${color} hover:opacity-80 transition`}
    >
      {children}
    </button>
  );
}