import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Menu from "./Content/Menu/Menu";
import Order from "./Content/Order/Order";
import History from "./Content/History/History";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../apis/firebase";
import { order } from "interface";
import API from "src/apis/API";

interface props {
  content: string;
  updateBasket: Function;
  toggleOrder: Function;
  api: API;
}

export default function ContentStage(props: props) {
  const [orders, setOrders] = useState<Array<order>>([]);
  const [history, setHistory] = useState<Array<order>>([]);

  const api = props.api;

  useEffect(() => {
    const listenOrder = onSnapshot(collection(db, "Order"), (snapShot) => {
      var temp: Array<order> = [];
      snapShot.docs.forEach((doc) => {
        const data: any = doc.data();
        temp.push({ ...data, docID: doc.id });
      });
      setOrders(temp);
    });
    const listenHistory = onSnapshot(collection(db, "History"), (snapShot) => {
      var temp: Array<order> = [];
      snapShot.docs.forEach((doc) => {
        const data: any = doc.data();
        temp.push(data);
      });
      setHistory(temp);
    });
  }, []);

  switch (props.content) {
    case "Food1":
    case "Food2":
    case "FoodSet":
      return (
        <View>
          <Menu type={props.content} onChange={props.updateBasket} api={api} />
        </View>
      );
    case "Order":
      return (
        <View>
          <Order chef={false} orders={orders} api={api} />
        </View>
      );
    case "History":
      return (
        <View>
          <History history={history} api={api} />
        </View>
      );
    default:
      return (
        <View>
          <Text>MenuType: no props</Text>
        </View>
      );
  }
}
