import React, { useState } from "react";

export default function CreateLesson() {
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("vocabulary");

  const handleCreate = (e) => {
    e.preventDefault();
    alert(`Tạo bài: ${title} (${skill}) — chức năng chưa kết nối`);
  };

  return (
    <div className="min-h-screen bg-skin-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Tạo bài học mới</h1>

        <form
          onSubmit={handleCreate}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          <label className="block">
            <span className="text-sm text-gray-600">Tiêu đề</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Kỹ năng</span>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded"
            >
              <option value="vocabulary">Từ vựng</option>
              <option value="grammar">Ngữ pháp</option>
              <option value="reading">Đọc</option>
              <option value="listening">Nghe</option>
            </select>
          </label>

          <button className="px-4 py-2 bg-warm-500 text-white rounded">
            Tạo
          </button>
        </form>
      </div>
    </div>
  );
}
