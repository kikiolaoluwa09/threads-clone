import { Slot } from "expo-router";
import "../../global.css";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "white",
    card: "#101010",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={myTheme}>
      <Slot />
    </ThemeProvider>
  );
}
