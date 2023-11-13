import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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

function AddAddress({ navigation }) {
  // console.log('asdfjlaksd asdf')
  const [isChosen, setIsChosen] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [pickedAddress, setPickedAddress] = useState();
  const [checkItems, setCheckItems] = useState("");
  const [userID, setUserID] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  const [totalPack, setTotalPack] = useState();
  const [deliveryFee, setDeliveryFee] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("addresses")
        .then((res) => {
          if (res) {
            let array = JSON.parse(res);
            setAddresses(array);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return willFocus;
  }, []);

  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("user")
        .then((res) => {
          if (res) {
            let array = JSON.parse(res);
            setUserID(array);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return willFocus;
  }, []);

  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("cart").then((res) => {
        if (res) {
          let array = JSON.parse(res);

          let priced = 0;
          let packing = 0;
          let totCount = 0;
          let delivery = 0;
          setCheckItems(array);
          array.forEach((value) => {
            priced += parseInt(value.price) * parseInt(value.count);
            packing += parseInt(value.packaging) * parseInt(value.count);
            totCount += parseInt(value.count);
            delivery += parseInt(value.delivery) * parseInt(value.count);
          });

          setTotalPrice(priced);
          setTotalPack(packing);
          console.log(totCount);
          let average = Math.floor(delivery / totCount);
          console.log(average);
          console.log(delivery);
          if (priced + delivery < 200) {
            if (totCount < 3) {
              setDeliveryFee(average + 5);
            } else {
              if (totCount < 5) {
                setDeliveryFee(average + 10);
              } else {
                setDeliveryFee(Math.floor(priced * 0.1));
              }
            }
          } else {
            setDeliveryFee(Math.floor(priced * 0.1));
          }
        }
      });
    });
    return willFocus;
  }, []);
  const handleOrder = () => {
    if (checkItems != "") {
      setLoading(true);
      axios({
        method: "POST",
        url: "http://shiba.co.ke/shiba/makeOrder.php",
        data: {
          userID: userID.userID,
          orders: JSON.stringify(checkItems),
          addresses: JSON.stringify(pickedAddress),
        },
      })
        .then(async (res) => {
          if (res.data.orders) {
            alert("Success !!! Order received");
            await AsyncStorage.setItem("cart", JSON.stringify([]));
            setLoading(false);
            navigation.navigate("DelMessage");
          } else {
            alert(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          alert("something went wrong please check on your network");
          setLoading(false);
        });
    } else {
      alert("Nothing to check out!!, please add something to cart");
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <BackButton props={{ navigation: navigation, title: "Choose Address" }} />
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.room}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              marginTop: "20%",

              fontSize: 15,
            }}
          >
            You haven't added an Address yet
          </Text>
        )}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              style={globalStyles.cartItem}
              onPress={() => {
                setPickedAddress(item.item);
                setIsChosen(item.item.room);
              }}
            >
              <View
                style={{
                  height: 15,
                  width: 15,
                  borderWidth: 1,
                  borderRadius: 100,
                  position: "absolute",
                  right: 15,
                  top: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      isChosen == item.item.room ? "rgb(74, 4, 4) " : "white",
                    height: "100%",
                    width: "100%",
                    borderRadius: 100,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  // borderWidth:1,
                  // color:'red'
                }}
              >
                {item.item.title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  marginTop: 0,
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
            </TouchableOpacity>
          );
        }}
        style={{
          width: "90%",
          marginLeft: "5%",
          marginTop: 50,
          paddingBottom: 5,
          // borderWidth:1,
          height: "90%",
        }}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          height: 250,
          width: "90%",
          marginLeft: "5%",
          display: "flex",
          // justifyContent:'center',

          borderWidth: 1,

          shadowColor: "black",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 25,
          borderRadius: 15,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyAddress");
          }}
          style={{
            // backgroundColor: "rgb(74, 4, 4)",
            marginTop: 10,
            height: 35,
            width: 150,
            borderRadius: 10,
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "rgb(74, 4, 4)",
              fontSize: 13,
              textAlign: "center",
              marginTop: 8,
              // color:'white'
            }}
          >
            + Add/Edit Address
          </Text>
        </TouchableOpacity>

        <View
          style={[
            {
              border: "2px solid rgb(74, 4, 4)",
              height: 120,
              padding: 20,
              overflow: "hidden",
              width: "80%",
              // borderRadius: 15,
              marginTop: 20,
            },
          ]}
        >
          <View
            style={[
              {
                // alignSelf:'flex-end'
                position: "absolute",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Items Price
            </Text>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Packaging Fees
            </Text>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Delivery Fees
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "rgb(74, 4, 4)",
                marginTop: 10,
              }}
            >
              Total
            </Text>
          </View>
          <View
            style={[
              {
                // justifySelf:'flex-end'
                position: "absolute",
                right: 10,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {totalPrice}/=
            </Text>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {totalPack}/=
            </Text>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {deliveryFee}/=
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "rgb(74, 4, 4)",
                marginTop: 10,
                marginRight: 50,
              }}
            >
              {deliveryFee + totalPack + totalPrice}
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                /=
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 35,
            width: "70%",
            backgroundColor: "rgb(74, 4, 4)",
            borderRadius: 10,
            // marginTop: 50,
          }}
          onPress={() => {
            if (isChosen != "") {
              handleOrder();
            } else {
              alert("You have not picked an address");
            }
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 7,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttons: {
    border: "2px solid rgb(74, 4, 4)",
    height: 45,
    width: 45,
    // borderRadius: 10,
    transform: "rotate(45deg)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    // position: "fixed",
    marginLeft: 20,
    zIndex: 3,
  },
});
export default AddAddress;
