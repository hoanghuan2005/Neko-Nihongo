// src/pages/Chat.jsx
import React, { useState } from "react";
import BottomNav from "../components/BottomNav";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, who: "neko", text: "こんにちは！今日は何を学びますか？" },
    { id: 2, who: "user", text: "I want to learn some basic Japanese phrases." },
    { id: 3, who: "neko", text: "「ありがとう」は 'Arigatou' と言います。" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), who: "user", text: input }]);
    setInput("");
    // TODO: call backend AI / neko assistant
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] pb-28">
      <div className="max-w-md mx-auto p-4 flex flex-col h-screen">
        <h2 className="text-xl font-semibold mb-4">Neko Sensei</h2>

        <div className="flex-1 overflow-auto space-y-3 mb-4">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[80%] ${m.who === "neko" ? "ml-0" : "ml-auto"} `}>
              <div className={`${m.who === "neko" ? "bg-gray-100 text-gray-800" : "bg-pink-400 text-white"} py-3 px-4 rounded-2xl`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or say something..."
            className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-300 outline-none"
          />
          <button onClick={send} className="bg-pink-500 text-white px-4 py-2 rounded-xl">Send</button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
