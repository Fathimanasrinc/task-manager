export function DashboardHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* LEFT - Title */}
      <div>
        {title && (
          <h1 className="text-xl font-semibold text-[#2a2438]">
            {title}
          </h1>
        )}
      </div>

      {/* RIGHT - Actions */}
      <div className="flex items-center gap-3">
        {children}
      </div>

    </div>
  );
}