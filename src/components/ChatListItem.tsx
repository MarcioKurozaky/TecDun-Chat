import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { type ChatItem } from "@/data/mockData";
import theme from "@/utils/theme";

import { UserPhoto } from "@/components/UserPhoto";
import { StatusIcon } from "@/components/StatusIcon";
import { UnreadBadge } from "@/components/UnreadBadge";

type ChatListItemProps = {
  readonly item: ChatItem;
  readonly onPress?: () => void;
};

export function ChatListItem({ item, onPress }: ChatListItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        {item.isGroup ? (
          <View style={styles.groupAvatar}>
            <Ionicons name="people" size={28} color={theme.colors.gray[700]} />
          </View>
        ) : item.avatarUrl ? (
          <UserPhoto source={{ uri: item.avatarUrl }} size={56} />
        ) : (
          <View style={styles.groupAvatar}>
            <Ionicons name="person" size={28} color={theme.colors.gray[700]} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text
            style={[
              styles.timestamp,
              item.unreadCount ? styles.timestampUnread : undefined,
            ]}
          >
            {item.timestamp}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.previewRow}>
            {item.isDelivered ? (
              <StatusIcon delivered={item.isDelivered} read={item.isRead} />
            ) : null}

            {item.hasAttach ? (
              <Ionicons
                name="attach"
                size={16}
                color={theme.colors.gray[800]}
                style={styles.attachIcon}
              />
            ) : null}

            <Text style={styles.preview} numberOfLines={1}>
              {item.lastMessage}
            </Text>
          </View>

          {item.unreadCount ? <UnreadBadge count={item.unreadCount} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 72,
    paddingHorizontal: theme.spacing.edge,
  },

  pressed: {
    backgroundColor: theme.colors.gray[300],
  },

  avatarContainer: {
    flexShrink: 0,
  },

  groupAvatar: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: theme.colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    marginLeft: theme.spacing.gutter,
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[600],
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: theme.colors.gray[900],
    flexShrink: 1,
  },

  timestamp: {
    fontSize: theme.fontSizes.xs,
    lineHeight: 14,
    letterSpacing: 0.2,
    color: theme.colors.gray[800],
    marginLeft: 8,
  },

  timestampUnread: {
    fontWeight: "700",
    color: theme.colors.teal[700],
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  attachIcon: {
    marginRight: 2,
  },

  preview: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[800],
    flexShrink: 1,
  },
});
