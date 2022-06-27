import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Menu from "./Content/Menu/Menu";
import Order from "./Content/Order/Order";
import History from "./Content/History/History";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  Query,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { order, menuList } from "interface";
import Option from "./Content/Option/Option";

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

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export default function ContentStage(props: props) {
  const [orders, setOrders] = useState<Array<order>>([]);
  const [history, setHistory] = useState<Array<order>>([]);
  const [isEditiing, setIsEditting] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

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

    return () => {
      listenOrder();
    };
  }, []);

  useEffect(() => {
    const histRef = collection(db, "History");
    const q = query(
      histRef,
      where("date", ">=", new Date(startDate.setHours(0, 0, 0, 0)).getTime()),
      where("date", "<=", new Date(endDate.setHours(0, 0, 0, 0)).getTime())
    );

    const setHistoryData = async (query: Query) => {
      const querySnapshot = await getDocs(query);
      var temp: Array<order> = [];
      querySnapshot.docs.forEach((doc) => {
        const data: any = doc.data();
        temp.push(data);
      });
      setHistory(temp);
    };
    setHistoryData(q);
  }, [orders, startDate, endDate]);

  useEffect(() => {
    if (props.content !== "Option" && isEditiing) props.setMenuList();
  }, [props.content]);

  useEffect(() => {
    if (isEditiing) {
      props.setEdit();
      setIsEditting(false);
    }
  }, [isEditiing]);

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
        menuList={props.menuList}
        selectedContent={props.content}
        chef={false}
        orders={orders}
        renderComplete={props.renderComplete}
      />
      <History
        menuList={props.menuList}
        selectedContent={props.content}
        history={history}
        renderComplete={props.renderComplete}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
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
