import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

interface props {
  name: string;
  ID: string;
  price: number;
  image: string;
  type: string;
  onChange: Function;
  from: string;
}

export default function ContentCard(props: props) {
  const onChange = props.onChange === undefined ? () => {} : props.onChange;
  const disabled = props.onChange === undefined ? true : false;

  return (
    <View style={styles.cardContainer}>
      {props.from === "Menu" ? (
        !!props.image ? (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onChange(props.type + "_" + String(props.ID), "+")}
            disabled={disabled}
          >
            <Image
              style={styles.image}
              source={{ uri: props.image }}
              resizeMethod="resize"
            />
            <Text style={styles.text}>{props.name}</Text>
            <Text style={styles.text}>{props.price} บาท</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer} />
        )
      ) : (
        <View style={styles.buttonContainer}>
          <Image
            style={styles.image}
            source={{ uri: props.image }}
            resizeMethod="resize"
          />
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{props.price + " บาท"}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: 100,
    height: 150,
  },
  buttonContainer: {
    width: 100,
    height: 140,
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    width: 100,
    height: 20,
  },
});
