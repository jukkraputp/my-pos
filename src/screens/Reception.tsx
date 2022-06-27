import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import API from "../apis/API";
import Navbar from "../components/Navbar";
import ContentStage from "../components/ContentStage";
import Basket from "../components/Basket";
import MyModal from "../components/MyModal";
import { db } from "../config/firebase";
import { addDoc, collection, Firestore } from "firebase/firestore";
import LottieView from "lottie-react-native";
import { menuList } from "interface";

interface props {
  setAuth: Function;
}

interface state {
  content: string;
  basket: {};
  confirmingOrder: boolean;
  renderFinish: boolean;
  menuList: menuList;
}

export default class Reception extends React.Component<props, state> {
  navbarList: Array<string>;
  showCurrent: Boolean;
  API: API;
  renderCompleted: number;

  constructor(props: props) {
    super(props);
    this.state = {
      content: "History",
      basket: {},
      confirmingOrder: false,
      renderFinish: false,
      menuList: {},
    };
    this.navbarList = [
      "Food1",
      "Food2",
      "FoodSet",
      "Order",
      "History",
      "Option",
    ];
    this.renderCompleted = 0;
    this.showCurrent =
      this.state.content !== "Order" &&
      this.state.content !== "History" &&
      this.state.content !== "Option";
    this.API = new API();

    this.setMenu();
  }

  setMenu = async () => {
    const menu = await this.API.getMenu();
    this.setState({ menuList: menu });
  };

  setEdit = () => {
    this.API.saveData().then(() => this.setMenu());
  };

  renderComplete = (point: number = 1) => {
    this.renderCompleted += point;
    if (this.renderCompleted === this.navbarList.length - 2)
      this.setState({ renderFinish: true });
    console.log(this.renderCompleted);
  };

  toggleOrder = () => {};

  changeContent = (contentName: string) => {
    contentName === "Order" ||
    contentName === "History" ||
    contentName === "Option"
      ? (this.showCurrent = false)
      : (this.showCurrent = true);
    this.setState({ content: contentName });
  };

  updateBasket = (ID: string, sign: string) => {
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

  // add new order
  setModalVisible = async (visible: boolean, isConfirm = false) => {
    if (isConfirm) {
      const order = this.state.basket;
      const totalAmount = this.API.getTotalAmount(order, this.state.menuList);
      console.log(order, totalAmount);
      await addDoc(collection(db, "Order"), {
        foods: order,
        totalAmount: totalAmount,
        date: new Date().getTime(),
        isFinished: true,
      });
      this.setState({ confirmingOrder: false, basket: {} });
    } else {
      this.setState({ confirmingOrder: visible });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, maxHeight: Dimensions.get("screen").height }}>
        <View
          style={{
            flex: 10.01,
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <View style={{ flex: 1, maxHeight: Dimensions.get("screen").height }}>
            <Navbar
              navbarList={this.navbarList}
              onChange={this.changeContent}
              content={this.state.content}
            />
          </View>

          <View
            style={{
              flex: this.showCurrent ? 4 : 6,
              paddingTop: StatusBar.currentHeight,
            }}
          >
            {Platform.OS !== "web" ? (
              <LottieView
                source={require("../assets/animation/colors-circle-loader.json")}
                style={[
                  {
                    width: 450,
                    height: 450,
                    alignSelf: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  },
                  this.state.renderFinish
                    ? { display: "none" }
                    : { display: "flex" },
                ]}
                autoPlay
              />
            ) : null}
            <ScrollView
              style={[
                styles.scrollView,
                this.state.renderFinish
                  ? { display: "flex" }
                  : { display: "none" },
              ]}
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={true}
              renderToHardwareTextureAndroid={true}
            >
              <ContentStage
                content={this.state.content}
                updateBasket={this.updateBasket}
                toggleOrder={this.toggleOrder}
                renderComplete={this.renderComplete}
                setAuth={this.props.setAuth}
                menuList={this.state.menuList}
                setMenuList={this.setMenu}
                setEdit={this.setEdit}
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
                menuList={this.state.menuList}
              />
            </View>
          )}
        </View>

        {this.state.confirmingOrder && (
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
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
              menuList={this.state.menuList}
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
    marginHorizontal: 5,
  },
  text: {
    fontSize: 42,
  },
});
