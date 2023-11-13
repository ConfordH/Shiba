import React, { useEffect, useState } from "react";
import reactDom from "react-dom";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,Text
} from "react-native";
import { FlipInEasyX } from "react-native-reanimated";

import Icons from "./icons";
import { iconNames } from "./iconNames";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BottomNav({ props }) {
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    const willFocus = props.addListener("focus", () => {
      AsyncStorage.getItem("cart")
        .then((res) => {
          if (res) {
            let array = JSON.parse(res);
            if (array.length > 0) {
              setShowDot(true);
            } else {
              setShowDot(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return willFocus;
  }, []);
  return (
    <View
      // elevation={5}

      style={[
        styles.main,
        {
          // boxShadow: " rgba(149, 157, 165) 0px 8px 24px",
          // borderRadius: 10,

        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.iconBox,
          {
            marginLeft: 20,
          },
        ]}
        onPress={() => props.push("Profile")}
      >
        <Icons props={{ iconName: iconNames.settingsIcon }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconBox}
        onPress={() => props.push("Search")}
      >
        <Icons props={{ iconName: iconNames.searchIcon }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconBox,
          styles.focused,
          {
            border: "2px solid rgb(74, 4, 4)",
          },
        ]}
        onPress={() => props.push("Home")}
      >
        <Icons props={{ iconName: iconNames.homeIcon }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconBox]}
        onPress={() => props.push("Cart")}
      >
        {showDot ? (
          <View
            style={{
              height: 7,
              width: 7,
              backgroundColor: "rgb(74, 4, 4)",
              borderRadius: 100,
              position: "absolute",
              right: 5,
              top: 0,
            }}
          />
        ) : (
          <></>
        )}
        <Icons props={{ iconName: iconNames.cartIcon }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconBox}
        onPress={() => {
          props.push("Orders");
        }}
      >
        <Icons props={{ iconName: iconNames.ordersIcon }} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    borderTopWidth:1,
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    // height:100,
    borderRadius:50,
    // bottom: 0,
    backgroundColor: "white",
    width: "100%",
    paddingTop:5
  },
  iconBox: {
    // border: "2px solid rgb(74, 4, 4)",
    height: 35,
    width: 35,
    backgroundColor: "white",
    marginRight: 20,
    // borderRadius: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E8E8E8",
    // borderWidth:1,
    borderRadius:100
    // boxShadow:' rgba(149, 157, 165) 2px 8px 24px'
,
    // backgroundColor:'#d9d9d9',
  },
  focused: {
    height: 45,
    width: 45,
    // marginTop: -20,
  },
});
export default BottomNav;
