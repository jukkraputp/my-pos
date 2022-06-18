import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Theme from "../../constants/Theme";

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

  /*   useEffect(() => {
    if (props.from === "Order") {
      console.log(props);
    }
  }); */

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
        <View
          style={
            props.from === "Edit"
              ? {
                  width: 800,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }
              : { flexDirection: "column" }
          }
        >
          <Image
            style={styles.image}
            source={{ uri: props.image }}
            resizeMethod="resize"
          />
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{props.price + " บาท"}</Text>
          {props.from === "Edit" && (
            <TouchableOpacity style={styles.editButton}>
              <Text>Edit</Text>
            </TouchableOpacity>
          )}
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
  editButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Theme.COLORS.SUCCESS,
    justifyContent: "center",
    alignItems: "center",
  },
});
