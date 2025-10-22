import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  PawPrint,
  MessageCircle,
  Users
} from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/learn", label: "Learn", icon: <BookOpen size={20} /> },
    { to: "/pet", label: "Pet", icon: <PawPrint size={20} /> },
    { to: "/chat", label: "Chat", icon: <MessageCircle size={20} /> },
    { to: "/social", label: "Social", icon: <Users size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-around py-2 shadow-md z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-pink-500" : "text-gray-500"
            }`
          }
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
