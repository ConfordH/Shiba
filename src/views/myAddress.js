import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";
import props from "../props/props";

function MyAddress({ navigation }) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("addresses")
        .then((res) => {
          if (res) {
            let array = JSON.parse(res);
            setAddresses(array);
            console.log("array", array);
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
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <BackButton props={{ navigation: navigation, title: "My Addresses" }} />

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.room}
        renderItem={(item) => {
          return (
            <View
              style={[
                globalStyles.cartItem,
                {
                  // backgroundColor:'red'
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  globalStyles.paddedButton,
                  ,
                  {
                    position: "absolute",
                    top: 0,
                    right: 10,
                    borderRadius: 10,
                  },
                ]}
                onPress={() => {
                  navigation.navigate("AddNewAddress", {
                    ops: "Edit",
                    room: item.item.room,
                  });
                }}
              >
                <Text style={[globalStyles.iText, { color: "white" }]}>
                  Edit
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: "60%",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {item.item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "grey",
                    marginTop: 10,
                  }}
                >
                  {item.item.location}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "grey",
                  }}
                >
                  {item.item.room}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "grey",
                  }}
                >
                  {item.item.phone}
                </Text>
              </View>
            </View>
          );
        }}
        style={{
          width: "90%",
          marginLeft: "5%",
          marginTop: 40,
          paddingBottom: 5,
          height: "90%",
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={[
                globalStyles.container,
                {
                  borderWidth:0,
                  marginTop: "30%",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                No addresses here, please add one{" "}
              </Text>
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          backgroundColor: "white",
          height: "15%",
          display: "flex",
          // justifyContent:'center',
          boxShadow: " rgb(74, 4, 4) 0px 14px  30px",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            border: "2px solid rgb(74, 4, 4)",
            marginTop: 30,
            // height: 35,
            width: 200,
            // paddingTop:10,
            paddingBottom: 10,
            borderWidth: 1,
            borderColor: "rgb(74,4,4)",
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate("AddNewAddress", { ops: "Add" });
          }}
        >
          <Text
            style={{
              color: "rgb(74, 4, 4)",
              fontSize: 15,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            + Add New Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttons: {
    border: "2px solid red",
    height: 45,
    width: 45,
    // borderRadius: 10,
    transform: "rotate(45deg)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    // position: "fixed",
    marginLeft: 20,
    zIndex: "3",
  },
});
export default MyAddress;
