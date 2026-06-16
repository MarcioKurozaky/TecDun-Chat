import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>

      <Link href="/chat/settings" style={styles.link}>
        Configurações do Chat
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontFamily: "regular",
  },

  link: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.teal["500"],
    marginTop: 24,
    fontFamily: "regular",
  },
});
