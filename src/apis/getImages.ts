import AsyncStorage from "@react-native-async-storage/async-storage"

const getImage = async (key: string) => {
    const res = await AsyncStorage.getItem(key)
    return String(res)
}

export default getImage