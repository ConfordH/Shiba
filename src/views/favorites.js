import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import BottomNav from "../components/bottomNav";
import TopHeader from "../components/topHeader";
import props from "../props/props";
import time from "../../assets/icons/time.png";
import { globalStyles } from "../components/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

function Favorites({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState([])
  const fetch = () => {
    setLoading(true)
    AsyncStorage.getItem("favorites")
      .then((res) => {
        if (res) {
          let array = JSON.parse(res);
          setCartItems(array);
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };
  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      fetch();
    });
    return willFocus;
  }, []);
  return (
    <View style={styles.main} showsVerticalScrollIndicator={false}>
      <TopHeader props={{ navigation: navigation, title: "Favorites" }} />
      <View
        style={{
          height: "81.5%",
          width: "100%",
        }}
      >
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.itemID}
          renderItem={(item) => {
            return (
              <TouchableOpacity
                style={styles.cartItem}
                onPress={() => {
                  console.log("item", item.item);
                  let ind = cartItems
                    .map((obj) => obj.itemID)
                    .indexOf(item.item.itemID);
                  navigation.navigate("Details", {
                    cartItems: {
                      name: item.item.name,
                      hotel: item.item.hotel,
                      price: item.item.price,
                      estDelTime: item.item.estDelTime,
                      thumbNail: item.item.thumbNail,
                      count: parseInt(item.item.count),
                      rating: parseInt(item.item.rating),
                      itemID: parseInt(item.item.itemID),
                      packaging: item.item.packaging,
                      category: item.item.category,
                      delivery: item.item.delivery,
                      status: item.item.status,
                      description: item.item.description,
                    },
                  });
                }}
                onLongPress={async () => {
                  let filter = cartItems.map((item) => item.itemID);
                  let ind = filter.indexOf(item.item.itemID);

                  cartItems.splice(ind, ind + 1);
                  let cartString = JSON.stringify(cartItems);
                  await AsyncStorage.setItem("favorites", cartString);
                  fetch();
                  alert("removed");
                }}
              >
                <ImageBackground
                  style={{
                    height: 100,
                    width: 95,
                    marginLeft: 10,
                  }}
                  source={{ uri: item.item.thumbNail }}
                  imageStyle={{
                    borderRadius: 15,
                    height: "90%",
                    marginTop: 5,
                  }}
                />
                <View
                  style={{
                    marginLeft: 20,
                    maxWidth: "50%",
                    // border:'2px solid red'
                    borderLeftWidth: 1,
                    paddingLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {item.item.name}
                  </Text>
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 10,
                    }}
                  >
                    {item.item.hotel}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 5,
                    }}
                  >
                    {parseInt(item.item.price) + parseInt(item.item.packaging)}{" "}
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgb(74, 4, 4)",
                        fontWeight: "bold",
                      }}
                    >
                      /=
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{
            paddingTop:20
          }}
          style={{
            width: "100%",
            marginTop: 0,
            paddingBottom: 10,
            // borderWidth:1,
            height: "10%",
            // border:'2px solid red'
          }}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: "40%",
                }}
              >
                {loading?'Loading...':'Nothing in here as at now'}
              </Text>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={{
          fontSize:10,
          textAlign:'center'
        }}>Long press to remove</Text>
      </View>
      <BottomNav props={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    // padding: "0",
    // overflow: "none",
    height: "100%",
  },
  totalBox: {
    // border: "2px solid rgb(74, 4, 4)",
    height: 150,
    width: "90%",
    marginLeft: "5%",
    // borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
  },
  buttons: {
    // border: "2px solid rgb(74, 4, 4)",
    height: 45,
    width: 45,
    // borderRadius: 10,
    // transform: "rotate(45deg)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    // position: "fixed",
    marginLeft: 20,
    zIndex: 3,
  },
  cartItem: {
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: "2.5%",
    width: "95%",
    display: "flex",
    // justifyContent:'center',
    flexDirection: "row",
    boxShadow: " rgba(149, 157, 165) 0px 3px 15px",
    alignItems: "center",
    // overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 15,
    backgroundColor: "white",
    // borderWidth:1
  },
});
export default Favorites;
