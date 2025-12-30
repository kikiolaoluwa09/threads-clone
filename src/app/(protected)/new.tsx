import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProviders";

export default function NewPostScreen() {
  const [text, setText] = useState("");

  const { user } = useAuth();

  const onSubmit = async () => {
    if (!text || !user) return;

    const { data, error } = await supabase
      .from("posts")
      .insert({ content: text, user_id: user.id })
      .select();

    if (error) {
      console.error(error);
    }
    setText("");
  };

  return (
    <SafeAreaView className="p-4 flex-1 bg-black">
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
        <View className="mt-auto">
          <Pressable
            onPress={onSubmit}
            className="bg-white p-3 px-6  self-end rounded-full"
          >
            <Text className="text-black font bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
