import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import BasketContent from "./Basket/BasketContent";
import API from "../apis/API";

interface props {
  basket: {};
  updateBasket: Function;
  clearBasket: Function;
  confirmOrder: Function;
  api: API;
}

export default function Basket(props: props) {
  const [items, setItems] = useState({});

  const api = props.api;

  const maxHeight = Dimensions.get("screen").height;

  useEffect(() => {
    console.log(props.basket);
    setItems(props.basket);
  }, [props.basket]);

  const confirmOrder = () => {
    console.log(items);
    if (Object.keys(items).length !== 0) {
      props.confirmOrder();
    }
  };

  return (
    <View
      style={{
        height: maxHeight,
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          height: maxHeight * 0.1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            marginLeft: 10,
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          Order
        </Text>
        {Object.keys(items).length !== 0 && (
          <TouchableOpacity
            style={{ width: 25, height: 25, marginRight: 10 }}
            onPress={() => props.clearBasket()}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/icons/icon-close-512.webp")}
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          height: maxHeight * 0.001,
          backgroundColor: "black",
          marginTop: 2.5,
        }}
      />
      <BasketContent
        updateBasket={props.updateBasket}
        items={items}
        inBasket={true}
        api={api}
      />
      {Object.keys(items).length > 0 && (
        <>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "black",
              flexDirection: "row",
              justifyContent: "space-between",
              height: maxHeight * 0.05,
            }}
          >
            <Text style={{ fontSize: 20, marginLeft: 5 }}>ราคารวม</Text>
            <Text style={{ fontSize: 20, marginRight: 5 }}>
              {api.getTotalAmount(items).toLocaleString()} บาท
            </Text>
          </View>
          <View style={{ height: maxHeight * 0.1 }}>
            <TouchableOpacity
              onPress={confirmOrder}
              style={{
                backgroundColor: "black",
                height: maxHeight * 0.1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 36,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
