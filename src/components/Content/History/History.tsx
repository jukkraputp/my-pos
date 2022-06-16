import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../../apis/API";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../apis/firebase";
import ContentCard from "../ContentCard";
import Filter from "./Filter";
import { order } from "interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface props {
  selectedContent: string;
  history: order[];
}

export default function History(props: props) {
  const [orders, setOrders] = useState(props.history);
  const [allImages, setAllImages] = useState<{ [key: string]: string }>({});

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
        key={"History_Row_" + data[0]}
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
                from={"History"}
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
            const index1 = food.split("_")[0];
            const index2 = food.split("_")[1];
            const key = index1 + "_" + index1 + "-" + index2;
            const image: string = String(allImages[key]);
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
                key={"History_Start_Line"}
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
          <View
            style={{ flexDirection: "row" }}
            key={"History_Option_" + obj.date}
          >
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
    <View
      style={[
        { maxHeight: Dimensions.get("window").height },
        props.selectedContent === "History"
          ? { display: "flex" }
          : { display: "none" },
      ]}
    >
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
