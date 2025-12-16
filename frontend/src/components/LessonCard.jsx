import React from "react";
import { useNavigate } from "react-router-dom";

const LessonCard = ({ title, icon, level, skill }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Chuyển sang trang danh sách bài học theo kỹ năng + trình độ
    navigate(`/learn/${skill}?level=${level}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:shadow-lg active:scale-95 transition-transform"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        Trình độ: {level.toUpperCase()}
      </p>
    </div>
  );
};

export default LessonCard;
