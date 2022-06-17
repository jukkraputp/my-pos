import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";

export const saveData = async () => {
    const querySnapshot = await getDocs(collection(db, 'Menu'));
    querySnapshot.forEach(async (doc) => {
        await AsyncStorage.setItem(doc.id + '_name', doc.data().name)
        await AsyncStorage.setItem(doc.id + '_price', String(doc.data().price))
    })
}