import getPrice from "./getPrice";
import ItemList from "./ItemList";
import Icon from "../constants/Icon";
import getOrders from "./getOrders";
import getName from "./getName";
<<<<<<< HEAD
import { FirebaseStorage, getDownloadURL, listAll, ref, StorageReference } from "firebase/storage";
import { storage } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheManager } from "react-native-expo-image-cache"

export default class API {

    constructor() {

=======
import Sign_Images, { signList } from "../constants/Sign_Images"

export default class API {
    allImages
    signs: { [key: string]: string } = {
        'plus': '',
        'minus': '',
        'close': ''
    }

    constructor() {
        this.allImages = { Food1_Images, Food2_Images, FoodSet_Images }
        Sign_Images.forEach((sign, index) => {
            this.signs[signList[index]] = sign
        })
>>>>>>> 4b9ea680eae1eea7d4b6d055267dc927c4040814
    }

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

    getName = (item: string) => {
        return getName(item);
    };

    getPrice = (item: string) => {
        return getPrice(item);
    };

    getTotalAmount = (order: { [key: string]: any }) => {
        var totalAmount = 0;
        Object.keys(order).forEach((item) => {
            totalAmount += this.getPrice(item) * order[item];
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
