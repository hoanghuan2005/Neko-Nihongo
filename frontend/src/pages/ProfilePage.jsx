import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut, Loader } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5001/api/auth/logout", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-skin-50 via-white to-skin-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ</h1>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Settings size={24} className="text-gray-600" />
        </button>
      </header>

      {/* Profile Card */}
      {user && (
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            {/* Avatar & Name */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-warm-400 to-warm-500 rounded-full flex items-center justify-center text-5xl shadow-lg mb-4">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{user.email}</h2>
              <p className="text-gray-600 mt-2">
                Thành viên từ{" "}
                {new Date(
                  user.last_sign_in_at || new Date()
                ).toLocaleDateString("vi-VN")}
              </p>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-warm-50 to-warm-100 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-warm-600">0</p>
                <p className="text-sm text-gray-600 mt-1">XP</p>
              </div>
              <div className="bg-gradient-to-br from-skin-50 to-skin-100 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-skin-600">1</p>
                <p className="text-sm text-gray-600 mt-1">Cấp độ</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-pink-600">0</p>
                <p className="text-sm text-gray-600 mt-1">Streak</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg hover:from-red-600 hover:to-red-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <LogOut size={20} />
                  Đăng xuất
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
