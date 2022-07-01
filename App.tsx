import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

import useCachedResources from "./src/hooks/useCachedResources";
import Reception from "./src/screens/Reception";
import Chef from "./src/screens/Chef";
import Login from "./src/screens/Login";
import API from "./src/apis/API";
import { LogBox, Platform, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./src/config/firebase";
import * as Updates from "expo-updates";
import { UpdateEventType } from "expo-updates";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "(0 , _idb.openDB)",
  "Remote debugger",
  "Please report: Excessive number of pending callbacks",
]);

async function changeScreenOrientation() {
  try {
    Platform.OS === "android"
      ? await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        )
      : await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
  } catch (err) {
    console.log(err);
  }
}

export default function App() {
  const [auth, setAuth] = useState<string | null>("waiter" /* null */);
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([]);

  const api = new API();

  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  const shopName = "Steak Station";

  useEffect(() => {
    changeScreenOrientation();

    var temp: {}[] = [];
    getDocs(query(collection(db, "Menu"))).then((snapShot) => {
      snapShot.forEach((doc) => {
        temp.push(doc.data());
      });
      setItemList(temp);
    });

    AsyncStorage.clear();

    /* api.saveData(); */

    /* AsyncStorage.getAllKeys().then((keys) => {
      keys.forEach(async (key) => {
        if (key.includes("name") || key.includes("price")) {
          const data = await AsyncStorage.getItem(key);
        }
      });
    }); */

    /* const storageRef = ref(storage, "Food1/Food1-30.jpg");
    uploadBytes(
      storageRef,
      require("./src/assets/images/Sign/question_mark-sign.png"),
      {
        contentType: "image/jpeg",
      }
    ).then(() => {
      console.log("file uploaded!");
    }); */

    const inititalAuth = async () => {
      if (auth === null) setAuth(await AsyncStorage.getItem("Auth"));
    };
    inititalAuth();

    const listener = Updates.addListener((event) => {
      if (event.manifest) {
        Updates.fetchUpdateAsync().then(() => {
          Updates.reloadAsync();
        });
      }
    });

    return () => {
      listener();
    };
  }, []);

  if (isLoadingComplete) {
    console.log(auth);
    AsyncStorage.setItem("Auth", String(auth));
    switch (auth) {
      case "waiter":
      case "reception":
        return <Reception setAuth={setAuth} />;
        return (
          <ScrollView>
            {itemList.map((item) => {
              return (
                <Text key={item["name"]}>
                  name: {item["name"] + "\t"} price: {item["price"]}
                </Text>
              );
            })}
          </ScrollView>
        );
      case "chef":
        return <Chef setAuth={setAuth} />;
      default:
        return <Login name={shopName} setAuth={setAuth} />;
    }
  } else return null;
}
