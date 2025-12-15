// src/pages/Learn.jsx
import React, { useState } from "react";
import { lessons } from "../data/lessons";
import LessonCard from "../components/LessonCard";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("learn");
  const [selectedLevel, setSelectedLevel] = useState("N5");

  const tabs = [
    { id: "learn", label: "Học" },
    { id: "review", label: "Ôn tập" },
    { id: "challenge", label: "Thử thách" },
  ];

  const skills = [
    { title: "Từ vựng", skill: "vocabulary", icon: "🈶" },
    { title: "Ngữ pháp", skill: "grammar", icon: "📘" },
    { title: "Đọc hiểu", skill: "reading", icon: "📖" },
    { title: "Nghe hiểu", skill: "listening", icon: "🎧" },
  ];

  const levels = ["N5", "N4", "N3", "N2", "N1"];

  const dataByTab = {
    learn: lessons.filter((l) => l.type === "learn"),
    review: lessons.filter((l) => l.type === "review"),
    challenge: lessons.filter((l) => l.type === "challenge"),
  };

  return (
    <div className="min-h-screen bg-skin-50 pb-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-warm-600">
          Neko Learning 🐾
        </h2>

        {/* Tabs */}
        <div className="flex justify-around mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chọn trình độ */}
        <div className="flex justify-between mb-6 flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-full font-medium text-sm transition ${
                selectedLevel === lvl
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center text-warm-600 mb-4">
          Chọn kỹ năng 🐾
        </h2>

        {/* Hiển thị kỹ năng */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((s) => (
            <LessonCard
              key={s.skill}
              title={s.title}
              icon={s.icon}
              level={selectedLevel}
              skill={s.skill}
            />
          ))}
        </div>

        {/* Lessons
        <div className="grid grid-cols-2 gap-4">
          {dataByTab[activeTab]?.length > 0 ? (
            dataByTab[activeTab].map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center mt-4">
              Không có bài học nào 😿
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
}
