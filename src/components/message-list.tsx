import { useCallback, useRef } from "react";
import { SectionList, StyleSheet } from "react-native";

import { type MessageItem, messages } from "@/data/mockData";

import { DateChip } from "@/components/date-chip";
import { MessageBubble } from "@/components/message-bubble";

function buildSections() {
  const map = new Map<string, MessageItem[]>();

  for (const msg of messages) {
    if (!map.has(msg.dateLabel)) {
      map.set(msg.dateLabel, []);
    }
    map.get(msg.dateLabel)!.push(msg);
  }

  return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
}

const sections = buildSections() as {
  title: string;
  data: MessageItem[];
}[];

export function MessageList() {
  const listRef = useRef<SectionList<MessageItem>>(null);

  const handleContentSizeChange = useCallback(() => {
    requestAnimationFrame(() => {
      (listRef.current as any)?.scrollToEnd?.({ animated: false });
    });
  }, []);

  return (
    <SectionList<MessageItem>
      ref={listRef}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MessageBubble item={item} />}
      renderSectionHeader={({ section }) => <DateChip label={section.title} />}
      onContentSizeChange={handleContentSizeChange}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
