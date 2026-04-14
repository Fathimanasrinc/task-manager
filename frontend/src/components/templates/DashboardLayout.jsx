export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#dbd8e3] p-6">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}