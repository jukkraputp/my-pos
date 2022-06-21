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
  const image =
    props.image !== "null" && props.image !== ""
      ? props.image
      : "https://firebasestorage.googleapis.com/v0/b/mypos-3f997.appspot.com/o/Sign%2Fquestion_mark-sign.svg?alt=media&token=275bf15a-a310-46a6-a56c-630c8d0eb180";

  /*   useEffect(() => {
    if (props.from === "Order") {
      console.log(props);
    }
  }); */

  return (
    <View style={styles.cardContainer}>
      {props.from === "Menu" ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onChange(props.type + "_" + String(props.ID), "+")}
          disabled={disabled}
        >
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMethod="resize"
          />
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{props.price} บาท</Text>
        </TouchableOpacity>
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
            source={{ uri: image }}
            resizeMethod="resize"
          />
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{props.price + " บาท"}</Text>
          {props.from === "Edit" && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => props.onChange(props.type + "_" + props.ID)}
            >
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
