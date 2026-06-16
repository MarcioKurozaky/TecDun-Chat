import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import theme from "@/utils/theme";

type FABVariant = "primary" | "surface";

type FABProps = {
  readonly onPress?: () => void;
  readonly icon?: keyof typeof Ionicons.glyphMap;
  readonly size?: "sm" | "lg";
  readonly variant?: FABVariant;
  readonly iconPack?: typeof Ionicons;
  readonly iconSize?: number;
};

const variantColors: Record<FABVariant, { bg: string; icon: string }> = {
  primary: { bg: theme.colors.teal[500], icon: theme.colors.white },
  surface: { bg: theme.colors.gray[500], icon: theme.colors.gray[800] },
};

export function FAB({
  onPress,
  icon = "chatbubble-ellipses",
  size = "lg",
  variant = "primary",
  iconPack: Icon = Ionicons,
  iconSize = 24,
}: FABProps) {
  const colors = variantColors[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: colors.bg },
        size === "sm" ? styles.small : styles.large,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Icon name={icon} size={iconSize} color={colors.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    position: "absolute",
    right: theme.spacing.edge,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
  },

  large: {
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  small: {
    bottom: 92,
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
