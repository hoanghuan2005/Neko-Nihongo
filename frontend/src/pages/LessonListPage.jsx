import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { lessons } from "../data/lessons";

export default function LessonListPage() {
  const { skill } = useParams();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "N5";

  const filtered = lessons.filter(
    (l) => l.skill === skill && l.level === level
  );

  return (
    <div className="min-h-screen bg-skin-50 pb-24 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-warm-600 mb-4 text-center">
          {skill === "vocabulary" && "Từ vựng"}
          {skill === "grammar" && "Ngữ pháp"}
          {skill === "reading" && "Đọc hiểu"}
          {skill === "listening" && "Nghe hiểu"} – {level}
        </h2>
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Chưa có bài học nào 😿
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((lesson) => (
              <li
                key={lesson.id}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer"
              >
                <h3 className="font-semibold">{lesson.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {lesson.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
