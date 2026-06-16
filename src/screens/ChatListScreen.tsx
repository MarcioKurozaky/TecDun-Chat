import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { type ChatItem } from "@/data/mockData";
import theme from "@/utils/theme";

import { ChatList } from "@/components/ChatList";
import { FAB } from "@/components/FAB";

export default function ChatListScreen() {
  const router = useRouter();

  const handleChatPress = useCallback(
    (item: ChatItem) => {
      router.push({
        pathname: "/chat/screen",
        params: { id: item.id, name: item.name, avatarUrl: item.avatarUrl ?? "" },
      });
    },
    [router],
  );

  const handleArchivedPress = useCallback(() => {
    console.log("Archived pressed");
  }, []);

  const handleFabPress = useCallback(() => {
    console.log("FAB pressed");
  }, []);

  return (  
    <View style={styles.container}>
      <ChatList
        onChatPress={handleChatPress}
        onArchivedPress={handleArchivedPress}
      />

      <FAB onPress={handleFabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
});
