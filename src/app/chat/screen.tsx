import { useLocalSearchParams } from "expo-router";

import ChatScreen from "@/screens/ChatScreen";

export default function Screen() {
  const { id, name, avatarUrl } = useLocalSearchParams<{
    id: string;
    name: string;
    avatarUrl: string;
  }>();

  return (
    <ChatScreen chatId={id ?? ""} chatName={name ?? ""} chatAvatar={avatarUrl ?? ""} />
  );
}
