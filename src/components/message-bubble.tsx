import { StyleSheet, Text, View } from "react-native";

import { type MessageItem } from "@/data/mockData";
import theme from "@/utils/theme";

import { StatusIcon } from "@/components/StatusIcon";

type MessageBubbleProps = {
  readonly item: MessageItem;
};

export function MessageBubble({ item }: MessageBubbleProps) {
  const isIncoming = item.type === "incoming";

  return (
    <View
      style={[styles.row, isIncoming ? styles.rowIn : styles.rowOut]}
      accessibilityRole="text"
      accessibilityLabel={
        isIncoming ? `Message from contact: ${item.text}` : `Your message: ${item.text}`
      }
    >
      <View style={[styles.tail, isIncoming ? styles.tailIn : styles.tailOut]} />

      <View style={[styles.bubble, isIncoming ? styles.bubbleIn : styles.bubbleOut]}>
        <Text style={styles.text}>{item.text}</Text>

        <View style={styles.footer}>
          <Text style={[styles.timestamp, isIncoming ? styles.tsIn : styles.tsOut]}>
            {item.timestamp}
          </Text>

          {!isIncoming && (
            <StatusIcon delivered read={item.isRead ?? false} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: "relative",
    flexDirection: "row",
    maxWidth: "85%",
    marginBottom: 4,
  },

  rowIn: {
    alignSelf: "flex-start",
  },

  rowOut: {
    alignSelf: "flex-end",
  },

  tail: {
    position: "absolute",
    width: 10,
    height: 10,
    zIndex: 0,
  },

  tailIn: {
    left: -5,
    top: 8,
    backgroundColor: theme.colors.gray[50],
    transform: [{ rotate: "45deg" }],
  },

  tailOut: {
    right: -5,
    top: 8,
    backgroundColor: theme.colors.green[50],
    transform: [{ rotate: "45deg" }],
  },

  bubble: {
    flex: 1,
    borderRadius: 8,
    padding: 8,
    zIndex: 1,
  },

  bubbleIn: {
    backgroundColor: theme.colors.gray[50],
    borderTopLeftRadius: 0,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },

  bubbleOut: {
    backgroundColor: theme.colors.green[50],
    borderTopRightRadius: 0,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },

  text: {
    fontSize: theme.fontSizes.md,
    lineHeight: 20,
    color: theme.colors.gray[900],
    paddingRight: 56,
    paddingBottom: 18,
  },

  footer: {
    position: "absolute",
    bottom: 4,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  timestamp: {
    fontSize: 10,
    lineHeight: 14,
  },

  tsIn: {
    color: theme.colors.gray[800],
  },

  tsOut: {
    color: theme.colors.gray[800],
  },
});
