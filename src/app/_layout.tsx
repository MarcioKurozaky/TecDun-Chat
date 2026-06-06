import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";

import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    black: require("../../assets/fonts/Roboto-Black.ttf"),
    blackItalic: require("../../assets/fonts/Roboto-BlackItalic.ttf"),
    bold: require("../../assets/fonts/Roboto-Bold.ttf"),
    boldItalic: require("../../assets/fonts/Roboto-BoldItalic.ttf"),
    italic: require("../../assets/fonts/Roboto-Italic.ttf"),
    light: require("../../assets/fonts/Roboto-Light.ttf"),
    lightItalic: require("../../assets/fonts/Roboto-LightItalic.ttf"),
    medium: require("../../assets/fonts/Roboto-Medium.ttf"),
    mediumItalic: require("../../assets/fonts/Roboto-MediumItalic.ttf"),
    regular: require("../../assets/fonts/Roboto-Regular.ttf"),
    thin: require("../../assets/fonts/Roboto-Thin.ttf"),
    thinItalic: require("../../assets/fonts/Roboto-ThinItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
}
