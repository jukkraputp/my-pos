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

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

const imagesType = ["Food1", "Food2", "FoodSet", "Sign"];

export default function App() {
  const [auth, setAuth] = useState<boolean | string>("waiter" /* false */);

  const api = new API();

  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  const shopName = "Steak Station";

  useEffect(() => {
    changeScreenOrientation();
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
