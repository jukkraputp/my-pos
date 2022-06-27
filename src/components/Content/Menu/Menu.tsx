import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ContentCard from "../ContentCard";

interface props {
  selectedContent: string;
  type: string;
  onChange: Function;
  renderComplete: Function;
  menu: { [key: string]: { name: string; price: string; image: string } };
}

export default function Menu(props: props) {
  const [JSX, setJSX] = useState<JSX.Element[][]>([]);
  const [renderCompleted, setRenderCompeted] = useState(false);

  const renderRow = async (
    itemID: number,
    flexNumber: number,
    maxID: number
  ) => {
    var row: any = [];

    for (let idx = 0; idx < 4 && itemID + idx < maxID; idx++) {
      const name = props.menu[String(itemID + idx)].name;
      const price = Number(props.menu[String(itemID + idx)].price);
      const image = props.menu[String(itemID + idx)].image;
      row.push(
        <ContentCard
          name={name}
          image={image}
          ID={String(itemID + idx)}
          price={price}
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

  const renderTable = async (
    menu: {
      [key: string]: { name: string; price: string; image: string };
    },
    perRow: number = 4
  ) => {
    const list = Object.keys(menu);
    var jsx = [];
    var start = 0;
    for (let index = perRow; index < list.length; index += perRow) {
      jsx.push([await renderRow(start, 0, list.length)]);
      start = index;
    }
    jsx.push([
      await renderRow(start, perRow - (list.length - start), list.length),
    ]);
    return jsx;
  };

  const generateJSX = async () => {
    const jsx = await renderTable(props.menu);
    setJSX(jsx);
  };

  useEffect(() => {
    if (!!props.menu) generateJSX();
  }, [props.menu]);

  useEffect(() => {
    if (JSX.length !== 0 && !renderCompleted) {
      setRenderCompeted(true);
      props.renderComplete();
    }
  }, [JSX]);

  return !!JSX ? (
    <View
      style={[
        props.selectedContent === props.type
          ? { display: "flex" }
          : { display: "none" },
      ]}
    >
      {JSX}
    </View>
  ) : null;
}
