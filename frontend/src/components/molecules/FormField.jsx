export function FormField({ label, children }) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <label className="text-sm text-[#352f44] font-medium">
        {label}
      </label>

      {children}
    </div>
  );
}