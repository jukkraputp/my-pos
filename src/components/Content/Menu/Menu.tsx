import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ContentCard from "../ContentCard";
import API from "../../../apis/API";
import { menuList } from "interface";

interface props {
  selectedContent: string;
  type: string;
  onChange: Function;
  renderComplete: Function;
  menu: { [key: string]: { name: string; price: string; image: string } };
}

export default function Menu(props: props) {
  const [menu, setMenu] = useState<{ [key: string]: string }>({});
  const [JSX, setJSX] = useState<JSX.Element[][]>([]);
  const [renderCompleted, setRenderCompeted] = useState(false);

  const api = new API();

  useEffect(() => {
    console.log(props.menu);
  });

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

  const renderRow = async (
    itemID: number,
    flexNumber: number,
    maxID: number
  ) => {
    var row: any = [];

    for (let idx = 0; idx < 4 && itemID + idx < maxID; idx++) {
      const name = props.menu[String(itemID + idx)].name;
      const price = Number(props.menu[String(itemID + idx)].price);
      const image = await api.getImage(
        props.type + "_" + props.type + "-" + String(itemID + idx)
      );
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

  const renderTable = async (menu: { [key: string]: string }) => {
    const list = Object.keys(menu)
      .filter((key) => key.includes(props.type))
      .filter((key) => key.includes("name"));
    var jsx = [];
    var start = 0;
    const perRow = 4;
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
    const jsx = await renderTable(menu);
    setJSX(jsx);
  };

  useEffect(() => {
    generateJSX();
  }, [menu]);

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
