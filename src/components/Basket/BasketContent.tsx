import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../apis/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface props {
  updateBasket: Function;
  items: { [key: string]: any };
  inBasket: boolean;
  api: API;
}

export default function BasketContent(props: props) {
  const [allImages, setAllImages] = useState<{ [key: string]: string }>({});
  const api = props.api;
  const items = props.items;

  const getData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const getURL = keys.map(async (key) => {
      const url = String(await AsyncStorage.getItem(key));
      return `${key}::${url}`;
    });
    return Promise.all(getURL);
  };

  useEffect(() => {
    getData().then((urls) => {
      var images: { [key: string]: string } = {};
      urls.map((url) => {
        const key = String(url.split("::").at(0));
        const uri = url.split("::").at(1);
        images[key] = String(uri);
      });
      setAllImages(images);
    });
  }, []);

  const renderBasket = () => {
    var jsx: JSX.Element[][] = [];
    if (Object.keys(items).length !== 0) {
      Object.keys(items).forEach((itemName: string) => {
        const itemAmount = items[itemName];
        const index1 = itemName.split("_")[0];
        const index2 = itemName.split("_")[1];
        const key = index1 + "_" + index1 + "-" + index2;
        const image = allImages[key];
        jsx.push([
          <View
            key={itemName}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginLeft: 10,
              marginRight: 25,
            }}
          >
            <View style={{ width: "95%" }}>
              <Text style={styles.itemNameText}>{api.getName(itemName)}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image style={styles.bigImage} source={{ uri: image }} />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    right: "15%",
                  }}
                >
                  {props.inBasket && (
                    <TouchableOpacity
                      style={(styles.button, { right: "25%" })}
                      onPress={() => props.updateBasket(itemName, "+")}
                    >
                      <Image
                        style={styles.smallImage}
                        source={{ uri: allImages["Sign_plus-sign"] }}
                      />
                    </TouchableOpacity>
                  )}
                  <Text
                    style={[
                      styles.itemAmountText,
                      !props.inBasket && { left: "20%" },
                    ]}
                  >
                    {!props.inBasket && " x  "}
                    {itemAmount}
                  </Text>
                  {props.inBasket && (
                    <TouchableOpacity
                      style={(styles.button, { left: "25%" })}
                      onPress={() => props.updateBasket(itemName, "-")}
                    >
                      <Image
                        style={styles.smallImage}
                        source={{ uri: allImages["Sign_minus-sign"] }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>,
        ]);
      });
    }
    return jsx;
  };

  return (
    <ScrollView
      style={{
        height: props.inBasket
          ? Dimensions.get("screen").height * 0.85
          : Dimensions.get("screen").height * 0.5,
        width: props.inBasket ? 300 : 200,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {renderBasket()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: { width: 25, height: 25 },
  bigImage: { width: 100, height: 100 },
  smallImage: { width: 25, height: 25, maxHeight: 25, maxWidth: 25 },
  itemNameText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemAmountText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});
