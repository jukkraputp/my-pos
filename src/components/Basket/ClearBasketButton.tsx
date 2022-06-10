import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

interface props {
  onClick: Function;
}

export default function ClearBasketButton(props: props) {
  return (
    <View style={{ position: "absolute", marginLeft: "90%" }}>
      <TouchableOpacity
        style={{
          height: 25,
          width: 25,
        }}
        onPress={() => props.onClick()}
      >
        <Image
          style={{ height: 25, width: 25 }}
          source={require("../../assets/icons/icon-close-512.webp")}
        />
      </TouchableOpacity>
    </View>
  );
}
