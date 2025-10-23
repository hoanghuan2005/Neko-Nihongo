import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NekoChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { from: "neko", text: "Nyaa~ Chào mừng bạn đến với thế giới của Neko!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "neko", text: `Meow~ "${input}" nghe thú vị đó!` },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center gap-3 bg-pink-400 text-white px-4 py-3 shadow-md">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-semibold text-lg">🐾 Neko Chat</h1>
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto dark:bg-gray-900 px-4 py-3 space-y-3 mt-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl max-w-[75%] ${
                msg.from === "user"
                  ? "bg-pink-200 text-gray-800"
                  : "bg-white border border-pink-200 dark:bg-gray-900 dark:text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center border-t border-gray-700 bg-white dark:bg-gray-900 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 p-2 rounded-xl border border-gray-300 dark:border-gray-600 outline-none text-sm bg-transparent"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-pink-400 text-white rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
