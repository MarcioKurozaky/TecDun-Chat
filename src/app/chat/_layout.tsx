import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="screen" />

      <Stack.Screen
        name="settings"
        options={{ headerShown: true, title: "Settings", headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
