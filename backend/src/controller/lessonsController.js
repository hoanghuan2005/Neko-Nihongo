import { supabase } from "../config/db.js";

// API ví dụ: lấy danh sách bài học
export const getLessons = async (req, res) => {
  const { data, error } = await supabase.from("lessons").select("*");
  if (error) return res.status(500).json({ error });
  return res.json(data);
};

export const addLessons = async (req, res) => {
  try {
    const { title, description, level } = req.body;

    // Kiểm tra dữ liệu nhập vào
    if (!title || !description || !level) {
      return res.status(400).json({ error: "Thiếu thông tin bài học" });
    }

    // Gửi dữ liệu vào Supabase
    const { data, error } = await supabase
      .from("lessons")
      .insert([{ title, description, level }])
      .select();

    if (error) throw error;

    return res.status(201).json({ message: "Thêm bài học thành công", data });
  } catch (error) {
    console.error("Lỗi khi thêm bài học:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateLessons = async (req, res) => {
  try {
    const { id, title, description, level } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Thiếu ID bài học cần cập nhật" });
    }

    const { data: existingLesson, error: checkError } = await supabase
      .from("lessons")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError) {
      return res.status(500).json({ error: "Lỗi khi kiểm tra bài học" });
    }

    if (!existingLesson) {
      return res.status(404).json({ error: "Không tìm thấy bài học" });
    }

    const { data, error } = await supabase
      .from("lessons")
      .update([{ title, description, level }])
      .eq("id", id)
      .select();
    if (error) throw error;

    return res.status(200).json({
      message: "Cập nhật bài học thành công",
      data,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật bài học:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteLessons = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Thiếu ID bài học cần xóa" });
    }

    const { data: existingLesson, error: checkError } = await supabase
      .from("lessons")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError) {
      return res.status(500).json({ error: "Lỗi khi kiểm tra bài học" });
    }

    if (!existingLesson) {
      return res.status(404).json({ error: "Không tìm thấy bài học" });
    }

    const { data, error } = await supabase
      .from("lessons")
      .delete()
      .eq("id", id)
      .select();
    if (error) throw error;
    return res.status(200).json({
      message: "Xóa bài học thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa bài học:", error);
    return res.status(500).json({ error: error.message });
  }
};
