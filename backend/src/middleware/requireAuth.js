import { supabaseAnon } from "../config/db.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } = await supabaseAnon.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = data.user; // CHỈ DÙNG ĐỂ LOGIC
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
