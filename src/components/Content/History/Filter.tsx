import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Theme from "../../../constants/Theme";

interface props {
  style: {};
  startDate: Date;
  setStartDate: Function;
  endDate: Date;
  setEndDate: Function;
}

export default function Filter(props: props) {
  const [showDate, setShowDate] = useState(props.startDate);
  const [edittingDate, setEdittingDate] = useState<string>("none");

  const startDate = props.startDate;
  const endDate = props.endDate;
  const currentYear = new Date(Date.now()).getFullYear();
  const currentMonth = new Date(Date.now()).getMonth();
  const currentDate = new Date(Date.now()).getDate();

  const setDate = (event: DateTimePickerEvent) => {
    if (event.type === "dismissed") {
      setEdittingDate("none");
    } else {
      const timestamp: number = event.nativeEvent.timestamp
        ? event.nativeEvent.timestamp
        : -1;
      const date = new Date(timestamp);
      if (edittingDate === "startDate") props.setStartDate(date);
      else if (edittingDate === "endDate") props.setEndDate(date);
      setEdittingDate("none");
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={() => {
          setShowDate(startDate);
          setEdittingDate("startDate");
        }}
      >
        <Text style={styles.filterFont}>
          Start Date: {startDate.toDateString()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={() => {
          setShowDate(endDate);
          setEdittingDate("endDate");
        }}
      >
        <Text style={styles.filterFont}>
          End Date: {endDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {edittingDate !== "none" && (
        <RNDateTimePicker
          value={showDate}
          onChange={setDate}
          /* display="spinner" */
          minimumDate={new Date(currentYear, currentMonth, 1)}
          maximumDate={new Date(currentYear, currentMonth, currentDate + 1)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: Dimensions.get("window").height * 0.05,
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 20,
  },
  filterContainer: {
    width: "55%",
    height: Dimensions.get("window").height * 0.05,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    marginRight: 25,
    backgroundColor: Theme.COLORS.HEADER,
  },
  filterFont: {
    color: "white",
    fontSize: 16,
  },
});
