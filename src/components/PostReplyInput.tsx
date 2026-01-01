import { TextInput, View } from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useState } from "react";

import { useAuth } from "@/providers/AuthProviders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

import { CreatePost } from "@/services/posts";

export default function PostReplyInput({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      CreatePost({ content: text, user_id: user!.id, parent_id: postId }),

    onSuccess: (data) => {
      setText("");
      router.back();
      queryClient.invalidateQueries({ queryKey: ["posts", postId, 'replies'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <View className="p-2">
      <View className=" flex-row gap-2 bg-neutral-700 shadow-md p-4 rounded-md tex-xl">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add to thread"
          className=" flex-1 text-white"
          multiline
        />
        <AntDesign
          onPress={() => mutate()}
          disabled={isPending || text.length === 0}
          name="plus-circle"
          size={24}
          color={text.length === 0 ? "gray" : "gainsboro"}
        />
      </View>
    </View>
  );
}
