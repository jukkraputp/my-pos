import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import API from "../../apis/API";

interface props {
  updateBasket: Function;
  items: { [key: string]: any };
  inBasket: boolean;
  api: API;
}

export default function BasketContent(props: props) {
  const api = props.api;
  const allImages = api.allImages;
  const items = props.items;

  useEffect(() => {
    console.log(Object.keys(items));
  });

  const renderBasket = () => {
    var jsx: JSX.Element[][] = [];
    if (Object.keys(items).length !== 0) {
      Object.keys(items).forEach((itemName: string) => {
        const itemAmount = items[itemName];
        var image: string;
        const index = itemName.split("_")[0] + "_Images";
        switch (index) {
          case "Food1_Images":
            image = allImages.Food1_Images[Number(itemName.split("_")[1])];
            break;
          case "Food2_Images":
            image = allImages.Food2_Images[Number(itemName.split("_")[1])];
            break;
          case "FoodSet_Images":
            image = allImages.FoodSet_Images[Number(itemName.split("_")[1])];
            break;
          default:
            image = "";
            break;
        }
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
                        source={{
                          uri: "https://cdn.discordapp.com/attachments/831568260662820915/985935537309372488/Plus.png",
                        }}
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
                        source={{
                          uri: "https://cdn.discordapp.com/attachments/831568260662820915/985935562412285992/Minus.png",
                        }}
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
