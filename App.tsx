import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import Reception from "./src/screens/Reception";
import Chef from "./src/screens/Chef";
import Login from "./src/screens/Login";
import API from "./src/apis/API";
import { Platform } from "react-native";
import { storage } from "./src/apis/firebase";
import { getDownloadURL, ref } from "firebase/storage";

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

export default function App() {
  const [auth, setAuth] = useState<boolean | string>(false);

  const api = new API();

  const isLoadingComplete = useCachedResources(api);
  const colorScheme = useColorScheme();

  const shopName = "Steak Station";

  useEffect(() => {
    changeScreenOrientation();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    switch (auth) {
      case "waiter":
      case "reception":
        return <Reception api={api} />;
      case "chef":
        return <Chef api={api} />;
      default:
        return <Login api={api} name={shopName} setAuth={setAuth} />;
    }
  }
}
