import { Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import ContentCard from "../ContentCard";
import API from "../../../apis/API";

interface props {
  type: string;
  onChange: Function;
}

const api = new API();

export default function Menu(props: props) {
  const [menu, setMenu] = useState<any[]>([]);

  const allImages = api.getAllImages();

  useEffect(() => {
    const index = props.type + "_Images";
    switch (index) {
      case "Food1_Images":
        setMenu(allImages.Food1_Images);
        break;
      case "Food2_Images":
        setMenu(allImages.Food2_Images);
        break;
      case "FoodSet_Images":
        setMenu(allImages.FoodSet_Images);
        break;
    }
  }, [props.type]);

  const renderRow = (data: any[], itemID: number, flexNumber: number) => {
    return (
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          marginTop: 5,
          justifyContent: "space-around",
        }}
      >
        {data.map((image, idx) => {
          return (
            <ContentCard
              name={api.getName(props.type + "_" + (itemID + idx))}
              image={image}
              ID={String(itemID + idx)}
              price={api.getPrice(props.type + "_" + (itemID + idx))}
              type={props.type}
              onChange={props.onChange}
              key={props.type + "_" + String(itemID + idx)}
            />
          );
        })}
        <View style={{ flex: flexNumber }} />
      </View>
    );
  };

  const renderTable = () => {
    var jsx = [];
    var start = 0;
    const perRow = 4;
    for (let index = perRow; index < menu.length; index += perRow) {
      jsx.push([renderRow(menu.slice(start, index), start, 0)]);
      start = index;
    }
    jsx.push([
      renderRow(menu.slice(start), start, perRow - (menu.length - start)),
    ]);
    return jsx;
  };

  return <View>{renderTable()}</View>;
}
