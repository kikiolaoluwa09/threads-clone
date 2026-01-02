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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProviders";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {useHeaderHeight} from '@react-navigation/elements'

import { CreatePost } from "@/services/posts";

export default function NewPostScreen() {
  const [image, setImage] = useState<string | null>(null);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
          placeholder="What's new?"
          className="text-white text-lg "
          placeholderTextColor="#71717a"
          multiline
          numberOfLines={4}
        />

        {image && (
          <Image 
            source={{uri: image}}
            className="w-3/5 aspect-square h-40 rounded-lg my-4"
          />
        )}

        {error && (
          <Text className="text-red-500 text-sm mt-4">{error.message}</Text>
        )}

        <View className="flex-row items-center gap-2 mt-2">
          <Entypo onPress={pickImage} name="images" size={24} color="gray" />
        </View>

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
