import { Pressable, Text, View } from "react-native";
import { useAuth } from "@/providers/AuthProviders";

export default function Profile() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center">
      <Pressable
        onPress={signOut}
        className="bg-gray-800 p-4 rounded-lg w-32" 
      >
        <Text className="text-white text-center font-bold text-lg">Sign Out</Text>
      </Pressable>
    </View>
  );
}
