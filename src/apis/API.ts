import getPrice from "./getPrice";
import ItemList from "./ItemList";
import Food1_Images from "../constants/Food1_Images";
import Food2_Images from "../constants/Food2_Images";
import FoodSet_Images from "../constants/FoodSet_Images";
import Icon from "../constants/Icon";
import getOrders from "./getOrders";
import getName from "./getName";
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
    }

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