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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "(0 , _idb.openDB)",
]);

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

export default function App() {
  const [auth, setAuth] = useState<boolean | string>("waiter" /* false */);

  const api = new API();

  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  const shopName = "Steak Station";

  useEffect(() => {
    changeScreenOrientation();
    /* AsyncStorage.clear().then(() => {
      api.saveData();
    }); */
    api.saveData();
    /* AsyncStorage.getAllKeys().then((keys) => {
      keys.forEach(async (key) => {
        if (key.includes("name") || key.includes("price")) {
          const data = await AsyncStorage.getItem(key);
        }
      });
    }); */
  }, []);

  if (isLoadingComplete) {
    switch (auth) {
      case "waiter":
      case "reception":
        return <Reception />;
      case "chef":
        return <Chef />;
      default:
        return <Login name={shopName} setAuth={setAuth} />;
    }
  } else return null;
}
