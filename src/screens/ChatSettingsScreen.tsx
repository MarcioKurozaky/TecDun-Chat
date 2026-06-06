import { StyleSheet, Text, View } from "react-native";

export default function ChatSettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Settings Screen</Text>
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
    fontSize: 18,
    fontFamily: "regular",
  },
});
