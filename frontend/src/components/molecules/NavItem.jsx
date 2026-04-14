import { Link } from "react-router-dom";

export function NavItem({ to, label }) {
  return (
    <Link
      to={to}
      className="text-white hover:bg-[#352f44] px-3 py-2 rounded-lg transition block"
    >
      {label}
    </Link>
  );
}