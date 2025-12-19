import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  Send,
  Loader,
  AlertCircle,
} from "lucide-react";

export default function ChatRoom({ conversation, onBack, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const conversationType = conversation?.type;
  const conv = conversation?.data || {};

  useEffect(() => {
    loadMessages();
  }, [conversation?.data?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !conv.id) return;

      const res = await fetch(
        `http://localhost:5001/api/conversations/${conv.id}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMessages(data || []);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Không thể tải tin nhắn");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    setSending(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        conversationType === "direct"
          ? "http://localhost:5001/api/message/direct"
          : "http://localhost:5001/api/message/group";

      const payload =
        conversationType === "direct"
          ? {
              recipientId: conv.user_id,
              conversationId: conv.id,
              content: input,
            }
          : {
              conversationId: conv.id,
              content: input,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((m) => [...m, data.message]);
        setInput("");
      } else {
        setError("Gửi tin nhắn thất bại");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Lỗi gửi tin nhắn");
    } finally {
      setSending(false);
    }
  };

  const getDisplayName = (senderId) => {
    if (senderId === currentUser?.id) return "Bạn";
    return conv.name || "Người dùng";
  };

  const isOwnMessage = (senderId) => senderId === currentUser?.id;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header / Navbar */}
      <div className="flex items-center justify-between bg-white px-4 py-2.5 border-b shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-warm-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {conversationType === "group"
              ? conv.name?.charAt(0).toUpperCase()
              : conv.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-sm">{conv.name}</div>
            <div className="text-xs text-gray-500">
              {conversationType === "group"
                ? `${conv.member_count || 3} thành viên`
                : "Online"}
            </div>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-skin-50 to-white">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {messages.length === 0 && !error && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Bắt đầu cuộc trò chuyện</p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const own = isOwnMessage(msg.sender_id);
          const prevOwn =
            idx > 0 ? isOwnMessage(messages[idx - 1].sender_id) : null;
          const showAvatar = prevOwn !== own;

          return (
            <div
              key={msg.id}
              className={`flex ${own ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end gap-2 max-w-xs`}>
                {!own && showAvatar && (
                  <div className="w-8 h-8 bg-warm-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {getDisplayName(msg.sender_id).charAt(0)}
                  </div>
                )}
                {!own && !showAvatar && (
                  <div className="w-8 flex-shrink-0"></div>
                )}

                <div
                  className={`flex flex-col ${
                    own ? "items-end" : "items-start"
                  }`}
                >
                  {conversationType === "group" && !own && (
                    <span className="text-xs text-gray-500 px-3 py-1">
                      {getDisplayName(msg.sender_id)}
                    </span>
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      own
                        ? "bg-warm-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm break-words">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-1">
                    {new Date(msg.created_at).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {own && showAvatar && (
                  <div className="w-8 h-8 bg-warm-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {currentUser?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                {own && !showAvatar && (
                  <div className="w-8 flex-shrink-0"></div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field - Fixed at bottom */}
      <div className="bg-white border-t p-3 shadow-lg">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="p-3 bg-warm-500 text-white rounded-full hover:bg-warm-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {sending ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
