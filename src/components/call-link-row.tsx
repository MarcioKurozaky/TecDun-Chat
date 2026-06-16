import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

type CallLinkRowProps = PressableProps & {
  readonly onPress?: () => void;
};

export function CallLinkRow({ onPress, ...rest }: CallLinkRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="link"
      accessibilityLabel="Create call link"
      onPress={onPress}
      {...rest}
    >
      <View style={styles.iconCircle}>
        <Ionicons name="link" size={24} color={theme.colors.green[600]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create call link</Text>
        <Text style={styles.subtitle}>Share a link for your WhatsApp call</Text>
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
    gap: theme.spacing.gutter,
  },

  pressed: {
    backgroundColor: theme.colors.gray[300],
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.green[400],
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: theme.colors.gray[900],
  },

  subtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[800],
    marginTop: 2,
  },
});
