import { StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

type UnreadBadgeProps = {
  readonly count: number;
};

export function UnreadBadge({ count }: UnreadBadgeProps) {
  if (count <= 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.colors.green[800],
    borderRadius: 999,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 11,
    fontWeight: "700",
    color: theme.colors.green[300],
  },
});
