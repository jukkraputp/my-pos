import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import Theme from "../../../constants/Theme";
import { menuList } from "interface";
import ContentList from "../ContentList";
import NavbarName from "../../../constants/NavbarName";

interface props {
  menuList: menuList;
}

export default function EditMenu(props: props) {
  const editMenu = (menuID: string) => {
    console.log(menuID);
  };

  const addNewMenu = () => {
    console.log("add new menu");
  };

  return (
    <View style={styles.contentContainerView}>
      {Object.keys(props.menuList)
        .sort()
        .map((section) => {
          return (
            <ContentList
              itemList={props.menuList[section]}
              from={"Edit"}
              type={section}
              editMenu={(ID: string) => editMenu(ID)}
              addNewMenu={addNewMenu}
              key={section}
            >
              <View style={styles.headerContainer}>
                <Text
                  style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {NavbarName[section]}
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={addNewMenu}
                >
                  <Image
                    style={styles.imageAddButton}
                    source={require("../../../assets/images/Sign/plus-sign.png")}
                  />
                </TouchableOpacity>
              </View>
            </ContentList>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 250,
    height: 75,
    alignSelf: "center",
  },
  editButton: {
    width: 50,
    height: 50,
    /* borderRadius: 50, */
    /* backgroundColor: Theme.COLORS.SUCCESS, */
    justifyContent: "center",
    alignItems: "center",
  },
  imageAddButton: {
    width: 50,
    height: 50,
  },
});
