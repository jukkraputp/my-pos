import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import Order from "../components/Content/Order/Order";
import { order } from "interface";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../apis/firebase";
import API from "src/apis/API";

interface props {
  
}

export default function Chef(props: props) {
  const [orders, setOrders] = useState<Array<order>>([]);

  useEffect(() => {
    const listenOrder = onSnapshot(collection(db, "Order"), (snapShot) => {
      var temp: Array<order> = [];
      snapShot.docs.forEach((doc) => {
        const data: any = doc.data();
        temp.push({ ...data, docID: doc.id });
      });
      setOrders(temp);
    });
  }, []);
  return (
    <View>
      <View>
        <Order selectedContent="Order" orders={orders} chef={true} />
      </View>
      <Logout />
    </View>
  );
}
