import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import theme from "@/utils/theme";

import { CallList } from "@/components/call-list";
import { FAB } from "@/components/FAB";

export default function CallsScreen() {
  const handleFabPress = useCallback(() => {
    console.log("FAB pressed");
  }, []);

  return (
    <View style={styles.container}>
      <CallList />
      <FAB
        icon="call"
        variant="primary"
        onPress={handleFabPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
});
