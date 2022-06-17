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
} from "react-native";
import React, { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import MyModal from "../MyModal";
import API from "../../apis/API";

interface props {
  selectedContent: string;
  renderComplete: Function;
  setAuth: Function;
}

const optionList = ["edit", "logout"];
const optionImages: { [key: string]: string } = {
  edit: "editImage",
  logout: "logoutImage",
};

export default function Option(props: props) {
  const [auth, setAuth] = useState("");
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const api = new API();

  const perRow = 2;

  const checkPassword = () => {
    if (password === "228115") {
      setAdmin(true);
    } else {
      Alert.alert("Wrong password");
    }
  };

  const optionController = () => {
    return (
      <View>
        {admin && <EditMenu />}
        {selectedOption === "edit" && !admin && (
          <MyModal
            mode={undefined}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title={"Enter Password"}
            items={{}}
            animation={"none"}
            api={api}
          >
            <KeyboardAvoidingView
              style={styles.containerView}
              behavior="height"
            >
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
                    <Text style={styles.textButton}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </MyModal>
        )}
      </View>
    );
  };

  const optionSelect = (option: string) => {
    console.log(option);
    switch (option) {
      case "edit":
        break;
      case "logout":
        api.logout();
        props.setAuth(null);
        break;
    }
  };

  const renderRow = (options: string[]) => {
    return options.map((option) => {
      var image: any;
      switch (option) {
        case "logout":
          image = require("../../assets/icons/logout-icon.png");
          break;
        default:
          image = require("../../assets/icons/option-icon.png");
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

  useEffect(() => {
    props.renderComplete();
  }, []);

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
          ? { justifyContent: "center", bottom: "5%" }
          : { justifyContent: "space-evenly" },
      ]}
    >
      {renderOptions()}
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
  },
  loginFormTextInput: {
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
    width: 350,
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
