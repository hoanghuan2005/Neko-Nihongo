import React, { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";

export default function ChatSidebar({ groups = [], friends = [], onSelect }) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside className="w-80 bg-white h-screen border-r">
      <div className="p-4 flex items-center justify-between border-b">
        <h3 className="font-semibold">Trò chuyện</h3>
        <button
          className="flex items-center gap-2 px-3 py-1 bg-warm-500 text-white rounded"
          onClick={() => alert("Tạo nhóm (chưa kết nối)")}
        >
          <Plus size={14} />
          <span className="text-sm">Tạo nhóm</span>
        </button>
      </div>

      <div className="p-3">
        <div className="text-xs text-gray-500 uppercase mb-2">Nhóm chat</div>
        <div className="flex flex-col gap-2 mb-4">
          {groups.map((g) => (
            <div key={g.id} className="relative">
              <button
                onClick={() => onSelect({ type: "group", data: g })}
                className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50"
              >
                <div className="w-10 h-10 bg-skin-50 rounded flex items-center justify-center">
                  {g.icon}
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{g.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {g.lastMessage}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === g.id ? null : g.id);
                  }}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <MoreHorizontal size={16} />
                </button>
              </button>

              {openMenu === g.id && (
                <div className="absolute right-2 top-12 bg-white border rounded shadow p-2 text-sm">
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-50">
                    Ghim
                  </button>
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-50">
                    Tắt thông báo
                  </button>
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-50">
                    Thêm bạn
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 uppercase mb-2">Bạn bè</div>
        <div className="flex flex-col gap-2">
          {friends.map((f) => (
            <div key={f.id} className="relative">
              <button
                onClick={() => onSelect({ type: "friend", data: f })}
                className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50"
              >
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{f.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {f.lastMessage}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === `f-${f.id}` ? null : `f-${f.id}`);
                  }}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <MoreHorizontal size={16} />
                </button>
              </button>

              {openMenu === `f-${f.id}` && (
                <div className="absolute right-2 top-12 bg-white border rounded shadow p-2 text-sm">
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-50">
                    Ghim
                  </button>
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-50">
                    Tắt thông báo
                  </button>
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-50">
                    Xem hồ sơ
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
