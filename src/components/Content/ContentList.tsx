import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import ContentCard from "./ContentCard";
import NavbarName from "../../constants/NavbarName";
import Theme from "../../constants/Theme";

interface props {
  itemList: { [key: string]: { name: string; price: string; image: string } };
  from: string;
  type: string;
  editMenu: Function;
  perRow?: number;
  addNewMenu: Function;
  children?: React.ReactNode;
}

export default function ContentList(props: props) {
  const addNewMenu = () => {
    props.addNewMenu();
  };

  const renderList = () => {
    return (
      <View style={styles.containerView}>
        {!!props.children && props.children}
        {Object.keys(props.itemList).map((key) => {
          const item = props.itemList[key];
          return (
            <ContentCard
              name={item.name}
              ID={key}
              price={Number(item.price)}
              image={item.image}
              type={props.type}
              onChange={props.editMenu}
              from={props.from}
              key={key}
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
