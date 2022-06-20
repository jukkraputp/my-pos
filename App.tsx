import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

import useCachedResources from "./src/hooks/useCachedResources";
import Reception from "./src/screens/Reception";
import Chef from "./src/screens/Chef";
import Login from "./src/screens/Login";
import API from "./src/apis/API";
import { LogBox, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "(0 , _idb.openDB)",
  "Remote debugger",
]);

async function changeScreenOrientation() {
  try {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  } catch (err) {
    console.log(err);
  }
}

export default function App() {
  const [auth, setAuth] = useState<string | null>("waiter" /* null */);

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
    const inititalAuth = async () => {
      if (auth === null) setAuth(await AsyncStorage.getItem("Auth"));
    };
    inititalAuth();
  }, []);

  if (isLoadingComplete) {
    console.log(auth);
    AsyncStorage.setItem("Auth", String(auth));
    switch (auth) {
      case "waiter":
      case "reception":
        return <Reception setAuth={setAuth} />;
      case "chef":
        return <Chef setAuth={setAuth} />;
      default:
        return <Login name={shopName} setAuth={setAuth} />;
    }
  } else return null;
}
