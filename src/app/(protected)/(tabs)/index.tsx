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
          <Link href="/new">
            <Pressable className="bg-black p-4 border-b border-gray-800/70 ">
              <Text style={{color: "#3b82f6"}} className="text-center text-3xl font-bold ">
                New Post
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}