import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Zap, MessageCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/learn", label: "Học", icon: BookOpen },
  { to: "/flashcards", label: "Flashcards", icon: Zap },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/friends", label: "Bạn bè", icon: Users },
];

export default function Sidebar({ isExpanded }) {
  return (
    <aside
      className={`w-60 border-r border-skin-200 bg-transparent p-1 gap-3 ${
        isExpanded ? "w-64" : "w-[82px]"
      }`}
    >
      {/* User / Avatar */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-warm-500 flex items-center justify-center text-white font-bold">
          H
        </div>

        {isExpanded && (
          <div className="leading-tight">
            <div className="text-sm font-semibold">Tim</div>
            <div className="text-xs text-gray-500">Neko Nihongo</div>
          </div>
        )}
      </div>
      <nav className="flex flex-col gap-2 px-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors
        ${
          isActive
            ? "bg-warm-500 text-white"
            : "text-gray-700 hover:bg-white/60"
        }
        ${isExpanded ? "gap-3" : "justify-center"}`
            }
          >
            <Icon size={21} />

            {isExpanded && (
              <span className="text-sm font-medium whitespace-nowrap">
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* <div className="mt-auto text-xs text-gray-500 px-3">© Neko Nihongo</div> */}
    </aside>
  );
}
