import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function Filter() {
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterFont}>
          Start date: {startDate.toDateString()}
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterFont}>End date: {endDate.toDateString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: Dimensions.get("window").height * 0.1,
  },
  filterContainer: {
    width: 200,
    height: 25,
    backgroundColor: "white",
    marginTop: 5,
  },
  filterFont: {
    color: "black",
  },
});
