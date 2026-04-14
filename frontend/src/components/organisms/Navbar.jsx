import { Logo } from "../atoms/Logo";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-[#2f2a3a] border-b border-white/10 z-40">

      <div className="h-full flex items-center justify-between px-6">

        {/* LEFT - Logo */}
        <div className="flex items-center">
        </div>

        {/* RIGHT - Actions */}
        <div className="flex items-center gap-3">

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium 
                       bg-red-500/10 text-red-300 
                       hover:bg-red-500 hover:text-white 
                       transition"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}