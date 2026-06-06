import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen name="screen" options={{ title: "Chat" }} />

      <Stack.Screen
        name="settings"
        options={{ title: "Settings", headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
