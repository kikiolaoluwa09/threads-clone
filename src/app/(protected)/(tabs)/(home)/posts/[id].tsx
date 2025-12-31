import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useHeaderHeight } from "node_modules/@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PostListItem from "@/components/PostListitem";

export default function postDetails() {
  //   const headerHeight = useHeaderHeight(); style={{paddingTop: headerHeight}}
  const { id } = useLocalSearchParams<{ id: string }>();

  const getPostById = async (id: string) => {
    const { data } = await supabase
      .from("posts")
      .select("*, user:profiles(*)")
      .eq("id", id)
      .single()
      .throwOnError();

    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
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
        <Text className="text-red-800">{error.message}</Text>
      </View>
    );
  }

  return (
    <div className="items-center justify-center">
        <PostListItem post={data}/>
    </div>
  );
}
