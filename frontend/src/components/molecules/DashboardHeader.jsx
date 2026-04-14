export function DashboardHeader({ title, children }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-[#2a2438]">
        {title}
      </h2>
      {children}
    </div>
  );
}