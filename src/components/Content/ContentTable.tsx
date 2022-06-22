import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { order } from "interface";
import ContentRow from "./ContentRow";

interface props {
  childrenFnc: Function;
  allImages: { [key: string]: string };
  orders: Array<order>;
  from: string;
}

export default function ContentTable(props: props) {
  const orders = props.orders;
  const allImages = props.allImages;

  const renderTable = async (orders: Array<order>) => {
    const tableJSX = orders
      .sort((a: any, b: any) => a.date - b.date)
      .map(async (order) => {
        var menu: Array<string> = [];
        var ids: { [key: string]: string } = {};
        var amounts: { [key: string]: number } = {};
        Object.keys(order.foods)
          .sort()
          .forEach((food) => {
            const index1 = food.split("_")[0];
            const index2 = food.split("_")[1];
            const key = index1 + "_" + index1 + "-" + index2;
            const image = allImages[key];
            ids[image] = food;
            amounts[image] = order.foods[food];
            menu.push(image);
          });
        var jsx = [
          <View
            style={{ marginTop: 5 }}
            key={order.date + "_" + props.from + "_header"}
          >
            <Text>{"Order ID: " + order.date}</Text>
          </View>,
        ];
        var start = 0;
        const perRow = 4;
        for (let index = perRow; index < menu.length; index += perRow) {
          const data = menu.slice(start, index);
          const flexNumber = 0;
          const jsxRow = await ContentRow({
            data,
            ids,
            flexNumber,
            amounts,
            from: props.from,
            date: order.date,
          });
          jsx.push(jsxRow);
          start = index;
        }
        const data = menu.slice(start);
        const flexNumber = perRow - (menu.length - start);
        const jsxLastRow = await ContentRow({
          data,
          ids,
          flexNumber,
          amounts,
          from: props.from,
          date: order.date,
        });
        jsx.push(jsxLastRow);
        const row = [
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "lightgrey",
              borderWidth: 0.5,
            }}
            key={order.date + "_" + props.from + "_row"}
          >
            <View style={{ flex: 4 }}>{jsx}</View>
            <View
              style={{
                width: 5,
                backgroundColor: "black",
                height: "99.75%",
                borderWidth: 2,
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
              {props.childrenFnc(order)}
            </View>
          </View>,
        ];
        return row;
      });
    return await Promise.all(tableJSX);
  };

  return orders.length === 0 ? [] : renderTable(orders);
}
