import { useState } from "react";
import { Pressable, Text, TextInput, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Handle login logic here

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({ email, password });

      if (error) Alert.alert(error.message);
      if (!session)
        Alert.alert("Please check your inbox for email verification!");

      console.log("Login:", { email, password });
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      Alert.alert("Error", "signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-1 justify-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-8">
          Create an Account!
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
          onPress={handleSignUp}
          className="bg-white p-4 rounded-lg mb-4"
          disabled={loading}
        >
          <Text className="text-black text-center font-semibold text-lg">
            {loading ? "Signing up..." : "Sign up"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-400">Don't have an account? </Text>
          <Link href="/login">
            <Text className="text-blue-400 font-bold">Sign in</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
