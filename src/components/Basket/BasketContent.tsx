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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { menuList } from "interface";
interface props {
  updateBasket: Function;
  items: { [key: string]: any };
  inBasket: boolean;
  menuList: menuList;
}

export default function BasketContent(props: props) {
  const renderBasket = () => {
    const JSX = Object.keys(props.items).map((itemName: string) => {
      const itemAmount = props.items[itemName];
      const index1 = itemName.split("_")[0];
      const index2 = itemName.split("_")[1];
      const image = props.menuList[index1][index2].image;
      const name = props.menuList[index1][index2].name;
      return (
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
            <Text style={styles.itemNameText}>{name}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={styles.bigImage}
                source={{ uri: image }}
                resizeMethod="resize"
              />
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
                      source={require("../../assets/images/Sign/plus-sign.svg")}
                      resizeMethod="resize"
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
                      source={require("../../assets/images/Sign/minus-sign.svg")}
                      resizeMethod="resize"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      );
    });
    return JSX;
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
