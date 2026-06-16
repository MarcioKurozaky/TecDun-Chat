import { FlatList, StyleSheet } from "react-native";

import { type ChatItem, chats } from "@/data/mockData";

import { ArchivedRow } from "@/components/ArchivedRow";
import { ChatListItem } from "@/components/ChatListItem";

type ChatListProps = {
  readonly onChatPress?: (item: ChatItem) => void;
  readonly onArchivedPress?: () => void;
};

export function ChatList({ onChatPress, onArchivedPress }: ChatListProps) {
  const data = chats.filter((c) => !c.isArchived);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatListItem
          item={item}
          onPress={() => onChatPress?.(item)}
        />
      )}
      ListHeaderComponent={
        <ArchivedRow count={0} onPress={onArchivedPress} />
      }
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 100,
  },
});
