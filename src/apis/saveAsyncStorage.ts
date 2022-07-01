import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const saveData = async () => {
  const querySnapshot = await getDocs(collection(db, "Menu"));
  var items: [string, string][] = [];
  querySnapshot.forEach((doc) => {
    var itemName: [string, string] = [doc.id + "_name", doc.data().name];
    var itemPrice: [string, string] = [
      doc.id + "_price",
      String(doc.data().price),
    ];
    items.push(itemName);
    items.push(itemPrice);
  });
  return AsyncStorage.multiSet(items);
};
