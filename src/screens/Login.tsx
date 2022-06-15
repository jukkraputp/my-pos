import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Button,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MyModal from "../components/MyModal";
import API from "../apis/API";

interface props {
  name: string;
  setAuth: Function;
  api: API;
}

export default function Login(props: props) {
  const [username, setUsername] = useState("waiter");
  const [password, setPassword] = useState("123456789");
  const [alert, setAlert] = useState(false);

  const passwordRef = useRef(null);

  const api = props.api;

  const onLogin = () => {
    console.log(username + "@gmail.com", password);
    var loggedIn = false;
    switch (username) {
      case "waiter":
        if (password === "123456789") {
          loggedIn = true;
          props.setAuth("waiter");
        }
      case "reception":
        if (password === "1q2w3e4r") {
          loggedIn = true;
          props.setAuth("reception");
        }
      case "chef":
        if (password === "987654321") {
          loggedIn = true;
          props.setAuth("chef");
        }
      default:
        if (!loggedIn) setAlert(true);
        return;
    }
  };

  const setModalVisible = (visible: boolean) => {
    setAlert(visible);
  };

  const renderAlert = () => {
    return (
      <View
        style={{
          position: "absolute",
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          backgroundColor: "rgba(52, 52, 52, 0.8)",
        }}
      >
        <MyModal
          modalVisible={true}
          setModalVisible={setModalVisible}
          animation={"fade"}
          title={"Login failed"}
          mode={undefined}
          items={{}}
          api={api}
        >
          <Text>Wrong username or password</Text>
        </MyModal>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text style={styles.logoText}>{props.name}</Text>
      <KeyboardAvoidingView style={styles.containerView} behavior="height">
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <TextInput
              placeholder="Username"
              returnKeyType="next"
              style={styles.loginFormTextInput}
              onChangeText={(text) => {
                setUsername(text);
              }}
              onSubmitEditing={() => Keyboard.dismiss}
            />
            <TextInput
              ref={passwordRef}
              placeholder="Password"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onSubmitEditing={onLogin}
            />
            <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {alert && renderAlert()}
    </SafeAreaView>
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
