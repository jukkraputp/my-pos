import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";

interface props {
  startDate: Date;
  setStartDate: Function;
  endDate: Date;
  setEndDate: Function;
}

export default function Filter(props: props) {
  const startDate = props.startDate;
  const endDate = props.endDate;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterFont}>
          Start date: {startDate.toDateString()}
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterFont}>
          End date: {endDate.toDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: Dimensions.get("window").height * 0.05,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 20,
  },
  filterContainer: {
    width: "80%",
    height: Dimensions.get("window").height * 0.05,
    backgroundColor: "black",
  },
  filterFont: {
    color: "white",
    marginLeft: 10,
  },
});
