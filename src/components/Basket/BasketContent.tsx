import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import API from "../../apis/API";

interface props {
  updateBasket: Function;
  items: { [key: string]: any };
  inBasket: boolean;
}

const api = new API();

const allImages = api.getAllImages();

export default function BasketContent(props: props) {
  const updateBasket = (itemName: string) => {
    props.updateBasket(itemName);
  };

  const items = props.items;

  const renderBasket = () => {
    var jsx: JSX.Element[][] = [];
    if (Object.keys(items).length !== 0) {
      console.log(items);
      Object.keys(items).forEach((itemName: string) => {
        const itemAmount = items[itemName];
        var image: any;
        const index = itemName.split("_")[0] + "_Images";
        switch (index) {
          case "Food1_Images":
            image = allImages.Food1_Images[Number(itemName.split("_")[1])];
            break;
          case "Food2_Images":
            image = allImages.Food2_Images[Number(itemName.split("_")[1])];
          case "Food3_Images":
            image = allImages.FoodSet_Images[Number(itemName.split("_")[1])];
        }
        jsx.push([
          <View
            key={itemName}
            style={{
              flex: props.inBasket ? 3 : 2,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginLeft: props.inBasket ? 10 : 30,
            }}
          >
            <View>
              <Text style={styles.itemNameText}>{itemName}</Text>
              <Image style={styles.bigImage} source={image} />
            </View>
            <Text style={styles.multiplySign}>{"x"}</Text>
            <Text style={styles.itemAmountText}>{itemAmount}</Text>
            {props.inBasket ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateBasket(itemName)}
              >
                <Image
                  style={styles.smallImage}
                  source={require("../../assets/images/Sign/minus-sign.png")}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>,
        ]);
      });
    }
    return jsx;
  };

  return (
    <ScrollView
      style={{
        height: props.inBasket
          ? Dimensions.get("window").height * 0.85
          : Dimensions.get("window").height * 0.5,
        width: props.inBasket ? 0 : 300,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {renderBasket()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, width: 25, height: 25 },
  bigImage: { width: 100, height: 100 },
  smallImage: { width: 25, height: 25 },
  itemNameText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  multiplySign: {
    flex: 1,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginStart: "15%",
  },
  itemAmountText: {
    flex: 1,
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});
