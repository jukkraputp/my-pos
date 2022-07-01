import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const getMenu = async () => {
  console.log("getting menu");
  var menu: {
    [key: string]: {
      [key: string]: { name: string; price: string; image: string };
    };
  } = {};
  const querySnapshot = await getDocs(collection(db, "Menu"));
  querySnapshot.forEach((doc) => {
    const type = String(doc.id.split("_")[0]);
    const id = String(doc.id.split("_")[1]);

    // initial
    if (!Object.keys(menu).includes(type)) {
      menu[type] = {};
    }

    menu[type][id] = {
      name: String(doc.data().name),
      price: String(doc.data().price),
      image: "",
    };
  });
  return menu;
};

export default getMenu;
