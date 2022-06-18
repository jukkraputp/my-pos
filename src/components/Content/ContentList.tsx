import { Text, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ContentCard from "./ContentCard";

interface props {
  itemList: { [key: string]: { name: string; price: string; image: string } };
  from: string;
  type: string;
  onChange: Function;
  perRow?: number;
}

export default function ContentList(props: props) {
  const renderList = () => {
    return (
      <View style={styles.containerView}>
        <Text style={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}>
          {props.type}
        </Text>
        {Object.keys(props.itemList).map((key) => {
          const item = props.itemList[key];
          return (
            <ContentCard
              name={item.name}
              ID={key}
              price={Number(item.price)}
              image={item.image}
              type={props.type}
              onChange={props.onChange}
              from={props.from}
            />
          );
        })}
      </View>
    );
  };

  return renderList();
}

const styles = StyleSheet.create({
  containerView: {},
});
