import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface props {
  width: number;
  height: number;
  confirmOrder: Function
}

export default function ConfirmButton(props: props) {
  return (
    <View
      style={{
        backgroundColor: "black",
      }}
    >
      <TouchableOpacity
        style={{
          width: props.width,
          height: props.height,
          justifyContent: "center",
        }}
        onPress={() => props.confirmOrder()}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  );
}
