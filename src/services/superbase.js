// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ewdskwczqxizhdgytzay.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZHNrd2N6cXhpemhkZ3l0emF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MjkxMjcsImV4cCI6MjAxNjAwNTEyN30.mhQ9WvOkvT_yJcRa1qevRJjHP41Sd02xvMT43WAzFIE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
