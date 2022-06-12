import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../apis/firebase";
import Theme from "../constants/Theme";

export default function Logout() {
  const onLogout = () => {
    auth.signOut();
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: Theme.COLORS.SWITCH_ON,
          height: 50,
          width: 100,
          justifyContent: "center",
        }}
        onPress={onLogout}
      >
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
