import { supabase } from "../config/db.js";

// Đăng ký tài khoản
export const signup = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ user: data.user });
};

// Đăng nhập
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  const { user, session } = data;

  res.status(200).json({
    message: "Đăng nhập thành công",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      last_sign_in_at: user.last_sign_in_at,
    },
    token: session?.access_token,
  });
};

// Đăng xuất
export const logout = async (req, res) => {
  const { error } = await supabase.auth.signOut();
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: "Logged out successfully" });
};

// Lấy thông tin user hiện tại
export const getUser = async (req, res) => {
  const { data, error } = await supabase.auth.getUser();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ user: data.user });
};
