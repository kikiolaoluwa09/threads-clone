import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PostListItem from "@/components/PostListitem";
import PostReplyInput from "@/components/PostReplyInput";

import { getPostById, getPostReplies } from "@/services/posts";

export default function postDetails() {

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
    staleTime: 1000 * 60 * 5,
  });

  const {data: replies} = useQuery({
    queryKey: ['posts', id , 'replies'],
    queryFn: () => getPostReplies(id),
  })

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
  // className="items-center justify-center"
  return (
    <View className="flex-1 m-5">
      <FlatList
        data={replies || []}
        renderItem={({item}) => <PostListItem post={item}/>}
        ListHeaderComponent={<PostListItem post={post}/>}
        showsVerticalScrollIndicator={false}
        />

      <PostReplyInput postId={id} />
    </View>
  );
}
