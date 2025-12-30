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
import { useHeaderHeight } from "node_modules/@react-navigation/elements";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();

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
    <ScrollView 
      style={{ paddingTop: headerHeight }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 bg-black">
        <FlatList
          data={data}
          renderItem={({ item }) => <PostListItem post={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}
