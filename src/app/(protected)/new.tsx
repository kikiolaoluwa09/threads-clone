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
import * as ImagePicker from "expo-image-picker";
import Entypo from "@expo/vector-icons/Entypo";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProviders";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

import { CreatePost } from "@/services/posts";

import SupabaseImage from "@/components/SupabaseImage";

export default function NewPostScreen() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const [text, setText] = useState("");

  const { user, profile } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      let imagePath = null;
      if (image) {
        imagePath = await uploadImage();
      }

      return CreatePost({
        content: text,
        user_id: user!.id,
        images: imagePath ? [imagePath] : null,
      });
    },
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
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const uploadImage = async () => {
    if (!image) return;
    const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

    const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, arraybuffer, {
        contentType: image.mimeType ?? "image/jpeg",
      });
    if (uploadError) {
      throw uploadError;
    }

    return data.path;
  };

  return (
    <SafeAreaView className=" p-4 flex-1  bg-black-950">
      <ScrollView>
        <KeyboardAvoidingView
          className=""
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
        >
          <View className="flex-row gap-4 ">
            <SupabaseImage
              bucket="avatars"
              path={profile?.avatar_url}
              className="w-12 h-12 rounded-full"
              transform={{ width: 50, height: 50 }}
            />
            <View>
              <Text className="text-white font-extrabold text-xl">
                @{profile?.username}
              </Text>

              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="What's new?"
                className="text-white text-lg "
                placeholderTextColor="#71717a"
                multiline
                numberOfLines={6}
              />

              {image && (
                <Image
                  source={{ uri: image.uri }}
                  className="w-3/5 h-40 rounded-lg my-4"
                  style={{ aspectRatio: image.width / image.height }}
                />
              )}

              {error && (
                <Text className="text-red-500 text-sm mt-4">
                  {error.message}
                </Text>
              )}

              <View className="flex-row items-center gap-2 mt-2">
                <Entypo
                  onPress={pickImage}
                  name="images"
                  size={24}
                  color="gray"
                />
              </View>
            </View>
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
