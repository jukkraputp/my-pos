import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../../apis/API";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../apis/firebase";
import Theme from "../../../constants/Theme";
import { order } from "interface";
import ContentTable from "../ContentTable";

interface props {
  selectedContent: string;
  orders: Array<order>;
  chef: boolean;
  renderComplete: Function;
}

export default function Order(props: props) {
  const [orders, setOrders] = useState<Array<order>>([]);
  const [allImages, setAllImages] = useState<{ [key: string]: string }>({});
  const [jsxElements, setJSXElements] = useState<JSX.Element[][]>([]);
  const [renderCompleted, setRenderCompeted] = useState(false);

  const api = new API();

  useEffect(() => {
    api.getImages().then((urls) => {
      var images: { [key: string]: string } = {};
      urls.map((url) => {
        const key = String(url.split("::").at(0));
        const uri = url.split("::").at(1);
        images[key] = String(uri);
      });
      setAllImages(images);
    });
  }, []);

  useEffect(() => {
    if (!!props.orders) setOrders(props.orders);
  }, [props.orders]);

  const renderOrderOptions = (order: order) => {
    const onClickHandler = async (savedOrder: order) => {
      if (props.chef) {
        await updateDoc(doc(db, "Order", savedOrder.docID), {
          isFinished: true,
        });
      } else {
        await addDoc(collection(db, "History"), savedOrder);
        await deleteDoc(doc(db, "Order", savedOrder.docID));
      }
    };

    var jsx = [];
    jsx.push(
      <Text style={{ flex: 1 }} key={order.date + "order_totalAmount"}>
        ราคารวม {order.totalAmount} บาท
      </Text>
    );
    jsx.push(
      <Text style={{ flex: 1 }} key={order.date + "order_Status"}>
        Status: {order.isFinished ? "Ready" : "Waiting"}
      </Text>
    );
    jsx.push(
      <View
        style={{
          flex: 8,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        key={String(order.date)}
      >
        <TouchableOpacity
          style={{
            width: "50%",
            height: 50,
            backgroundColor: props.chef
              ? order.isFinished
                ? Theme.COLORS.SWITCH_OFF
                : Theme.COLORS.SWITCH_ON
              : order.isFinished
              ? Theme.COLORS.SWITCH_ON
              : Theme.COLORS.SWITCH_OFF,
            justifyContent: "center",
          }}
          onPress={() => onClickHandler(order)}
          disabled={props.chef ? order.isFinished : !order.isFinished}
        >
          {order.isFinished && !props.chef && (
            <Text
              style={{
                textAlign: "center",
                color: Theme.COLORS.BLACK,
                marginBottom: 5,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Done!
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
    return jsx;
  };

  const setJSX = async () => {
    const childrenFnc = renderOrderOptions;
    const jsx = await ContentTable({
      childrenFnc,
      allImages,
      orders: orders,
      from: "Order",
    });
    setJSXElements(jsx);
  };

  useEffect(() => {
    if (Object.keys(allImages).length !== 0 && orders.length !== 0) setJSX();
  }, [orders, allImages]);

  useEffect(() => {
    if (jsxElements.length !== 0 && !renderCompleted) {
      setRenderCompeted(true);
      props.renderComplete();
    }
  }, [jsxElements]);

  return orders.length !== 0 ? (
    <ScrollView
      style={[
        {
          backgroundColor: "white",
        },
        props.selectedContent === "Order"
          ? { display: "flex" }
          : { display: "none" },
      ]}
      showsHorizontalScrollIndicator={false}
    >
      {jsxElements}
    </ScrollView>
  ) : null;
}
