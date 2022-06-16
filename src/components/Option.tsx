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
} from "react-native";
import React, { useState } from "react";
import EditMenu from "./Option/EditMenu";
import Logout from "./Logout";
import MyModal from "./MyModal";
import API from "../apis/API";

interface props {
  api: API;
  setModalVisible: Function;
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

  const api = props.api;

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
            modalVisible={true}
            setModalVisible={props.setModalVisible}
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
        {selectedOption === "logout" && <Logout />}
      </View>
    );
  };

  const optionSelect = (option: string) => {};

  const renderOptions = () => {
    var jsx: JSX.Element[] = [];
    optionList.map((option, index) => {
      const image = optionImages[option];
      jsx.push(
        <TouchableOpacity onPress={() => optionSelect(option)}>
          <Image source={{ uri: image }} />
        </TouchableOpacity>
      );
    });
    return jsx;
  };

  return (
    <View>
      {renderOptions()}
      {optionController()}
    </View>
  );
}

const styles = StyleSheet.create({
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
  textButton: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
