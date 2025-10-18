import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

let supabase = null;

try {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Thiếu SUPABASE_URL hoặc SUPABASE_KEY trong .env");
  }

  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("Supabase connected successfully!");
} catch (error) {
  console.error("Supabase connection failed:", error.message);
}

export { supabase };
