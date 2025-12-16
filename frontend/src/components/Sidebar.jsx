import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  Zap,
  MessageCircle,
  Users,
  Shield,
  FilePlus,
} from "lucide-react";

const baseItems = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/learn", label: "Học", icon: BookOpen },
  { to: "/flashcards", label: "Flashcards", icon: Zap },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/friends", label: "Bạn bè", icon: Users },
];

const adminItems = [
  { to: "/admin", label: "Admin", icon: Shield },
  { to: "/admin/users", label: "Quản lý user", icon: Users },
  { to: "/admin/lessons", label: "Quản lý bài học", icon: FilePlus },
];

export default function Sidebar({ isExpanded }) {
  // Read a lightweight 'user' from localStorage to determine admin access.
  // Expected format: { name, email, isAdmin: true }
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch (e) {
    user = null;
  }

  const items = [...baseItems];
  if (user && user.isAdmin) items.push(...adminItems);

  return (
    <aside
      className={`border-r border-skin-200 bg-transparent transition-all duration-300
      ${isExpanded ? "w-60" : "w-20"}`}
    >
      <nav className="flex flex-col gap-2 px-4 pt-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg
              transition-colors
              ${
                isActive
                  ? "bg-warm-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <div className="w-6 flex justify-center shrink-0">
              <Icon size={21} />
            </div>

            <span
              className={`text-sm font-medium whitespace-nowrap
              transition-all duration-300 overflow-hidden
              ${
                isExpanded
                  ? "opacity-100 translate-x-0 w-auto"
                  : "opacity-0 -translate-x-2 w-0"
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
