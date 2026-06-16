import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { UserPhoto } from "@/components/UserPhoto";
import { currentUser } from "@/data/mockData";
import theme from "@/utils/theme";

type MyStatusSectionProps = {
  readonly onPress?: () => void;
  readonly onAddPress?: () => void;
};

export function MyStatusSection({ onPress, onAddPress }: MyStatusSectionProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.avatarWrapper}>
        <UserPhoto
          source={currentUser.avatarUrl ? { uri: currentUser.avatarUrl } : undefined}
          size={56}
        />

        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          onPress={onAddPress}
        >
          <Ionicons name="add" size={16} color={theme.colors.white} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>{currentUser.name}</Text>
        <Text style={styles.subtitle}>Toque para atualizar seu status</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.edge,
    paddingVertical: 16,
  },

  pressed: {
    backgroundColor: theme.colors.gray[300],
  },

  avatarWrapper: {
    position: "relative",
  },

  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.teal[500],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.colors.white,
  },

  addButtonPressed: {
    opacity: 0.7,
  },

  content: {
    flex: 1,
    marginLeft: theme.spacing.gutter,
  },

  label: {
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
