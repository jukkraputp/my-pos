import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default async function getOrders() {
    return await getDocs(collection(db, "Order"));
}
