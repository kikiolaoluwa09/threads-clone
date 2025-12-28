import { Image, Pressable, Text, View } from "react-native";
import { Post } from "@/types";
import { Feather } from "@expo/vector-icons";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)


export default function PostListItem({ post }: { post: Post }) {
  // Format the createdAt timestamp to a relative time (e.g., "2h ago")
//   const formatTimestamp = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInMs = now.getTime() - date.getTime();
//     const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInHours < 1) return "now";
//     if (diffInHours < 24) return `${diffInHours}h`;
//     return `${diffInDays}d`;
//   };

  return (
    <View className="flex-row p-4 border-b border-gray-800/70 bg-black">
      {/* User Avatar */}
      <Pressable className="mr-3">
        <Image
          source={{ uri: post.user.image }}
          className="w-12 h-12 rounded-full"
        />
      </Pressable>

      {/* Content */}
      <View className="flex-1">
        {/* User Info */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-white font-black mr-1">{post.user.username}</Text>
            <Text className="text-gray-500 mr-2">@{post.user.name}</Text>
            <Text className="text-gray-500">·</Text>
            <Text className="text-gray-500 ml-2">{dayjs(post.createdAt).fromNow()}</Text>
          </View>
          <Pressable>
            <Feather name="more-horizontal" size={16} color="#d1d5db" />
          </Pressable>
        </View>

        {/* Post Content */}
        <Text className="text-white mt-1 mb-3 leading-5">{post.content}</Text>

        {/* Interaction Buttons */}
        <View className="flex-row justify-between pr-10 mt-2 max-w-xs">
          <Pressable className="flex-row items-center">
            <Feather name="heart" size={20} color="#d1d5db" />
            <Text className="text-gray-300 ml-2">0</Text>
          </Pressable>

          <Pressable className="flex-row items-center">
            <Feather name="message-circle" size={20} color="#d1d5db" />
            <Text className="text-gray-300 ml-2">{post.replies.length}</Text>
          </Pressable>

          <Pressable className="flex-row items-center">
            <Feather name="repeat" size={20} color="#d1d5db" />
            <Text className="text-gray-300 ml-2">0</Text>
          </Pressable>

          <Pressable>
            <Feather name="send" size={20} color="#d1d5db" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}