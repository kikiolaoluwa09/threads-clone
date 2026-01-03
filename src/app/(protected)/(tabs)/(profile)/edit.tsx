import { useAuth } from "@/providers/AuthProviders";
import { getProfileById, updateProfile } from "@/services/profiles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ProfileEditScreen() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfileById(user!.id),
  });
  useEffect(() => {
    setFullName(profile?.full_name);
    setBio(profile?.bio);
  }, [profile?.id]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateProfile(user!.id, { full_name: fullName, bio }),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['profile', user?.id]})
      router.back();
    },
  });

  return (
    <View className="flex-1 p-4 gap-4">
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        className="text-white  border-2 border-neutral-700 rounded-md p-4 "
      />
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        className="text-white  border-2 border-neutral-700 rounded-md p-4"
        multiline
        numberOfLines={5}
      />
      <View className="mt-auto">
        <Pressable
          onPress={() => mutate()}
          className={`${isPending ? `bg-white/50` : `bg-white`}  p-4 items-center rounded-full`}
          disabled={isPending}
        >
          <Text className="text-black font bold">Save</Text>
        </Pressable>
      </View>
    </View>
  );
}
