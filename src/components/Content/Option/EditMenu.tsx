import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Theme from "../../../constants/Theme";
import { menuList } from "interface";
import ContentList from "../ContentList";

interface props {
  menuList: menuList;
}

export default function EditMenu(props: props) {
  const devTools = async () => {
    console.log(props.menuList);
  };

  return (
    <View style={styles.contentContainerView}>
      {Object.keys(props.menuList).map((section) => {
        return (
          <ContentList
            itemList={props.menuList[section]}
            from={"Edit"}
            type={section}
            onChange={() => {}}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerView: {
    backgroundColor: "grey",
  },
  saveButton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: Theme.COLORS.SUCCESS,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "95%",
    top: "82.5%",
  },
  textButton: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
