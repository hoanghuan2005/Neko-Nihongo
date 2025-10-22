import React from "react";

const LessonCard = ({ title, level, image, progress }) => {
  return (
    <div className="w-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800">
      <div className="relative w-full h-28">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-1 bg-pink-400"
            style={{ width: `${progress || 0}%` }}
          ></div>
        </div>
      </div>
      <div className="p-3 text-sm">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-500 text-xs">{level}</p>
      </div>
    </div>
  );
};

export default LessonCard;