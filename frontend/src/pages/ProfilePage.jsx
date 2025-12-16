import React from "react";
import { Settings, Star, Flame, LogOut } from "lucide-react";

const ProfilePage = () => {
  const user = {
    name: "NekoNihongo",
    avatar: "/images/avatar-cat.png",
    xp: 1200,
    level: 15,
    streak: 3,
    mood: "Happy",
    growth: 75,
  };

  const handleLogout = () => {
    alert("Logged out! (Bạn có thể gắn API logout ở đây)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h1 className="text-lg font-bold">Profile</h1>
        <button className="p-2 rounded-full bg-white shadow">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Avatar & Name */}
      <section className="flex flex-col items-center mt-6">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-pink-200 shadow-md object-cover"
        />
        <h2 className="text-xl font-semibold mt-3">{user.name}</h2>
        <p className="text-sm text-gray-500">Mood: {user.mood}</p>
      </section>

      {/* Stats */}
      <section className="mt-6 flex justify-center gap-6 text-center">
        <div>
          <p className="text-2xl font-bold text-pink-500">{user.xp}</p>
          <p className="text-xs text-gray-500">XP</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-pink-500">{user.level}</p>
          <p className="text-xs text-gray-500">Level</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-pink-500">{user.streak}</p>
          <p className="text-xs text-gray-500">Streak</p>
        </div>
      </section>

      {/* Growth bar */}
      <section className="px-10 mt-6">
        <p className="text-sm font-medium">Growth</p>
        <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 transition-all"
            style={{ width: `${user.growth}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          {user.growth}% completed
        </p>
      </section>

      {/* Achievements */}
      <section className="px-6 mt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Achievements
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center bg-white rounded-2xl py-3 shadow-sm">
            <Star className="text-yellow-400 w-6 h-6" />
            <p className="text-xs mt-1 text-gray-600">Top Learner</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-2xl py-3 shadow-sm">
            <Flame className="text-orange-500 w-6 h-6" />
            <p className="text-xs mt-1 text-gray-600">3-Day Streak</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-2xl py-3 shadow-sm">
            <Star className="text-pink-400 w-6 h-6" />
            <p className="text-xs mt-1 text-gray-600">Level 15</p>
          </div>
        </div>
      </section>

      {/* Logout */}
      <div className="px-8 py-6 mt-40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-2xl shadow-lg hover:opacity-90 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
