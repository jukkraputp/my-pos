import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Reception from "./screens/Reception";
import Chef from "./screens/Chef";
import Login from "./screens/Login";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth as firebaseAuth } from "./apis/firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

export default function App() {
  const [auth, setAuth] = useState<boolean | string>('waiter');

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const shopName = "Steak Station";

  useEffect(() => {
    changeScreenOrientation();

    firebaseAuth.signOut();

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
    return <></>;
  } else {
    switch (auth) {
      case "waiter":
      case "reception":
        return <Reception />;
      case "chef":
        return <Chef />;
      default:
        return <Login name={shopName} />;
    }
  }
}
