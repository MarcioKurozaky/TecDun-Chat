import { StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

export default function CommunitiesScreen() {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Communities</Text>
      <Text style={styles.subtitle}>Communities coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.edge,
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "600",
    color: theme.colors.gray[900],
    marginBottom: 8,
  },

  subtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[800],
  },
});
