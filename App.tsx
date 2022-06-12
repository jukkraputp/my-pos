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
import { onAuthStateChanged } from "firebase/auth";
import API from "./src/apis/API";
import { Platform } from "react-native";

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

export default function App() {
  const [auth, setAuth] = useState<boolean | string>(
    Platform.OS === "android" ? "waiter" : "chef"
  );

  const api = new API();

  const isLoadingComplete = useCachedResources(api);
  const colorScheme = useColorScheme();

  const shopName = "Steak Station";

  useEffect(() => {
    changeScreenOrientation();

    /* onAuthStateChanged(firebaseAuth, (user: any) => {
      if (user) {
        const mode = user.email.split("@")[0];
        if (mode === "waiter" || mode === "reception" || mode === "chef") {
          console.log(mode);
          setAuth(mode);
        } else {
          firebaseAuth.signOut();
        }
      } else {
        setAuth(false);
      }
    }); */
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    switch (auth) {
      case "waiter":
      case "reception":
        return <Reception api={api} />;
      case "chef":
        return <Chef />;
      default:
        return <Login name={shopName} />;
    }
  }
}
