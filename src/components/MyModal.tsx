import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
import React from "react";
import BasketContent from "./Basket/BasketContent";
import API from "../apis/API";
import { menuList } from "interface";

interface props {
  mode: any;
  modalVisible: boolean;
  setModalVisible: Function;
  title: string;
  items: { [key: string]: any };
  animation: any;
  children?: React.ReactNode | React.ReactNode[];
  buttonVisible?: boolean;
  styles?: {};
  menuList: menuList;
}

export default function MyModal(props: props) {
  const api = new API();
  const modalVisible = props.modalVisible;
  const mode = props.mode;

  const buttonVisible =
    props.buttonVisible !== undefined ? props.buttonVisible : true;

  const setModalVisible = (visible: boolean, isConfirm = false) => {
    props.setModalVisible(visible, isConfirm);
  };

  const renderModalContent = (mode: any) => {
    switch (mode) {
      case undefined:
        return (
          <View style={[styles.modalView, props.styles]}>
            <Pressable
              style={{
                width: 20,
                height: 20,
                position: "absolute",
                top: "5%",
                left: "110%",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../assets/icons/close-sign.svg")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </Pressable>
            <Text style={styles.modalText}>{props.title}</Text>
            {props.children}
            {buttonVisible && (
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.setModalVisible(!modalVisible, true)}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            )}
          </View>
        );

      case "confirm order":
        return (
          <View style={styles.modalView}>
            <Pressable
              style={{
                width: 20,
                height: 20,
                left: "55%",
                bottom: "5%",
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Image
                source={require("../assets/icons/close-sign.svg")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </Pressable>
            <Text style={styles.modalText}> Order </Text>
            <BasketContent
              updateBasket={() => {}}
              items={props.items}
              inBasket={false}
              menuList={props.menuList}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {api.getTotalAmount(props.items, props.menuList)} บาท
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible, true)}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        );
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={props.animation}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>{renderModalContent(mode)}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: "center",
    position: "absolute",
    marginVertical: "5%",
  },
  modalView: {
    maxWidth: 500,
    width: 300,
    /* margin: 20, */
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
