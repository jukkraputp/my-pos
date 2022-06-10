import { View, Text, StyleSheet, Modal, Pressable, Alert } from "react-native";
import React from "react";
import BasketContent from "./Basket/BasketContent";
import API from "../apis/API";

interface props {
  mode: any;
  modalVisible: boolean;
  setModalVisible: Function;
  title: string;
  items: { [key: string]: any };
  animation: any;
  children?: React.ReactNode | React.ReactNode[];
}

const api = new API();

export default function MyModal(props: props) {
  const modalVisible = props.modalVisible;
  const mode = props.mode;

  const setModalVisible = (visible: boolean, isConfirm = false) => {
    props.setModalVisible(visible, isConfirm);
  };

  const renderModalContent = (mode: any) => {
    switch (mode) {
      case undefined:
        return (
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.title}</Text>
            {props.children}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        );

      case "confirm order":
        return (
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Order </Text>
            <BasketContent
              updateBasket={() => {}}
              items={props.items}
              inBasket={false}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {api.getTotalAmount(props.items)} บาท
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
          Alert.alert("Modal has been closed.");
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
    margin: 20,
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
