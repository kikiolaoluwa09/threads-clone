import { useAuth } from "@/providers/AuthProviders";
import { getProfileById } from "@/services/profiles";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import SupabaseImage from "./SupabaseImage";
import { supabase } from "@/lib/supabase";

export default function ProfileHeader() {
  const { user } = useAuth();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text className="text-red-500">{error.message}</Text>;
  return (
    <View className="p-4 gap-4 border-b-2 border-neutral-800">
      <View className="flex-row items-center justify-between gap-2">
        <View className="gap-2">
          <Text className="text-white text-2xl font-bold">
            {profile?.full_name}
          </Text>
          <Text className="text-neutral-200 text-lg">@{profile.username}</Text>
        </View>
        <SupabaseImage
          bucket="avatars"
          path={profile?.avatar_url}
          className="w-20 h-20 rounded-full"
          transform={{ width: 80, height: 80 }}
        />
      </View>
      <Text className="text-neutral-200 leading-snug">{profile.bio}</Text>
      <Text className="text-gray-300">{profile.website}</Text>
      <View className="flex-row gap-2">
        <Link href="/(profile)/edit" asChild>
          <Pressable className="flex-1 rounded-xl border-2 border-neutral-700 py-2">
            <Text className="text-center text-neutral-200">Edit Profile</Text>
          </Pressable>
        </Link>
        <Pressable
          className="flex-1 rounded-xl border-2 border-neutral-700 py-2"
          onPress={() => supabase.auth.signOut()}
        >
          <Text className="text-center text-neutral-200">Logout</Text>
        </Pressable>
        
      </View>
    </View>
  );
}
{
  /* <Pressable
        onPress={() => supabase.auth.signOut}
        className="bg-gray-800 p-4 rounded-lg w-32"
      >
        <Text className="text-white text-center font-bold text-lg">
          Sign Out
        </Text>
      </Pressable> */
}
