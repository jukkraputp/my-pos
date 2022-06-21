import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getName(item: string) {
  const res = await AsyncStorage.getItem(item + "_name");
  return res;
}
