import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PostListItem from "@/components/PostListitem";
import PostReplyInput from "@/components/PostReplyInput";

import { getPostById, getPostReplies } from "@/services/posts";
import PostDetails from "@/components/PostDetails";

export default function postDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
    staleTime: 1000 * 60 * 5,
  });

  const{data: parent} = useQuery({
    queryKey: ['posts', id ,post?.parent_id],
    queryFn: ()=> getPostById(post?.parent_id),
    enabled: !!post?.parent_id,
  })

  const { data: replies } = useQuery({
    queryKey: ["posts", id, "replies"],
    queryFn: () => getPostReplies(id),
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
  // className="items-center justify-center"
  return (
    <View className="flex-1 m-5">
      <FlatList
        data={replies || []}
        renderItem={({ item }) => <PostListItem post={item} isLastInGroup={true} />}
        ListHeaderComponent={
          <>
          {parent && <PostListItem post={parent} isLastInGroup={false}/>}
            <PostDetails post={post} />
            <Text className="text-white  text-lg font-bold p-4 border-b border-neutral-800 ">
              Replies
            </Text>
          </>
        }
        showsVerticalScrollIndicator={false}
      />

      <PostReplyInput postId={id} />
    </View>
  );
}
