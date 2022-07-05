import { View, Text } from "react-native";
import React from "react";
import ContentCard from "./ContentCard";
import API from "../../apis/API";

interface props {
  datas: { name: string; price: string; image: string }[];
  flexNumber: number;
  amounts: { [key: string]: number };
  from: string;
  date: Date;
}

export default function ContentRow(props: props) {
  const datas = props.datas;
  const flexNumber = props.flexNumber;
  const amounts = props.amounts;

  const renderRow = async () => {
    return (
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          marginTop: 5,
          justifyContent: "flex-start",
        }}
        key={props.date + "_" + datas[0].name + "_" + props.from + "_renderRow"}
      >
        {datas.map((data) => {
          const name = data.name;
          const price = Number(data.price);
          const image = data.image;
          const key =
            props.date + "_" + name + "_" + props.from + "_renderRow_card";
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 10,
              }}
              key={key}
            >
              <ContentCard
                name={name}
                image={image}
                price={price}
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
  return renderRow();
}
