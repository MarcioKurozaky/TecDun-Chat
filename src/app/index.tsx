import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as SplashScreen from "expo-splash-screen";

import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const setTimeOut = async () => {
      try {
        // carregar fontes, auth, api, etc...
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    setTimeOut();
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      if (appIsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Hi everyone!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
});
