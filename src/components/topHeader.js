import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Directions } from "react-native-gesture-handler";

import Icons from "./icons";
import { iconNames } from "./iconNames";
import AsyncStorage from "@react-native-async-storage/async-storage";
function TopHeader({ props }) {
  const [cartItemsNum, setCartItemsNum] = useState(0);
  useEffect( () => {
    const willFocus = props.navigation.addListener("focus", () => {
      AsyncStorage.getItem("cart")
        .then((res) => {
          if (res) {
            let array = JSON.parse(res);
            setCartItemsNum(array.length);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return willFocus;
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.leftPane}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.rightPane}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Profile")}
          style={[styles.icons, styles.avator]}
        >
          <View
            style={{
              height: "160%",
              width: "160%",
              marginTop:-5
            }}
          >
            <Icons props={{ iconName: iconNames.logoIcon }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icons, styles.notify]}>
          <View
            style={{
              height: "120%",
              width: "120%",
            }}
          >
            <Icons props={{ iconName: iconNames.bellIcon }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icons, styles.cart]}
          onPress={() => {
            props.navigation.navigate("Cart");
          }}
        >
          <Text
            style={{
              marginTop: -7,
              marginLeft: 15,
              fontSize: 10,
              backgroundColor: "white",
              position: "absolute",
              zIndex: 4,
            }}
          >
            {cartItemsNum}
          </Text>
          <View
            style={{
              height: "130%",
              width: "130%",
              position: "absolute",
              // ,top:'0'
            }}
          >
            <Icons props={{ iconName: iconNames.cartIcon2 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    height: 70,
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "grey",
    marginTop:20
  },
  leftPane: {
    width: "60%",
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "bold",
    height: 28,
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  rightPane: {
    height: "90%",
    position: "absolute",
    right: 15,
    display: "flex",
    marginTop: 5,
    flexDirection: "row-reverse",
    flexSpace: 10,
    alignItems: "flex-end",
    flexSpace: 20,
    paddingBottom: 3,
  },
  icons: {
    borderRadius: 100,
  },
  avator: {
    width: 50,
    height: 50,
    marginLeft: 7,
    backgroundColor: "#ececec",

  },
  notify: {
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  cart: {
    height: 20,
    width: 20,
  },
});
export default TopHeader;
