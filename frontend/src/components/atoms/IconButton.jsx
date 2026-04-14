export function IconButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${className}`}
    >
      {children}
    </button>
  );
}