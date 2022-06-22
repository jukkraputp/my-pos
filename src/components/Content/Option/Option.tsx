import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import MyModal from "../../MyModal";
import API from "../../../apis/API";
import { menuList } from "interface";

interface props {
  selectedContent: string;
  renderComplete: Function;
  logout: Function;
  menuList: menuList;
  setIsEditting: Function;
}

const optionList = ["edit", "logout"];
const optionImages: { [key: string]: string } = {
  edit: "editImage",
  logout: "logoutImage",
};

export default function Option(props: props) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [admin, setAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const api = new API();

  const perRow = 2;

  useEffect(() => {
    props.renderComplete();
  }, []);

  useEffect(() => {
    if (props.selectedContent !== " Option" && admin) setAdmin(false);
  }, [props.selectedContent]);

  useEffect(() => {
    if (!admin) setSelectedOption("");
  }, [admin]);

  const checkPassword = () => {
    if (password === "") {
      setAdmin(true);
    } else {
      Alert.alert("Wrong password");
    }
  };

  const setModalVisible = (visible: boolean) => {
    if (!visible) setSelectedOption(undefined);
  };

  const optionController = () => {
    if (props.selectedContent === "Option")
      return (
        <View>
          {admin && (
            <EditMenu
              menuList={props.menuList}
              setIsEditting={props.setIsEditting}
            />
          )}
          {selectedOption === "edit" && !admin && (
            <MyModal
              mode={undefined}
              modalVisible={true}
              setModalVisible={setModalVisible}
              title={"Enter Password"}
              items={{}}
              animation={"none"}
              buttonVisible={false}
              styles={{ marginTop: "35%" }}
              menuList={props.menuList}
            >
              <KeyboardAvoidingView
                style={styles.containerView}
                behavior="height"
              >
                <Pressable onPress={Keyboard.dismiss}>
                  <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                      <TextInput
                        placeholder="Password"
                        style={styles.loginFormTextInput}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                          setPassword(text);
                        }}
                        onSubmitEditing={checkPassword}
                      />
                      <TouchableOpacity
                        style={styles.loginButton}
                        onPress={checkPassword}
                      >
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                          Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Pressable>
              </KeyboardAvoidingView>
            </MyModal>
          )}
        </View>
      );
  };

  const optionSelect = (option: string) => {
    switch (option) {
      case "edit":
        setSelectedOption("edit");
        break;
      case "logout":
        api.logout();
        props.logout();
        break;
    }
  };

  const renderRow = (options: string[]) => {
    return options.map((option) => {
      var image: any;
      switch (option) {
        case "logout":
          image = require("../../../assets/icons/logout-icon.png");
          break;
        default:
          image = require("../../../assets/icons/option-icon.png");
          break;
      }
      return (
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => optionSelect(option)}
          key={option + "_button"}
        >
          <Image style={styles.optionImage} source={image} />
          <Text style={styles.textButton}>
            {option[0].toUpperCase()}
            {option.slice(1).toLowerCase()}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const renderOptions = () => {
    var jsx: JSX.Element[] = [];
    var options: string[] = [];
    var key = "";
    optionList.forEach((option, index) => {
      options.push(option);
      key += "_" + option;
      if (options.length === perRow) {
        jsx.push(
          <View style={styles.optionButtonContainer} key={key}>
            {renderRow(options)}
          </View>
        );
        options = [];
        key = "";
      }
    });
    if (options.length !== 0 && options.length) {
      jsx.push(
        <View style={styles.optionButtonContainer}>{renderRow(options)}</View>
      );
    }
    return jsx;
  };

  return (
    <View
      style={[
        props.selectedContent === "Option"
          ? { display: "flex" }
          : { display: "none" },
        styles.stageContainer,
        renderOptions().length === 1
          ? { justifyContent: "center" }
          : { justifyContent: "space-evenly" },
        { width: "100%", height: Dimensions.get("screen").height },
        { backgroundColor: "black" },
      ]}
    >
      {!admin && renderOptions()}
      {optionController()}
    </View>
  );
}

const styles = StyleSheet.create({
  stageContainer: {
    width: "80%",
    height: Dimensions.get("screen").height,
    flexDirection: "column",
    alignSelf: "center",
  },
  containerView: {
    flex: 1,
    alignItems: "center",
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
    alignItems: "center",
  },
  loginFormTextInput: {
    width: 250,
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    zIndex: 25,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 25,
  },
  loginImage: {
    height: 45,
    width: 350,
  },
  optionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  optionButton: {
    backgroundColor: "darkorange",
    borderRadius: 5,
    height: 200,
    width: 200,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 25,
  },
  optionImage: { height: 100, width: 100 },
  textButton: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
  },
});
