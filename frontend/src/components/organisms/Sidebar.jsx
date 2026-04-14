import { NavItem } from "../molecules/NavItem";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="fixed z-4 top-0 left-0 h-screen w-64 bg-[#2f2a3a] text-white flex flex-col border-r border-white/10">

      {/* Header / Brand */}
      <div className="px-6 py-5 border-b border-white/10">
        <h1 className="text-xl font-semibold tracking-wide">
          TaskManager
        </h1>
        <p className="text-xs text-white/60 mt-1">
          Manage your tasks
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2">
        <NavItem to="/dashboard" label="🏠 Dashboard" />
        <NavItem to="/create" label="➕ Add Tasks" />
      </div>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-lg text-sm font-medium 
                     bg-red-500/10 text-red-300 
                     hover:bg-red-500 hover:text-white 
                     transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}