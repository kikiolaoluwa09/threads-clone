import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import PostListItem from "@/components/PostListitem";
import { Link } from "expo-router";
import { Post } from "@/types";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*)")
      .throwOnError();

    if (error) {
      throw error;
    }
    return data;
  };

  const {
    data: data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={data}
        renderItem={({ item }) => <PostListItem post={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <Link
              href="/new"
              className="bg-black text-center p-4 border-b border-gray-800/70 text-blue-500"
            >
              <Text className="text-center text-3xl font-bold ">New Post</Text>
            </Link>
          </>
        )}
      />
    </View>
  );
}
