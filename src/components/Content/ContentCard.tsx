import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
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
          <Text style={styles.text}>
            {props.name + "\n"}
            {props.price} บาท
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={
            props.from === "Edit"
              ? {
                  width: Dimensions.get("screen").width * 0.66,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: 10,
                }
              : { flexDirection: "column" }
          }
        >
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMethod="resize"
          />
          {props.from === "Edit" ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={[styles.text, { textAlignVertical: "center" }]}>
                {props.name}
              </Text>
              <Text style={[styles.text, { textAlignVertical: "center" }]}>
                {props.price} บาท
              </Text>
            </View>
          ) : (
            <Text style={styles.text}>
              {props.name + "\n"}
              {props.price} บาท
            </Text>
          )}

          {props.from === "Edit" && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => props.onChange(props.type + "_" + props.ID)}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: 125,
    height: 175,
  },
  buttonContainer: {
    width: 125,
    height: 150,
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    width: 125,
    height: 75,
    fontSize: 16,
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
