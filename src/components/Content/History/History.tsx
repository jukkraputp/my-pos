import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../../apis/API";
import Filter from "./Filter";
import { order } from "interface";
import ContentRow from "../ContentRow";
import ContentTable from "../ContentTable";

interface props {
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
      allImages,
      orders,
      from: "History",
    });
    setJSXElements(jsx);
  };

  useEffect(() => {
    if (Object.keys(allImages).length !== 0 && orders.length !== 0) setJSX();
  }, [orders, allImages]);

  useEffect(() => {
    if (jsxElements.length !== 0 && !renderCompleted) {
      props.renderComplete();
      setRenderCompeted(true);
    }
  }, [jsxElements]);

  return orders.length !== 0 ? (
    <View
      style={[
        { maxHeight: Dimensions.get("window").height * 0.96 },
        props.selectedContent === "History"
          ? { display: "flex" }
          : { display: "none" },
      ]}
    >
      <Filter
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
  ) : (
    <></>
  );
}
