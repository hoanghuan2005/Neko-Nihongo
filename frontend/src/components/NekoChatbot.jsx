import React from "react";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NekoChatbot() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-20 right-5 z-50">
      <button
        onClick={() => navigate("/neko-chat")}
        className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg transition-all"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
