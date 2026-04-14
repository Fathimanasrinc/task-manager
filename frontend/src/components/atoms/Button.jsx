export function Button({ children, onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full bg-[#5c5470] text-white px-2 py-2 rounded-lg hover:bg-[#352f44] transition"
    >
      {children}
    </button>
  );
}
