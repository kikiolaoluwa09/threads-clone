import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProviders";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {useHeaderHeight} from '@react-navigation/elements'

import { CreatePost } from "@/services/posts";

export default function NewPostScreen() {

  const headerHeight = useHeaderHeight()

  const [text, setText] = useState("");

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => CreatePost({ content: text,user_id: user!.id}),

    onSuccess: (data) => {
      setText("");
      router.back();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <SafeAreaView className=" pt-28 p-4 flex-1 bg-neutral-950">
      <ScrollView style={{paddingTop: headerHeight}} >
      <KeyboardAvoidingView
        className=""
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      >
        <Text className="text-white font-extrabold text-xl">username</Text>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What is on your mind?"
          className="text-white text-lg "
          placeholderTextColor="#71717a"
          multiline
          numberOfLines={4}
        />
        {error && (
          <Text className="text-red-500 text-sm mt-4">{error.message}</Text>
        )}
        <View className="mt-auto">
          <Pressable
            onPress={() => mutate()}
            className={`${isPending ? `bg-white/50` : `bg-white`}  p-3 px-6  self-end rounded-full`}
            disabled={isPending}
          >
            <Text className="text-black font bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
