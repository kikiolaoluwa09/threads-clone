import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import PostListItem from "@/components/PostListitem";
import { Link } from "expo-router";
import { Post } from "@/types";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

import { fetchPosts } from "@/services/posts";
export default function HomeScreen() {
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-black">
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <PostListItem post={item} isLastInGroup={true} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}
