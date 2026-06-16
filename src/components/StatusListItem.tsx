import { Pressable, StyleSheet, Text, View } from "react-native";

import { type StatusItem } from "@/data/mockData";
import theme from "@/utils/theme";

import { StatusRing } from "@/components/StatusRing";

type StatusListItemProps = {
  readonly item: StatusItem;
  readonly onPress?: () => void;
};

export function StatusListItem({ item, onPress }: StatusListItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <StatusRing avatarUrl={item.avatarUrl} isViewed={item.isViewed} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    height: 72,
    paddingHorizontal: theme.spacing.edge,
  },

  pressed: {
    backgroundColor: theme.colors.gray[300],
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: theme.colors.gray[900],
  },

  timestamp: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[800],
    marginTop: 2,
  },
});
