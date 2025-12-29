import { FlatList, Pressable, Text, View } from "react-native";
import { dummyPosts } from "@/dummyData";
import PostListItem from "@/components/PostListitem";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={dummyPosts}
        renderItem={({ item }) => <PostListItem post={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <Link
              href="/new"
              className="bg-black text-center p-4 border-b border-gray-800/70 text-blue-500"
            >
              <Text className="text-center text-3xl font-bold ">New Post</Text>
            </Link>
          </>
        )}
      />
    </View>
  );
}
