import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, PawPrint, MessageCircle, Users } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/", label: "Home", icon: <Home size={19} /> },
    { to: "/learn", label: "Learn", icon: <BookOpen size={19} /> },
    { to: "/pet", label: "Pet", icon: <PawPrint size={19} /> },
    { to: "/chat", label: "Chat", icon: <MessageCircle size={19} /> },
    { to: "/profile", label: "Profile", icon: <Users size={19} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 border-t border-skin-200 flex justify-around py-2.5 shadow-md z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            // Thêm các lớp transition và padding để hiệu ứng đẹp hơn
            `flex flex-col items-center text-xs transition-all duration-300 ease-in-out transform w-12 py-1 rounded-lg ${
              isActive
                ? "text-white scale-105 -translate-y-1 bg-warm-500 shadow-md" // Hiệu ứng khi được chọn
                : "text-gray-500" // Trạng thái mặc định
            }`
          }
        >
          {item.icon}
          <span className="font-semibold">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
