import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      />
      <Stack.Screen
        name="posts/[id]"
        options={{
          title: "Thread",
          headerBackButtonDisplayMode: "generic",
        }}
      />
    </Stack>
  );
}
