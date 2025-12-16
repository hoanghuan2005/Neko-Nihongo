import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  Pin,
  BellOff,
  UserPlus,
} from "lucide-react";

export default function ChatRoom({ conversation, onBack }) {
  const initial = [
    { id: 1, who: "other", text: "こんにちは！元気ですか？" },
    { id: 2, who: "user", text: "元気です！あなたは？" },
  ];

  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), who: "user", text: input }]);
    setInput("");
    // giả lập phản hồi
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now(), who: "friend", text: "Haha, いいね！" },
      ]);
    }, 700);
  };

  useEffect(() => {
    // có thể dùng socket.io ở đây cho real-time thật
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  const convType = conversation?.type;
  const conv = conversation?.data || {};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      {/* Header / Navbar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft size={20} />
          </button>
          {convType === "friend" ? (
            <>
              <img
                src={conv.avatar}
                alt={conv.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{conv.name}</div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-9 h-9 rounded-full bg-skin-100 flex items-center justify-center">
                {conv.icon}
              </div>
              <div>
                <div className="font-semibold">{conv.name}</div>
                <div className="text-xs text-gray-500">
                  {conv.members?.length || 3} thành viên
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <MoreHorizontal />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow text-sm">
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                <Pin size={16} /> Ghim
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                <BellOff size={16} /> Tắt thông báo
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                <UserPlus size={16} /> Thêm bạn
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.who === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                m.who === "user" ? "bg-warm-500 text-white" : "bg-white border"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center border-t bg-white p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Soạn tin nhắn..."
          className="flex-1 p-2 rounded-xl border border-gray-300 outline-none"
        />
        <button
          onClick={send}
          className="ml-2 px-4 py-2 bg-warm-500 text-white rounded-xl font-semibold"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
