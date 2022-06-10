import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import ConfirmButton from "./Basket/ConfirmButton";
import BasketContent from "./Basket/BasketContent";
import API from "../apis/API";
import ClearBasketButton from "./Basket/ClearBasketButton";

interface props {
  basket: {};
  updateBasket: Function;
  clearBasket: Function;
  confirmOrder: Function;
}

const api = new API();

export default function Basket(props: props) {
  const [items, setItems] = useState({});

  useEffect(() => {
    setItems(props.basket);
  }, [props.basket]);

  const updateBasket = (ID: string) => {
    props.updateBasket(ID, "-");
  };

  const clearBasket = () => {
    props.clearBasket();
  };

  const confirmOrder = () => {
    if (Object.keys(items).length !== 0) {
      props.confirmOrder();
    }
  };

  return (
    <View
      style={{
        height: Dimensions.get("window").height,
        justifyContent: "flex-start",
      }}
    >
      <View style={{ height: Dimensions.get("window").height * 0.05 }}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 2.5,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Order
        </Text>
        {Object.keys(items).length !== 0 && (
          <ClearBasketButton onClick={clearBasket} />
        )}
      </View>
      <View style={{ height: 0.2, backgroundColor: "black", marginTop: 2.5 }} />
      <BasketContent
        updateBasket={updateBasket}
        items={items}
        inBasket={true}
      />
      <View
        style={{
          borderTopWidth: 1,
          borderColor: "black",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>amount</Text>
        <Text>{api.getTotalAmount(items)}</Text>
      </View>
      <View style={{ height: Dimensions.get("window").height * 0.1 }}>
        <ConfirmButton
          width={(Dimensions.get("window").width * 2) / 10.01}
          height={Dimensions.get("window").height * 0.1}
          confirmOrder={confirmOrder}
        />
      </View>
    </View>
  );
}
