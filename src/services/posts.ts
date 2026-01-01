import { supabase } from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

type PostInput = TablesInsert<'posts'>

export const CreatePost = async (newPost: PostInput) => {
  const { data, error } = await supabase
    .from("posts")
    .insert(newPost)
    .throwOnError()
    .select("*");

  return data;
};