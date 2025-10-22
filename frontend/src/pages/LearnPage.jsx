// src/pages/Learn.jsx
import React from "react";
import { lessons } from "../data/lessons";
import LessonCard from "../components/LessonCard";
import BottomNav from "../components/BottomNav";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#FFF9FB] pb-28">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Learn</h2>

        <div className="grid grid-cols-2 gap-4">
          {lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
