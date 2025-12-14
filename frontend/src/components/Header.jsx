import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon, Search, User } from "lucide-react";

export default function Header({ onToggle }) {
  return (
    <header className="w-full bg-transparent border-b border-skin-200">
      <div className="W-full mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-lg hover:bg-white/60"
            onClick={onToggle}
          >
            <MenuIcon size={20} />
          </button>

          <Link to="/" className="flex items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-warm-500 flex items-center justify-center text-white font-bold">
              ねこ
            </div>
            <div className="text-lg font-semibold">Neko Nihongo</div>
          </Link>
        </div>
        <div className="relative">
          <input
            placeholder="Tìm kiếm bài học, từ vựng..."
            className="w-[500px] md:w-[350px] px-3 py-2 rounded-xl border border-skin-200 bg-white/70 focus:outline-none"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white bg-warm-500 p-1.5 rounded-xl">
            <Search size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="text-sm text-gray-700 px-3 py-2 rounded-lg hover:bg-white/60"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
