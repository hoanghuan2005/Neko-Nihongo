// src/pages/PetZone.jsx
import React from "react";
import BottomNav from "../components/BottomNav";

export default function PetZonePage() {
  return (
    <div className="min-h-screen bg-[#FFF9FB] pb-28">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Pet Zone</h2>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <img src="/assets/cat2.jpg" alt="mochi" className="w-32 h-32 rounded-full mx-auto object-cover" />
          <h3 className="text-lg font-bold mt-3">Mochi</h3>
          <p className="text-sm text-gray-500">Level 3</p>

          <div className="mt-4">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-pink-400" style={{ width: "75%" }} />
            </div>
            <div className="flex gap-4 mt-3">
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Hunger</div>
                <div className="text-lg font-semibold">80%</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Happiness</div>
                <div className="text-lg font-semibold">90%</div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="py-3 bg-pink-500 text-white rounded-xl">Feed</button>
            <button className="py-3 bg-white border rounded-xl">Play</button>
            <button className="py-3 bg-white border rounded-xl">Clean</button>
            <button className="py-3 bg-white border rounded-xl">Talk</button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
