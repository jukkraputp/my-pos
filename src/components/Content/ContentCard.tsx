import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

interface props {
  name: string;
  ID: string;
  price: number;
  image: any;
  type: string;
  onChange: Function;
  from: string;
}

export default function ContentCard(props: props) {
  const onChange = props.onChange === undefined ? () => {} : props.onChange;
  const disabled = props.onChange === undefined ? true : false;

  return (
    <View
      style={{ flex: 1, width: 100, height: 150 /* backgroundColor: "red" */ }}
    >
      {props.from === "Menu" ? (
        <TouchableOpacity
          style={{ width: 100, height: 140, alignSelf: "center" }}
          onPress={() => onChange(props.type + "_" + String(props.ID), "+ ")}
          disabled={disabled}
        >
          <Image style={{ width: 100, height: 100 }} source={props.image} />
          <Text style={{ textAlign: "center", height: 20 }}>{props.name}</Text>
          <Text style={{ textAlign: "center", height: 20 }}>
            {props.price} บาท
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 100, height: 140, alignSelf: "center" }}>
          <Image style={{ width: 100, height: 100 }} source={props.image} />
          <Text
            style={{
              textAlign: "center",
              height: 20,
              width: 100,
              overflow: "hidden",
            }}
          >
            {props.name}
          </Text>
          <Text style={{ textAlign: "center", height: 20, width: 100 }}>
            {props.price} บาท
          </Text>
        </View>
      )}
    </View>
  );
}
