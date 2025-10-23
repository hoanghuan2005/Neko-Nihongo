import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import NekoChatbot from "../components/NekoChatbot.jsx";

export default function MainLayout() {
  const location = useLocation();

  // Ẩn BottomNav ở các trang như login, signup
  const hideNav = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNav && <BottomNav />} <NekoChatbot />
    </div>
  );
}
