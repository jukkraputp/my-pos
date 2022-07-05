import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
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

  const screenHeight = Dimensions.get("screen").height;

  useEffect(() => {
    setNavbarList(props.navbarList);
  }, [props.navbarList]);

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={{
        display: "flex",
        backgroundColor: "darkgray",
        flex: 6,
        height: screenHeight,
      }}
    >
      {[...Array(navbarList.length).keys()].map((index) => {
        return (
          <NavbarController
            key={navbarList[index]}
            navbarName={navbarList[index]}
            image={Icon[index]}
            onChange={props.onChange}
            content={props.content}
          />
        );
      })}
    </KeyboardAvoidingView>
  );
}
