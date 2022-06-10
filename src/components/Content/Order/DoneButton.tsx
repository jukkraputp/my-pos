import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface props {
  mode: any;
  onClick: Function;
}

export default function DoneButton(props: props) {
  const mode = props.mode;
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        backgroundColor: "green",
        alignSelf: "center",
        justifyContent: "center",
      }}
      onPress={() => props.onClick()}
    >
      <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold" }}>
        {mode === "waiter" ? "Done" : "Ready"}
      </Text>
    </TouchableOpacity>
  );
}
