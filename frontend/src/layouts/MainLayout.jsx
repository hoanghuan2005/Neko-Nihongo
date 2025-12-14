import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import NekoChatbot from "../components/NekoChatbot.jsx";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useState } from "react";

export default function MainLayout() {
  const location = useLocation();
  const [sideBarOpen, setSidebarOpen] = useState(false);

  // Ẩn BottomNav ở các trang như login, signup
  // const hideNav = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-skin-50 text-gray-800">
      <Header onToggle={() => setSidebarOpen((prev) => !prev)} />
      <div className="min-h-screen flex flex-1">
        <Sidebar isExpanded={sideBarOpen} />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      {/* {!hideNav && <BottomNav />} <NekoChatbot /> */}
    </div>
  );
}
