import React from "react";

export default function ManageUsers() {
  return (
    <div className="min-h-screen bg-skin-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Quản lý người dùng</h1>

        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2">#</th>
                <th className="py-2">Tên</th>
                <th className="py-2">Email</th>
                <th className="py-2">Vai trò</th>
                <th className="py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 text-sm">1</td>
                <td className="py-2 text-sm">Nguyen Van A</td>
                <td className="py-2 text-sm">a@example.com</td>
                <td className="py-2 text-sm">user</td>
                <td className="py-2 text-sm">Edit / Suspend</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
