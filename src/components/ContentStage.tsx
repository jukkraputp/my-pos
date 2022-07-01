import { Text, View } from "react-native";
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
  menuTypeList: string[];
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const debug = false;

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

  return debug ? (
    <View>
      {Object.keys(props.menuList).map((type) => {
        return (
          <View key={type}>
            <Text>{type}</Text>
            {Object.keys(props.menuList[type]).map((key) => {
              const item = props.menuList[type][key];
              return (
                <Text key={item.name}>
                  {item.name} {item.price}
                </Text>
              );
            })}
          </View>
        );
      })}
      {orders.map((order) => {
        return (
          <View key={String(order.date)}>
            <Text>{order.date}</Text>
            {Object.keys(order.foods).map((food) => {
              return <Text key={food}>{food}</Text>;
            })}
          </View>
        );
      })}
      {history.map((order) => {
        return (
          <View key={String(order.date)}>
            <Text>{order.date}</Text>
            {Object.keys(order.foods).map((food) => {
              return <Text key={food}>{food}</Text>;
            })}
          </View>
        );
      })}
    </View>
  ) : (
    <View>
      {props.menuTypeList.map((type) => {
        return (
          <Menu
            selectedContent={props.content}
            type={type}
            onChange={props.updateBasket}
            renderComplete={props.renderComplete}
            menu={props.menuList[type]}
            key={"menu_" + type}
          />
        );
      })}
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
