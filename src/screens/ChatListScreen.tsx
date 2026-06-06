import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/utils/theme";

export default function ChatListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat list screen</Text>

      <Link href="/chat/screen" style={styles.link}>
        Ir para Chat
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
    color: theme.colors.blue["800"],
    marginTop: 24,
    fontFamily: "regular",
  },
});
