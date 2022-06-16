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

  return (
    <View>
      <Menu
        selectedContent={props.content}
        type={"Food1"}
        onChange={props.updateBasket}
      />
      <Menu
        selectedContent={props.content}
        type={"Food2"}
        onChange={props.updateBasket}
      />
      <Menu
        selectedContent={props.content}
        type={"FoodSet"}
        onChange={props.updateBasket}
      />
      <Order selectedContent={props.content} chef={false} orders={orders} />
      <History selectedContent={props.content} history={history} api={api} />
    </View>
  );
}
