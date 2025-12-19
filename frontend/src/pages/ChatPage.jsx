import React, { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import ChatSidebar from "../components/ChatSidebar";

export default function ChatPage() {
  const [selected, setSelected] = useState(null); // { type, data }
  const [conversations, setConversations] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Load conversations
      const convRes = await fetch(
        "http://localhost:5001/api/conversation/get",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (convRes.ok) {
        const data = await convRes.json();
        setConversations(data.conversations || []);
      }

      // Load friend requests
      const reqRes = await fetch("http://localhost:5001/api/friend/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (reqRes.ok) {
        const data = await reqRes.json();
        setFriendRequests(data.data || []);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptFriend = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5001/api/friend/requests/${requestId}/accept`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setFriendRequests(friendRequests.filter((r) => r.id !== requestId));
        loadData();
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
        setFriendRequests(friendRequests.filter((r) => r.id !== requestId));
      }
    } catch (err) {
      console.error("Error rejecting friend:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-skin-50">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-skin-50">
      <div className="flex">
        <ChatSidebar
          conversations={conversations}
          friendRequests={friendRequests}
          onSelect={setSelected}
          onAcceptFriend={handleAcceptFriend}
          onRejectFriend={handleRejectFriend}
          currentUser={currentUser}
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
              currentUser={currentUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
