import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Menu from "./Content/Menu/Menu";
import Order from "./Content/Order/Order";
import History from "./Content/History/History";
import { collection, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { order, menuList } from "interface";
import API from "../apis/API";
import Option from "./Content/Option/Option";
import { Unsubscribe } from "firebase/firestore";

interface props {
  content: string;
  updateBasket: Function;
  toggleOrder: Function;
  renderComplete: Function;
  setAuth: Function;
  menuList: menuList;
  setMenuList: Function;
  setEdit: Function;
}

export default function ContentStage(props: props) {
  const [orders, setOrders] = useState<Array<order>>([]);
  const [history, setHistory] = useState<Array<order>>([]);
  const [isEditiing, setIsEditting] = useState(false);
  const api = new API();

  const logout = () => {
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

    const listenHistory = onSnapshot(collection(db, "History"), (snapShot) => {
      var temp: Array<order> = [];
      snapShot.docs.forEach((doc) => {
        const data: any = doc.data();
        temp.push(data);
      });
      setHistory(temp);
    });

    return () => {
      listenOrder();
      listenHistory();
    };
  }, []);

  useEffect(() => {
    if (props.content !== "Option" && isEditiing) props.setMenuList();
  }, [props.content]);

  useEffect(() => {
    if (isEditiing) {
      props.setEdit();
      setIsEditting(false);
    }
  }, [isEditiing]);

  useEffect(() => {
    console.log(props.menuList);
  }, [props.menuList]);

  return (
    <View>
      <Menu
        selectedContent={props.content}
        type={"Food1"}
        onChange={props.updateBasket}
        renderComplete={props.renderComplete}
        menu={props.menuList["Food1"]}
      />
      <Menu
        selectedContent={props.content}
        type={"Food2"}
        onChange={props.updateBasket}
        renderComplete={props.renderComplete}
        menu={props.menuList["Food2"]}
      />
      <Menu
        selectedContent={props.content}
        type={"FoodSet"}
        onChange={props.updateBasket}
        renderComplete={props.renderComplete}
        menu={props.menuList["FoodSet"]}
      />
      <Order
        selectedContent={props.content}
        chef={false}
        orders={orders}
        renderComplete={props.renderComplete}
      />
      <History
        selectedContent={props.content}
        history={history}
        renderComplete={props.renderComplete}
      />
      {Object.keys(props.menuList).length > 0 && (
        <Option
          selectedContent={props.content}
          renderComplete={props.renderComplete}
          logout={logout}
          menuList={props.menuList}
          setIsEditting={setIsEditting}
        />
      )}
    </View>
  );
}
