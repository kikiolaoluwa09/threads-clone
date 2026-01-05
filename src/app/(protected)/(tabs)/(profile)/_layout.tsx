import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      />
      <Stack.Screen name="edit" options={{ title: "Edit Profile" }} />
    </Stack>
  );
}
