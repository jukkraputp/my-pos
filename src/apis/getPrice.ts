import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getPrice(item: string) {
  const res = await AsyncStorage.getItem(item + "_price");
  return Number(res);
}
