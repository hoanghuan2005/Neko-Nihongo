import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-skin-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link
            to="/admin/users"
            className="p-4 bg-white rounded-lg shadow hover:shadow-md"
          >
            <div className="font-semibold">Quản lý người dùng</div>
            <div className="text-sm text-gray-500">
              Xem, sửa quyền, khóa tài khoản
            </div>
          </Link>

          <Link
            to="/admin/lessons"
            className="p-4 bg-white rounded-lg shadow hover:shadow-md"
          >
            <div className="font-semibold">Quản lý bài học</div>
            <div className="text-sm text-gray-500">
              Tạo, chỉnh sửa và xóa bài học
            </div>
          </Link>

          <Link
            to="/admin/create"
            className="p-4 bg-white rounded-lg shadow hover:shadow-md"
          >
            <div className="font-semibold">Tạo bài học mới</div>
            <div className="text-sm text-gray-500">
              Giao diện tạo bài học nhanh
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2">Thống kê nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-skin-50 rounded">Users: 120</div>
            <div className="p-3 bg-skin-50 rounded">Lessons: 48</div>
            <div className="p-3 bg-skin-50 rounded">Active Today: 60</div>
            <div className="p-3 bg-skin-50 rounded">Reports: 2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
