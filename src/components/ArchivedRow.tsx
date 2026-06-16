import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

type ArchivedRowProps = {
  readonly count?: number;
  readonly onPress?: () => void;
};

export function ArchivedRow({ count = 0, onPress }: ArchivedRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="archive" size={24} color={theme.colors.teal[700]} />
      </View>

      <Text style={styles.label}>Archived</Text>

      <Text style={styles.count}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.edge,
    paddingVertical: 12,
    gap: theme.spacing.gutter,
  },

  pressed: {
    backgroundColor: theme.colors.gray[300],
  },

  iconContainer: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    flex: 1,
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: theme.colors.gray[900],
  },

  count: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "700",
    color: theme.colors.teal[700],
  },
});
