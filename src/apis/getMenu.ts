import AsyncStorage from "@react-native-async-storage/async-storage";

const getMenu = async () => {
  const keys = await AsyncStorage.getAllKeys();
  var menu: {
    [key: string]: {
      [key: string]: { name: string; price: string; image: string };
    };
  } = {};
  const storingData = keys.map(async (key) => {
    if (key.includes("Food")) {
      var index1 = String(key.split("_").at(0));
      var index2 = String(key.split("_").at(1));
      var index3 = String(key.split("_").at(-1));
      var index3: string;
      if (index2 === index3) index3 = "image";
      else index3 = index3;
      if (index2.includes("-")) index2 = String(index2.split("-").at(-1));
      const data = String(await AsyncStorage.getItem(key));

      if (!Object.keys(menu).includes(index1)) menu[index1] = {};
      if (!Object.keys(menu[index1]).includes(index2))
        menu[index1][index2] = { name: "", price: "", image: "" };
      switch (index3) {
        case "name":
          menu[index1][index2].name = data;
          break;
        case "price":
          menu[index1][index2].price = data;
          break;
        case "image":
          menu[index1][index2].image = data;
          break;
      }
    }
  });
  return Promise.all(storingData).then(() => {
    return menu;
  });
};

export default getMenu;
