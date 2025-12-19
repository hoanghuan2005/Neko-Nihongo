import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, Search, User, Bell, UserCheck, X } from "lucide-react";

export default function Header({ onToggle }) {
  const [friendRequests, setFriendRequests] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadFriendRequests();
  }, []);

  const loadFriendRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5001/api/friend/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setFriendRequests(data.data || []);
      }
    } catch (err) {
      console.error("Error loading friend requests:", err);
    }
  };

  const handleAcceptFriend = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5001/api/friend/accept/${requestId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        loadFriendRequests();
      }
    } catch (err) {
      console.error("Error accepting friend:", err);
    }
  };

  const handleRejectFriend = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5001/api/friend/requests/${requestId}/reject`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        loadFriendRequests();
      }
    } catch (err) {
      console.error("Error rejecting friend:", err);
    }
  };

  return (
    <header className="w-full bg-transparent border-b border-skin-200">
      <div className="W-full mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-lg hover:bg-white/60 pl-3.5"
            onClick={onToggle}
          >
            <MenuIcon size={20} />
          </button>

          <Link to="/" className="flex items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-warm-500 flex items-center justify-center text-white font-bold">
              ねこ
            </div>
            <div className="text-lg font-semibold">Neko Nihongo</div>
          </Link>
        </div>
        <div className="relative">
          <input
            placeholder="Tìm kiếm bài học, từ vựng..."
            className="w-[500px] md:w-[350px] px-3 py-2 rounded-xl border border-skin-200 bg-white/70 focus:outline-none"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white bg-warm-500 p-1.5 rounded-xl">
            <Search size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-white/60"
            >
              <Bell size={20} />
              {friendRequests.length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {friendRequests.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-sm">Yêu cầu kết bạn</h3>
                </div>
                {friendRequests.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Không có yêu cầu kết bạn
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {friendRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 border-b hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-warm-200 rounded-full flex items-center justify-center font-bold text-sm">
                            {req.from_user?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm truncate">
                              {req.from_user || "Người dùng"}
                            </p>
                            {req.message && (
                              <p className="text-xs text-gray-600 truncate">
                                {req.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptFriend(req.id)}
                            className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs py-2 rounded transition font-medium"
                          >
                            <UserCheck size={14} />
                            Chấp nhận
                          </button>
                          <button
                            onClick={() => handleRejectFriend(req.id)}
                            className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs py-2 rounded transition font-medium"
                          >
                            <X size={14} />
                            Từ chối
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            to="/profile"
            className="text-sm text-gray-700 px-3 py-2 rounded-lg hover:bg-white/60"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
