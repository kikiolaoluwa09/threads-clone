import { FlatList, Pressable, Text, View } from "react-native";

import PostListItem from "@/components/PostListitem";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*, user:profiles(*)");
      if (error) {
        console.error(error);
      }
      setPosts(data as Post[]);
    };
    fetchPosts();
  }, []);

  console.log(JSON.stringify(posts, null, 2));
  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={posts}
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
