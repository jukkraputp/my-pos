import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import materialTheme from "../../constants/Theme";

const map: { [key: string]: string } = {
  Food1: "Steak",
  Food2: "Smoothie",
  FoodSet: "Set",
  Order: "Order",
  History: "History",
  Option: "Option",
};

interface props {
  navbarName: string;
  onChange: Function;
  content: string;
  image: any;
}

export default function NavbarController(props: props) {
  const title = props.navbarName;
  const changeContent = () => {
    props.onChange(props.navbarName);
  };

  const renderOptions = (option: string, image: any) => {
    const focused = option === props.content;
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          flex: 1,
          /* borderColor: "black",
          borderWidth: 1, */
        }}
        onPress={() => changeContent()}
      >
        <View
          style={[
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null,
          ]}
        >
          <View>
            {Platform.OS == "web" && (
              <Image source={image} style={{ width: 80, height: 80 }} />
            )}
            <Text style={styles.headline}>{map[title]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return renderOptions(props.navbarName, props.image);
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 36,
    paddingHorizontal: 18,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: materialTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36,
  },
  headline: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: (Dimensions.get("screen").height / 650) * 20,
    marginTop: 0,
    marginStart: "10%",
  },
});
