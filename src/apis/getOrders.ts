import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default async function getOrders() {
    return await getDocs(collection(db, "Order"));
}
