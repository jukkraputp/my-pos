import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../../apis/API";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../apis/firebase";
import ContentCard from "../ContentCard";
import Filter from "./Filter";
import { order } from "interface";

interface props {
  history: order[];
}

export default function History(props: props) {
  const [orders, setOrders] = useState(props.history);

  const api = new API();
  const type = "Order";
  const allImages = api.getAllImages();

  useEffect(() => {
    setOrders(props.history);
  }, [props.history]);

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
      >
        {data.map((image, idx) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
              key={"History_" + ids[image] + "_" + idx}
            >
              <ContentCard
                name={api.getName(ids[image])}
                image={image}
                ID={ids[image]}
                price={api.getPrice(ids[image])}
                type={ids[image]}
                onChange={() => {}}
                key={ids[image]}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  alignSelf: "center",
                  marginBottom: "25%",
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

  const renderTable = (orders: order[]) => {
    console.log(orders);
    var JSX: any[] = [];
    var startLine = false;
    orders
      .sort((a, b) => b.date - a.date)
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
            <View style={{ marginTop: 5 }} key={obj.date}>
              <Text>{"Order ID: " + obj.date}</Text>
            </View>,
          ],
        ];
        startLine
          ? JSX.push(
              <View
                style={{
                  height: 5,
                  backgroundColor: "black",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 2.5,
                    backgroundColor: "white",
                    alignContent: "stretch",
                  }}
                />
              </View>
            )
          : (startLine = true);
        var start = 0;
        const perRow = 5;
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
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 9 }}>{jsx}</View>
            <View style={{ flex: 0.01, backgroundColor: "black" }}></View>
            <View style={{ flex: 1 }}>
              <Text>ราคารวม {"\n" + obj.totalAmount} บาท</Text>
            </View>
          </View>
        );
        JSX.push(row);
      });
    return JSX;
  };

  return orders.length !== 0 ? (
    <View style={{ maxHeight: Dimensions.get("window").height }}>
      <Filter />
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View>{renderTable(orders)}</View>
      </ScrollView>
    </View>
  ) : (
    <></>
  );
}
