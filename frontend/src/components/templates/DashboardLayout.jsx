import { Sidebar } from "../organisms/Sidebar";
import { Navbar } from "../organisms/Navbar";

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#dbd8e3]">

      <Sidebar />
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="pt-16 ml-64 p-6">
        {children}
      </div>

    </div>
  );
}