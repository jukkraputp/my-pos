import getPrice from "./getPrice";
import ItemList from "./ItemList";
import Icon from "../constants/Icon";
import getOrders from "./getOrders";
import getName from "./getName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData } from "./saveAsyncStorage";
import addNewMenu from "./addNewMenu";
import getImage from "./getImages";
import getMenu from "./getMenu";
import editMenu from "./editMenu";
import { storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { menuList } from "interface";

export default class API {
  constructor() {}

  editMenu = (menuID: string, menu: { name: string; price: string }) => {
    return editMenu(menuID, menu);
  };

  getMenu = async () => {
    return await getMenu();
  };

  logout = async () => {
    await AsyncStorage.setItem("Auth", String(null));
    return;
  };

  private getLastID = async (type: string): Promise<string> => {
    var temp = 0;
    const keys = await AsyncStorage.getAllKeys();
    keys.forEach((key) => {
      if (key.includes(type + "_")) {
        const id = Number(key.split("_").at(1));
        if (temp < id) {
          temp = id;
        }
      }
    });
    return type + "_" + String(temp + 1);
  };

  private saveNewMenu = async (id: string, name: string, price: number) => {
    const saveName = await AsyncStorage.setItem(id + "_name", name);
    const savePrice = await AsyncStorage.setItem(id + "_price", String(price));
    await Promise.all([saveName, savePrice]).then(() => {
      return true;
    });
  };

  private addNewTempImage = async (type: string, id: string) => {
    const storageRef = ref(storage, type);
  };

  addNewMenu = async (type: string, name: string, price: number) => {
    console.log("add new menu", type, name, price);
    const lastID = await this.getLastID(type);
    addNewMenu(name, price, lastID)
      .then(() => {
        return this.saveNewMenu(lastID, name, price);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    this.addNewTempImage(type, lastID);
  };

  saveData = async () => {
    return await saveData();
  };

  getImage = async (key: string) => {
    const res = await getImage(key);
    return String(res);
  };

  getImages = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const getURL = keys.map(async (key) => {
      const url = String(await AsyncStorage.getItem(key));
      return `${key}::${url}`;
    });
    return Promise.all(getURL);
  };

  getOrders = async () => {
    return await getOrders();
  };

  getIcons = () => {
    return Icon;
  };

  getName = async (item: string) => {
    const res = await getName(item);
    return String(res);
  };

  getPrice = async (item: string) => {
    const res = await getPrice(item);
    return Number(res);
  };

  getTotalAmount = (order: { [key: string]: any }, menuList: menuList) => {
    var totalAmount = 0;
    Object.keys(order).forEach((menu) => {
      const index1 = String(menu.split("_").at(0));
      const index2 = String(menu.split("_").at(1));
      totalAmount += Number(menuList[index1][index2].price) * order[menu];
    });
    return totalAmount;
  };

  itemList = (type = "all") => {
    if (type === "Food1") {
      return ItemList.Food1;
    } else if (type === "Food2") {
      return ItemList.Food2;
    } else if (type === "FoodSet") {
      return ItemList.FoodSet;
    } else if (type === "all") {
      return ItemList;
    }
  };
}
