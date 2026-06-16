import { StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

type SectionHeaderProps = {
  readonly label: string;
};

export function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.edge,
    paddingVertical: 8,
    backgroundColor: theme.colors.gray[200],
  },

  label: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: theme.colors.gray[800],
  },
});
