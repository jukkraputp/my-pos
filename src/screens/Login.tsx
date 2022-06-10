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
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../apis/firebase";
import {
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface props {
  name: string;
}

export default function Login(props: props) {
  const [username, setUsername] = useState("waiter");
  const [password, setPassword] = useState("123456789");
  const [alert, setAlert] = useState(false);

  const passwordRef = useRef(null);

  const onLogin = () => {
    console.log(username + "@gmail.com", password);
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
      {alert && <></>}
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
