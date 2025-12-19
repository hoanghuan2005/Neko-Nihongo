import React, { useState } from "react";
import { Plus, MoreHorizontal, UserCheck, X } from "lucide-react";

export default function ChatSidebar({
  conversations = [],
  friendRequests = [],
  onSelect,
  onAcceptFriend,
  onRejectFriend,
  currentUser,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  // Separate conversations into groups and friends (directs)
  const groups = conversations.filter((c) => c.type === "group");
  const directs = conversations.filter((c) => c.type === "direct");

  return (
    <aside className="w-80 bg-white h-screen border-r flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <h3 className="font-semibold">Trò chuyện</h3>
        <button
          className="flex items-center gap-2 px-3 py-1 bg-warm-500 text-white rounded hover:bg-warm-600 transition"
          onClick={() => alert("Tạo nhóm (chưa kết nối)")}
        >
          <Plus size={14} />
          <span className="text-sm">Tạo nhóm</span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Friend Requests */}
        {friendRequests && friendRequests.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
              Yêu cầu kết bạn
            </div>
            <div className="space-y-2">
              {friendRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-warm-200 rounded-full flex items-center justify-center text-xs font-bold">
                      {req.from_user?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="text-sm font-medium flex-1 truncate">
                      {req.from_user || "Người dùng"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAcceptFriend(req.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 rounded transition"
                    >
                      <UserCheck size={14} />
                      Chấp nhận
                    </button>
                    <button
                      onClick={() => onRejectFriend(req.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1 rounded transition"
                    >
                      <X size={14} />
                      Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Groups */}
        {groups && groups.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
              Nhóm chat
            </div>
            <div className="flex flex-col gap-2">
              {groups.map((g) => (
                <div key={g.id} className="relative">
                  <button
                    onClick={() => onSelect({ type: "group", data: g })}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition"
                  >
                    <div className="w-10 h-10 bg-skin-50 rounded-full flex items-center justify-center flex-shrink-0">
                      {g.name?.charAt(0) || "G"}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-medium text-sm">{g.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {g.last_message_at ? "Có tin mới" : "Chưa có tin nhắn"}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === g.id ? null : g.id);
                      }}
                      className="p-1 rounded hover:bg-gray-100 flex-shrink-0"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </button>

                  {openMenu === g.id && (
                    <div className="absolute right-2 top-12 bg-white border rounded shadow-lg p-2 text-sm z-10">
                      <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 rounded">
                        Ghim
                      </button>
                      <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 rounded">
                        Tắt thông báo
                      </button>
                      <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 rounded">
                        Thêm bạn
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends */}
        {directs && directs.length > 0 && (
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
              Bạn bè
            </div>
            <div className="flex flex-col gap-2">
              {directs.map((f) => (
                <div key={f.id} className="relative">
                  <button
                    onClick={() => onSelect({ type: "direct", data: f })}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-warm-100 rounded-full flex items-center justify-center font-semibold">
                        {f.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-medium text-sm">{f.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {f.last_message_at ? "Online" : "Offline"}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(
                          openMenu === `f-${f.id}` ? null : `f-${f.id}`
                        );
                      }}
                      className="p-1 rounded hover:bg-gray-100 flex-shrink-0"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </button>

                  {openMenu === `f-${f.id}` && (
                    <div className="absolute right-2 top-12 bg-white border rounded shadow-lg p-2 text-sm z-10">
                      <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 rounded">
                        Ghim
                      </button>
                      <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 rounded">
                        Tắt thông báo
                      </button>
                      <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 rounded">
                        Xem hồ sơ
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User section at bottom */}
      {currentUser && (
        <div className="border-t p-3.5 bg-skin-50 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-warm-500 text-white rounded-full flex items-center justify-center font-bold">
                {currentUser.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-medium text-sm truncate">
                {currentUser.email}
              </div>
              <div className="text-xs text-green-600 font-medium">● Online</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
