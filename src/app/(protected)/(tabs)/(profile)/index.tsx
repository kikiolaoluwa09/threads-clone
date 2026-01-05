import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "@/services/posts";
import PostListItem from "@/components/PostListitem";

import { getProfileById } from "@/services/profiles";
import ProfileHeader from "@/components/ProfileHeader";

export default function Profile() {
  const { user } = useAuth();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", { user_id: user?.id }],
    queryFn: () => getPostsByUserId(user!.id),
  });

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className="flex-1 justify-center">
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostListItem post={item} isLastInGroup={true} />
        )}
        ListHeaderComponent={
          <>
            <ProfileHeader />
            <Text className="text-white text-lg font-bold mt-4 m-2">
              Threads
            </Text>
          </>
        }
        ListEmptyComponent={<Text className="text-white">No posts yet</Text>}
        showsVerticalScrollIndicator={false}
      />
   
    </View>
  );
}
