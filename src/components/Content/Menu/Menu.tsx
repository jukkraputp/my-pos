import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ContentCard from "../ContentCard";
import API from "../../../apis/API";

interface props {
  selectedContent: string;
  type: string;
  onChange: Function;
}

export default function Menu(props: props) {
  const [menu, setMenu] = useState<{ [key: string]: string }>({});

  const api = new API();

  const sortObj = (obj: { [key: string]: any }) => {
    const sorted = Object.keys(obj)
      .sort()
      .reduce((accumulator: any, key: string) => {
        accumulator[key] = obj[key];

        return accumulator;
      }, {});
    return sorted;
  };

  useEffect(() => {
    api.getImages().then((urls) => {
      var images: { [key: string]: string } = {};
      urls.map((url) => {
        const key = String(url.split("::").at(0));
        const uri = url.split("::").at(1);
        images[key] = String(uri);
      });
      setMenu(sortObj(images));
    });
  }, []);

  const renderRow = (itemID: number, flexNumber: number) => {
    var row = [];

    for (let idx = 0; idx < 4; idx++) {
      row.push(
        <ContentCard
          name={api.getName(props.type + "_" + (itemID + idx))}
          image={menu[props.type + "_" + props.type + "-" + (itemID + idx)]}
          ID={String(itemID + idx)}
          price={api.getPrice(props.type + "_" + (itemID + idx))}
          type={props.type}
          onChange={props.onChange}
          key={props.type + "_" + String(itemID + idx)}
          from={"Menu"}
        />
      );
    }
    return (
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          marginTop: 5,
          justifyContent: "space-around",
        }}
        key={itemID}
      >
        {row}
        <View style={{ flex: flexNumber }} />
      </View>
    );
  };

  const renderTable = () => {
    var jsx = [];
    var start = 0;
    const perRow = 4;
    for (
      let index = perRow;
      index < Object.values(menu).length;
      index += perRow
    ) {
      jsx.push([renderRow(start, 0)]);
      start = index;
    }
    jsx.push([renderRow(start, perRow - (Object.values(menu).length - start))]);
    return jsx;
  };

  return (
    <View
      style={[
        props.selectedContent === props.type
          ? { display: "flex" }
          : { display: "none" },
      ]}
    >
      {renderTable()}
    </View>
  );
}
