// src/pages/Home.jsx
import React from "react";
// import BottomNav from "../components/BottomNav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-skin-50 text-gray-800 pb-28">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/avatar.jpg"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="text-sm font-semibold">NekoNihongo</div>
                <div className="text-xs text-gray-500">Welcome back!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">XP</div>
              <div className="font-bold text-lg">1200</div>
            </div>
          </header>

          <div className="bg-white rounded-2xl shadow p-3 mb-6">
            <img
              src="/assets/cat1.jpg"
              alt="pet"
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Tama</div>
                <div className="text-xs text-gray-500">Mood: Happy</div>
              </div>
              <div className="text-sm text-warm-600 font-semibold">
                Growth 75%
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-warm-500 rounded-full"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button className="bg-warm-500 text-white py-3 rounded-xl font-semibold shadow">
              Learn
            </button>
            <button className="bg-white border border-gray-200 py-3 rounded-xl font-semibold">
              Pet
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h4 className="font-semibold mb-2">Daily Goal</h4>
            <p className="text-sm text-gray-500">
              Finish one vocabulary lesson
            </p>
          </div>
        </div>

        <aside className="hidden md:block">
          <div className="bg-white rounded-2xl p-4 shadow sticky top-6">
            <h4 className="font-semibold mb-2">Quick Actions</h4>
            <div className="flex flex-col gap-2">
              <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                Flashcards
              </button>
              <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                Chat with Neko
              </button>
              <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                History
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
