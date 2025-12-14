import React, { useState } from "react";
import { friends } from "../data/friends";
// import BottomNav from "../components/BottomNav";
import ChatRoom from "./ChatRoom";

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  if (selectedFriend) {
    // Khi chọn bạn → hiện khung chat riêng
    return (
      <ChatRoom
        friend={selectedFriend}
        onBack={() => setSelectedFriend(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9FB] pb-28">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>

        <div className="space-y-3">
          {friends.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFriend(f)}
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-white shadow hover:bg-pink-50 transition"
            >
              <img
                src={f.avatar}
                alt={f.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left flex-1">
                <p className="font-semibold">{f.name}</p>
                <p className="text-gray-500 text-sm truncate">
                  {f.lastMessage}
                </p>
              </div>
              {f.unread > 0 && (
                <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                  {f.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* <BottomNav /> */}
    </div>
  );
}
