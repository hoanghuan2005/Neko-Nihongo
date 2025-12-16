import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Basic user route guard. Expects `localStorage.user` to exist when logged in.
export default function UserRoute() {
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch (e) {
    user = null;
  }

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
