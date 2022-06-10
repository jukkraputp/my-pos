import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import NavbarController from "./Navbar/NavbarController";
import API from "../apis/API";

const api = new API();

const Icon = api.getIcons();

interface props {
  navbarList: Array<string>;
  onChange: Function;
  content: string;
}

export default function Navbar(props: props) {
  const [navbarList, setNavbarList] = useState<Array<string>>([]);

  useEffect(() => {
    setNavbarList(props.navbarList);
  }, [props.navbarList]);

  return (
    <View style={{ display: "flex", backgroundColor: "darkgray", flex: 6 }}>
      {[...Array(navbarList.length).keys()].map((index) => {
        return (
          <NavbarController
            navbarName={navbarList[index]}
            image={Icon[index]}
            onChange={props.onChange}
            content={props.content}
          />
        );
      })}
    </View>
  );
}
