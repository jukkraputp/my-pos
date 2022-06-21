import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const editMenu = (menuID: string, menu: { name: string; price: string }) => {
  setDoc(doc(db, "Menu", menuID), {
    name: menu.name,
    price: menu.price,
  }).then(() => {
    console.log("saved");
  });
};

export default editMenu;
