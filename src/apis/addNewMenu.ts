import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const addNewMenu = async (name: string, price: number, ID: string) => {
    return await setDoc(doc(db, 'Menu', ID), {
        name: name,
        price: price
    })
}

export default addNewMenu