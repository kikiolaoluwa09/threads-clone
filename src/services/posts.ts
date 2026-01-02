import { supabase } from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

type PostInput = TablesInsert<"posts">;

export const CreatePost = async (newPost: PostInput) => {
  const { data, error } = await supabase
    .from("posts")
    .insert(newPost)
    .throwOnError()
    .select("*");

  return data;
};

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, user:profiles(*), replies:posts(count)")
    .order('created_at', {ascending: false})
    .throwOnError();

  console.log(JSON.stringify(data, null, 2));
  if (error) {
    throw error;
  }
  return data;
};

export const getPostById = async (id: string) => {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*), replies:posts(count),  parent:posts(*)")
    .eq("id", id)
    .single()
    .throwOnError();

    console.log(JSON.stringify(data, null ,2))

  return data;
};

export const getPostReplies = async (id: string) => {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*), replies:posts(count)")
    .eq("parent_id", id)
    .throwOnError();

  return data;
};
