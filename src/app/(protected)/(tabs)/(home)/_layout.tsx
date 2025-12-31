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
          headerTitleStyle: {
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
          },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="posts/[id]"
        options={{
          title: "Thread",
          headerBackButtonDisplayMode: "generic",
        //   headerStyle: {
        //     backgroundColor: "rgba(0, 0, 0, 0.8)",
        //   },
        //   headerTitleStyle: {
        //     fontSize: 36,
        //     fontWeight: "bold",
        //     color: "white",
        //   },
        //   headerTransparent: true,
        }}
      />
    </Stack>
  );
}
