import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Admin guard: requires user.isAdmin === true in localStorage JSON `user`.
export default function AdminRoute() {
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch (e) {
    user = null;
  }

  if (!user || !user.isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
