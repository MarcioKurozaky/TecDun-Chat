import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

type TopBarProps = {
  readonly onCameraPress?: () => void;
  readonly onSearchPress?: () => void;
  readonly onMorePress?: () => void;
};

export function TopBar({
  onCameraPress,
  onSearchPress,
  onMorePress,
}: TopBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TecDun-Chat</Text>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconPressed,
          ]}
          onPress={onCameraPress}
        >
          <Ionicons
            name="camera-outline"
            size={24}
            color={theme.colors.white}
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconPressed,
          ]}
          onPress={onSearchPress}
        >
          <Ionicons name="search" size={24} color={theme.colors.white} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconPressed,
          ]}
          onPress={onMorePress}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={theme.colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.edge,
    paddingVertical: 10,
    backgroundColor: theme.colors.teal[700],
  },

  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "600",
    color: theme.colors.white,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  iconPressed: {
    opacity: 0.8,
  },
});
