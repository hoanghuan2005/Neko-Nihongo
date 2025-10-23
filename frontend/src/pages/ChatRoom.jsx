import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function ChatRoom({ friend, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, who: "friend", text: "こんにちは！元気ですか？" },
    { id: 2, who: "user", text: "元気です！あなたは？" },
  ]);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="flex items-center gap-3 bg-pink-500 text-white px-4 py-3 shadow-md">
        <button onClick={onBack}>
          <ArrowLeft size={22} />
        </button>
        <img
          src={friend.avatar}
          alt={friend.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <h1 className="font-semibold text-lg">{friend.name}</h1>
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
                m.who === "user"
                  ? "bg-pink-400 text-white"
                  : "bg-gray-100 text-gray-800"
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
          placeholder="Nhập tin nhắn..."
          className="flex-1 p-2 rounded-xl border border-gray-300 outline-none"
        />
        <button
          onClick={send}
          className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-xl font-semibold"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
