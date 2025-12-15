import React, { useState } from "react";
import { friends } from "../data/friends";
import ChatRoom from "./ChatRoom";
import ChatSidebar from "../components/ChatSidebar";

const mockGroups = [
  {
    id: 1,
    name: "Nhóm Backend Dev",
    icon: "👥",
    lastMessage: "Bữa nào offline nhỉ",
  },
  {
    id: 2,
    name: "Nhóm Frontend Dev",
    icon: "💻",
    lastMessage: "CSS challenge hôm nay",
  },
];

export default function ChatPage() {
  const [selected, setSelected] = useState(null); // { type, data }

  return (
    <div className="min-h-screen bg-skin-50">
      <div className="flex">
        <ChatSidebar
          groups={mockGroups}
          friends={friends}
          onSelect={setSelected}
        />

        <div className="flex-1">
          {!selected ? (
            <div className="p-6 max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Nhắn tin</h2>
              <p className="text-gray-500">
                Chọn nhóm hoặc bạn để bắt đầu trò chuyện.
              </p>
            </div>
          ) : (
            <ChatRoom
              conversation={selected}
              onBack={() => setSelected(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
