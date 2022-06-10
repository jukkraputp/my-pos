import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import API from "../apis/API";
import Navbar from "../components/Navbar";
import ContentStage from "../components/ContentStage";
import Basket from "../components/Basket";
import MyModal from "../components/MyModal";
import { getAuth } from "firebase/auth";
import { db, auth } from "../apis/firebase";
import { addDoc, collection } from "firebase/firestore";

interface props {}

interface state {
  content: string;
  basket: {};
  confirmingOrder: boolean;
}

export default class Reception extends React.Component<props, state> {
  navbarList: Array<string>;
  showCurrent: Boolean;
  API: API;

  constructor(props: props) {
    super(props);
    this.state = {
      content: "Food1",
      basket: {},
      confirmingOrder: false,
    };
    this.navbarList = [
      "Food1",
      "Food2",
      "FoodSet",
      "Order",
      "History",
      "Logout",
    ];
    this.showCurrent =
      this.state.content !== "Order" && this.state.content !== "History";
    this.API = new API();
  }

  toggleOrder = () => {};

  changeContent = (contentName: string) => {
    if (contentName === "Logout") {
      auth.signOut();
      return;
    }
    contentName === "Order" || contentName === "History"
      ? (this.showCurrent = false)
      : (this.showCurrent = true);
    this.setState({ content: contentName });
  };

  updateBasket = (ID: string, sign = "+") => {
    var obj: { [key: string]: number } = this.state.basket;
    if (ID in this.state.basket) {
      if (sign === "+") {
        obj[ID] += 1;
      } else {
        obj[ID] -= 1;
        if (obj[ID] === 0) {
          delete obj[ID];
        }
      }
    } else {
      obj[ID] = 1;
    }
    this.setState({ basket: obj });
  };

  clearBasket = () => {
    this.setState({ basket: {} });
  };

  confirmOrder = () => {
    if (Object.keys(this.state.basket).length !== 0) {
      this.setState({ confirmingOrder: true });
    }
  };

  setModalVisible = async (visible: boolean, isConfirm = false) => {
    if (isConfirm) {
      const order = this.state.basket;
      const totalAmount = this.API.getTotalAmount(order);
      console.log(order, totalAmount);
      await addDoc(collection(db, "Order"), {
        foods: order,
        totalAmount: totalAmount,
        date: Date.now(),
        isFinished: false,
      });
      this.setState({ confirmingOrder: false, basket: {} });
    } else {
      this.setState({ confirmingOrder: visible });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, maxHeight: Dimensions.get("window").height }}>
        <View
          style={{
            flex: 10.01,
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <View style={{ flex: 2 }}>
            <Navbar
              navbarList={this.navbarList}
              onChange={this.changeContent}
              content={this.state.content}
            />
          </View>

          <View
            style={{
              flex: this.showCurrent ? 5 : 7,
              paddingTop: StatusBar.currentHeight,
            }}
          >
            <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={true}
              renderToHardwareTextureAndroid={true}
            >
              <ContentStage
                content={this.state.content}
                updateBasket={this.updateBasket}
                toggleOrder={this.toggleOrder}
              />
            </ScrollView>
          </View>

          <View style={{ flex: 0.01, backgroundColor: "black" }} />

          {this.showCurrent && (
            <View style={{ flex: 2, backgroundColor: "white" }}>
              <Basket
                basket={this.state.basket}
                updateBasket={this.updateBasket}
                confirmOrder={this.confirmOrder}
                clearBasket={this.clearBasket}
              />
            </View>
          )}
        </View>

        {this.state.confirmingOrder && (
          <View
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              backgroundColor: "rgba(52, 52, 52, 0.8)",
              position: "absolute",
            }}
          >
            <MyModal
              modalVisible={this.state.confirmingOrder}
              setModalVisible={this.setModalVisible}
              animation={"fade"}
              items={this.state.basket}
              mode={"confirm order"}
              title={""}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4.5,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
