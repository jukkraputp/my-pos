import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Theme from "../../../constants/Theme";
import { menuList } from "interface";
import ContentList from "../ContentList";
import NavbarName from "../../../constants/NavbarName";
import MyModal from "../../MyModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from "react-native-image-picker";
import API from "../../../apis/API";

interface props {
  menuList: menuList;
  setIsEditting: Function;
}

export default function EditMenu(props: props) {
  const [state, setState] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<{
    ID: string;
    name: string;
    price: string;
    image: string;
  }>({ ID: "", name: "", price: "", image: "" });
  const [currentType, setCurrentType] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [keyboardDidShow, setKeyboardDidShow] = useState(false);

  const priceInputBox = useRef<TextInput>(null);

  const api = new API();

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );

    return () => {
      showSubscription.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardDidShow(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardDidShow(false);
  };

  const addNewMenu = () => {};

  const editMenu = (menuID: string) => {
    const type = String(menuID.split("_")[0]);
    const ID = String(menuID.split("_")[1]);
    const name = props.menuList[type][ID].name;
    const price = props.menuList[type][ID].price;
    const image = props.menuList[type][ID].image;
    const item: {
      ID: string;
      name: string;
      price: string;
      image: string;
    } = {
      ID: menuID,
      name: String(name),
      price: String(price),
      image: String(image),
    };
    setCurrentItem(item);
    setState("editMenu");
  };

  useEffect(() => {
    console.log(currentItem);
  }, [currentItem]);

  const saveEditMenu = (needSave: boolean = true) => {
    if (!needSave) setState("");
    else {
      var name = nameInput;
      var price = priceInput;
      if (name === "") name = currentItem.name;
      if (price === "" || isNaN(Number(price))) price = currentItem.price;
      api.editMenu(currentItem.ID, { name: name, price: price });
      setCurrentItem({
        ID: currentItem.ID,
        name: name,
        price: price,
        image: currentItem.image,
      });
      setState("");
      props.setIsEditting(true);
    }
  };

  const saveNewMenu = (type: string) => {
    var name = nameInput;
    var price = priceInput;
    if (name === "") name = currentItem.name;
    if (price === "") price = currentItem.price;
    console.log("save new menu", name, price, type);
    api.addNewMenu(type, name, Number(price));
    setCurrentItem({
      ID: currentItem.ID,
      name: name,
      price: price,
      image: currentItem.image,
    });
    setState("");
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
                {/* <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setState("addNewMenu");
                    setCurrentType(section);
                  }}
                >
                  <Image
                    style={styles.imageAddButton}
                    source={require("../../../assets/images/Sign/plus-sign.svg")}
                    resizeMethod="resize"
                  />
                </TouchableOpacity> */}
              </View>
            </ContentList>
          );
        })}
      {state === "addNewMenu" && (
        <MyModal
          mode={undefined}
          modalVisible={true}
          setModalVisible={() => saveNewMenu(currentType)}
          title={"Add new menu"}
          items={{}}
          animation={undefined}
          styles={[
            styles.modalContainerView,
            keyboardDidShow ? { marginTop: "0%" } : { marginTop: "10%" },
          ]}
          menuList={props.menuList}
        >
          <KeyboardAvoidingView
            behavior="height"
            style={[styles.modalContentContainer, { flexDirection: "column" }]}
          >
            <TextInput
              style={styles.addMenuFormTextInput}
              placeholder={"Name"}
              onChangeText={(text) => setNameInput(text)}
              onSubmitEditing={() => {
                priceInputBox.current?.focus();
              }}
            />
            <TextInput
              style={styles.addMenuFormTextInput}
              ref={priceInputBox}
              placeholder={"Price"}
              keyboardType={"phone-pad"}
              onChangeText={(text) => setPriceInput(text)}
              onSubmitEditing={() => saveEditMenu()}
            />
          </KeyboardAvoidingView>
        </MyModal>
      )}
      {state === "editMenu" && (
        <MyModal
          mode={undefined}
          modalVisible={true}
          setModalVisible={saveEditMenu}
          title={"Edit menu"}
          items={{}}
          animation={undefined}
          styles={[
            styles.modalContainerView,
            keyboardDidShow
              ? { marginTop: "0%", bottom: 100 }
              : { marginTop: "10%", bottom: 0 },
          ]}
          menuList={props.menuList}
        >
          <KeyboardAvoidingView
            behavior="height"
            style={styles.modalContentContainer}
          >
            <Image
              style={styles.modalImage}
              source={{ uri: currentItem.image }}
              resizeMethod="resize"
            />
            <View
              style={{
                width: "55%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Name</Text>
              <TextInput
                style={[styles.textInput]}
                placeholder={currentItem.name}
                onChangeText={(text) => setNameInput(text)}
                onSubmitEditing={() => {
                  priceInputBox.current?.focus();
                }}
              />
            </View>
            <View style={{ width: "10%" }}>
              <Text>Price</Text>
              <TextInput
                style={[styles.textInput]}
                ref={priceInputBox}
                placeholder={currentItem.price}
                keyboardType={"phone-pad"}
                onChangeText={(text) => setPriceInput(text)}
                onSubmitEditing={() => saveEditMenu()}
              />
            </View>
          </KeyboardAvoidingView>
        </MyModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerView: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
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
    width: "90%",
    height: 75,
    alignSelf: "center",
  },
  editButton: {
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: Theme.COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  imageAddButton: {
    width: 50,
    height: 50,
  },
  modalContainerView: {
    width: 400,
  },
  modalContentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  modalImageContainer: {
    width: 100,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
  },
  addMenuFormTextInput: {
    width: "80%",
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    zIndex: 25,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
