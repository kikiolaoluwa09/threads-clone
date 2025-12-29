import { useState } from "react";
import { Pressable, Text, TextInput, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Handle login logic here
      console.log("Login:", { email, password });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      Alert.alert("Error", "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-1 justify-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-8">
          Welcome Back!
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#71717a"
          className="bg-neutral-700 text-white p-4 rounded-lg mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#71717a"
          className="bg-neutral-700 text-white p-4 rounded-lg mb-6"
          secureTextEntry
        />

        <Pressable
          onPress={handleLogin}
          className="bg-white p-4 rounded-lg mb-4"
          disabled={loading}
        >
          <Text className="text-black text-center font-bold text-lg">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-400">Don't have an account? </Text>
          <Link href="/signup">
            <Text className="text-blue-400 font-semibold">Create one</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
