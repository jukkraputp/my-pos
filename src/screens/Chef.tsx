import {
  View,
  Text,
  Button,
  TouchableOpacity,
  GestureResponderEvent,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Order from "../components/Content/Order/Order";
import { order } from "interface";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import API from "../apis/API";
import Theme from "../constants/Theme";

interface props {
  setAuth: Function;
}

export default function Chef(props: props) {
  const [orders, setOrders] = useState<Array<order>>([]);

  const api = new API();

  const onLogout = (event: GestureResponderEvent) => {
    console.log(event.target);
    api.logout();
    props.setAuth(null);
  };

  useEffect(() => {
    const listenOrder = onSnapshot(collection(db, "Order"), (snapShot) => {
      var temp: Array<order> = [];
      snapShot.docs.forEach((doc) => {
        const data: any = doc.data();
        temp.push({ ...data, docID: doc.id });
      });
      setOrders(temp);
    });
    console.log(
      Dimensions.get("window").height - Dimensions.get("screen").height
    );
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Order selectedContent="Order" orders={orders} chef={true} />
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: Theme.COLORS.ERROR,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={onLogout}
        >
          <Image
            source={require("../assets/icons/logout-icon.png")}
            style={{ width: 25, height: 25, margin: 10 }}
          />
          <Text
            style={{
              color: Theme.COLORS.BLACK,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
