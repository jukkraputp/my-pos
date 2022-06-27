import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../../apis/API";
import Filter from "./Filter";
import { menuList, order } from "interface";
import ContentRow from "../ContentRow";
import ContentTable from "../ContentTable";

interface props {
  menuList: menuList;
  selectedContent: string;
  history: order[];
  renderComplete: Function;
  startDate: Date;
  setStartDate: Function;
  endDate: Date;
  setEndDate: Function;
}

export default function History(props: props) {
  const [orders, setOrders] = useState(props.history);
  const [jsxElements, setJSXElements] = useState<JSX.Element[][]>([]);
  const [renderCompleted, setRenderCompeted] = useState(false);

  const menuList = props.menuList;

  useEffect(() => {
    setOrders(props.history);
  }, [props.history]);

  const renderHistorySummary = (obj: order) => {
    return (
      <View style={{ flex: 1 }}>
        <Text>ราคารวม {"\n" + obj.totalAmount} บาท</Text>
      </View>
    );
  };

  const setJSX = async () => {
    const childrenFnc = renderHistorySummary;
    const jsx = await ContentTable({
      childrenFnc,
      menuList,
      orders,
      from: "History",
    });
    setJSXElements(jsx);
  };

  useEffect(() => {
    if (Object.keys(menuList).length !== 0 && orders.length !== 0) setJSX();
  }, [orders, menuList]);

  useEffect(() => {
    if (jsxElements.length !== 0 && !renderCompleted) {
      props.renderComplete();
      setRenderCompeted(true);
    }
  }, [jsxElements]);

  return (
    <View
      style={[
        {
          maxHeight: Dimensions.get("window").height * 0.96,
        },
        props.selectedContent === "History"
          ? { display: "flex" }
          : { display: "none" },
      ]}
    >
      <Filter
        style={{}}
        startDate={props.startDate}
        setStartDate={props.setStartDate}
        endDate={props.endDate}
        setEndDate={props.setEndDate}
      />
      <ScrollView
        style={{
          backgroundColor: "white",
          marginTop: Dimensions.get("screen").height * 0.05,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {jsxElements}
      </ScrollView>
    </View>
  );
}
