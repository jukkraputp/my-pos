import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

interface props {
  name: string;
  ID: string;
  price: number;
  image: any;
  type: string;
  onChange: Function;
}

export default function ContentCard(props: props) {
  const name = props.name;
  const ID = props.ID;
  const price = props.price;
  const image = props.image;
  const type = props.type;
  const onChange = props.onChange === undefined ? () => {} : props.onChange;
  const disabled = props.onChange === undefined ? true : false;

  return (
    <View style={{ flex: 1, height: 150 }}>
      <TouchableOpacity
        style={{ height: 120, alignSelf: "center" }}
        onPress={() => onChange(type + "_" + String(ID))}
        disabled={disabled}
      >
        <Image style={{ width: 100, height: 100 }} source={image} />
        <Text style={{ textAlign: "center", height: 15 }}>{name}</Text>
        <Text style={{ textAlign: "center", height: 15 }}>{price} บาท</Text>
      </TouchableOpacity>
    </View>
  );
}
