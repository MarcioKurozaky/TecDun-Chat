import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

import { type CallItem } from "@/data/mockData";
import theme from "@/utils/theme";

import { UserPhoto } from "@/components/UserPhoto";

type CallListItemProps = PressableProps & {
  readonly item: CallItem;
  readonly onCallPress?: () => void;
};

const directionConfig = {
  missed: { icon: "arrow-down-circle" as const, color: theme.colors.danger[700] },
  incoming: { icon: "arrow-down-circle" as const, color: theme.colors.green[800] },
  outgoing: { icon: "arrow-up-circle" as const, color: theme.colors.green[800] },
} as const;

export function CallListItem({ item, onCallPress, ...rest }: CallListItemProps) {
  const dir = directionConfig[item.direction];
  const isMissed = item.direction === "missed";
  const actionIcon = item.callType === "video" ? "videocam" : "call";
  const displayName = item.callCount ? `${item.name} (${item.callCount})` : item.name;

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Call from ${item.name}`}
      {...rest}
    >
      <View style={styles.avatarContainer}>
        {item.avatarUrl ? (
          <UserPhoto source={{ uri: item.avatarUrl }} size={56} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="person" size={28} color={theme.colors.gray[700]} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={[styles.name, isMissed && styles.missedName]}
            numberOfLines={1}
          >
            {displayName}
          </Text>

          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
            accessibilityRole="button"
            accessibilityLabel={item.callType === "video" ? `Video call ${item.name}` : `Call ${item.name}`}
            onPress={onCallPress}
          >
            <Ionicons name={actionIcon} size={20} color={theme.colors.teal[700]} />
          </Pressable>
        </View>

        <View style={styles.bottomRow}>
          <Ionicons name={dir.icon} size={16} color={dir.color} />
          <Text style={styles.timestamp}>{item.timestamp}</Text>
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

  placeholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
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

  missedName: {
    color: theme.colors.danger[700],
  },

  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  actionPressed: {
    backgroundColor: "rgba(0, 69, 61, 0.08)",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },

  timestamp: {
    fontSize: theme.fontSizes.xs,
    lineHeight: 14,
    letterSpacing: 0.2,
    color: theme.colors.gray[800],
  },
});
