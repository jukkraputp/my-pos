import { View, Text } from "react-native";
import React from "react";
import ContentCard from "./ContentCard";
import API from "../../apis/API";

interface props {
  data: any[];
  ids: { [key: string]: string };
  flexNumber: number;
  amounts: { [key: string]: number };
}

export default function ContentRow(props: props) {
  const api = new API();

  const data = props.data;
  const ids = props.ids;
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
        key={data[0] + "order_renderRow"}
      >
        {await Promise.all(
          data.map(async (image, idx) => {
            const name = await api.getName(ids[image]);
            const price = await api.getPrice(ids[image]);
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginRight: 10,
                }}
                key={image + "order_renderRow_card"}
              >
                <ContentCard
                  name={name}
                  image={image}
                  ID={ids[image]}
                  price={price}
                  type={ids[image]}
                  onChange={() => {}}
                  key={ids[image]}
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
          })
        )}
        <View style={{ flex: flexNumber }} />
      </View>
    );
  };
  return renderRow();
}
