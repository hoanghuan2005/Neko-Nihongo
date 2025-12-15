import React from "react";

export default function ManageLessons() {
  return (
    <div className="min-h-screen bg-skin-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Quản lý bài học</h1>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">Danh sách bài học</div>
            <a
              href="/admin/create"
              className="px-3 py-2 bg-warm-500 text-white rounded"
            >
              Tạo mới
            </a>
          </div>

          <ul className="space-y-3">
            <li className="p-3 border rounded">Lesson 1 - Từ vựng cơ bản</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
