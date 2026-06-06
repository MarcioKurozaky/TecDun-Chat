import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  const isAuth = false;

  useEffect(() => {
    const setTimeOut = async () => {
      try {
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

  return <Redirect href={isAuth ? "/chat/index" : "/auth"} />;
}
