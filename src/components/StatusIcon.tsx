import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import theme from "@/utils/theme";

type StatusIconProps = {
  readonly delivered?: boolean;
  readonly read?: boolean;
};

export function StatusIcon({ delivered, read }: StatusIconProps) {
  if (!delivered) return null;

  return (
    <View style={styles.container}>
      <Ionicons
        name="checkmark-done"
        size={16}
        color={read ? theme.colors.blue[500] : theme.colors.gray[800]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 2,
  },
});
