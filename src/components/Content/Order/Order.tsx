import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../../apis/API";
import ContentCard from "../ContentCard";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../apis/firebase";
import Theme from "../../../constants/Theme";
import { order } from "interface";

interface props {
  orders: Array<order>;
  chef: boolean;
  api: API;
}

export default function Order(props: props) {
  const [orders, setOrders] = useState<Array<order>>([]);

  const api = props.api;
  const allImages = api.allImages;

  useEffect(() => {
    if (!!props.orders) setOrders(props.orders);
  }, [props.orders]);

  const renderRow = (
    data: any[],
    ids: { [key: string]: string },
    flexNumber: number,
    amounts: { [key: string]: number }
  ) => {
    return (
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          marginTop: 5,
          justifyContent: "flex-start",
        }}
        key={data[0] + "order_renderRow"}
      >
        {data.map((image, idx) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 10,
              }}
              key={ids[image] + "order_renderRow_card"}
            >
              <ContentCard
                name={api.getName(ids[image])}
                image={image}
                ID={ids[image]}
                price={api.getPrice(ids[image])}
                type={ids[image]}
                onChange={() => {}}
                key={ids[image]}
                from={"Order"}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  alignSelf: "center",
                  marginBottom: "30%",
                }}
              >
                {"x"} {amounts[image]}
              </Text>
            </View>
          );
        })}
        <View style={{ flex: flexNumber }} />
      </View>
    );
  };

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
        key={order.date}
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

  const renderTable = (orders: Array<order>) => {
    var JSX: any[] = [];
    var startLine = false;
    orders
      .sort((a: any, b: any) => a.date - b.date)
      .map((obj) => {
        var menu: Array<string> = [];
        var ids: { [key: string]: string } = {};
        var amounts: { [key: string]: number } = {};
        var row: JSX.Element[] = [];
        Object.keys(obj.foods)
          .sort()
          .map((food) => {
            var image: any;
            const index = food.split("_")[0] + "_Images";
            switch (index) {
              case "Food1_Images":
                image = allImages.Food1_Images[Number(food.split("_")[1])];
                break;
              case "Food2_Images":
                image = allImages.Food2_Images[Number(food.split("_")[1])];
              case "Food3_Images":
                image = allImages.FoodSet_Images[Number(food.split("_")[1])];
            }
            ids[image] = food;
            amounts[image] = obj.foods[food];
            menu.push(image);
          });
        var jsx = [
          [
            <View style={{ marginTop: 5 }} key={obj.date + "order_header"}>
              <Text>{"Order ID: " + obj.date}</Text>
            </View>,
          ],
        ];
        startLine
          ? JSX.push(
              <View
                style={{
                  height: 5,
                  alignItems: "center",
                }}
                key={obj.date + "order_startLine"}
              >
                <View
                  style={{
                    height: 2.5,
                    alignContent: "stretch",
                  }}
                />
              </View>
            )
          : (startLine = true);
        var start = 0;
        const perRow = 4;
        var countRow = 0;
        for (let index = perRow; index < menu.length; index += perRow) {
          jsx.push([renderRow(menu.slice(start, index), ids, 0, amounts)]);
          start = index;
          countRow++;
        }
        jsx.push([
          renderRow(
            menu.slice(start),
            ids,
            perRow - (menu.length - start),
            amounts
          ),
        ]);
        countRow++;
        row.push(
          <View
            style={{ flexDirection: "row", backgroundColor: "lightgrey" }}
            key={obj.date + "order_row"}
          >
            <View style={{ flex: 4 }}>{jsx}</View>
            <View
              style={{
                width: 5,
                backgroundColor: "black",
                height: "100%",
                borderWidth: 2.5,
                borderColor: "white",
                marginTop: 0,
                alignSelf: "center",
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {renderOrderOptions(obj)}
            </View>
          </View>
        );
        JSX.push(row);
      });
    return JSX;
  };

  return orders.length !== 0 ? (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {renderTable(orders)}
    </ScrollView>
  ) : null;
}
