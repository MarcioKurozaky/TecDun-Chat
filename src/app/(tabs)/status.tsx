import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import theme from "@/utils/theme";

import { TopBar } from "@/components/TopBar";
import StatusScreen from "@/screens/StatusScreen";

export default function Status() {
  const handleCameraPress = useCallback(() => {
    console.log("Camera pressed");
  }, []);

  const handleSearchPress = useCallback(() => {
    console.log("Search pressed");
  }, []);

  const handleMorePress = useCallback(() => {
    console.log("More pressed");
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <TopBar
        onCameraPress={handleCameraPress}
        onSearchPress={handleSearchPress}
        onMorePress={handleMorePress}
      />

      <View style={styles.content}>
        <StatusScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.teal[700],
  },

  content: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
});
