import { StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

type DateChipProps = {
  readonly label: string;
};

export function DateChip({ label }: DateChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 8,
    overflow: "hidden",
  },

  label: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "700",
    lineHeight: 16,
    letterSpacing: 0.5,
    color: theme.colors.gray[800],
    textTransform: "uppercase",
  },
});
