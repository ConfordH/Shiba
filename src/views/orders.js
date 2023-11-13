import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Image,
} from "react-native";
import BottomNav from "../components/bottomNav";
import { globalStyles } from "../components/commonStyles";
import TopHeader from "../components/topHeader";
import props from "../props/props";
import time from "../../assets/icons/time.png";
import Loader from "../components/loader";
import refresh from "../../assets/icons/refresh.png";
import phone from "../../assets/icons/phone.png";

function Orders({ navigation }) {
  console.log(navigation);
  const [orderList, setOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adminPhone, setAdminPhone] = useState("0742092433");
  const [ret, setRet] = useState("");
  // useEffect(() => {
  //   // setLoading(true);
  //   axios({
  //     method: "POST",
  //     url: "http://chafua.co.ke/chafua/getAdmin.php",
  //     data:user
  //   })
  //     .then((res) => {
  //       setAdminPhone(res.data);

  //     })
  //     .catch((err) => {
  //       alert(`Something broke looking for admin!`)
  //     });
  // },[]);

  const handleCancel = (items, ind) => {
    if (items.length > 0) {
      items = JSON.stringify(items);
    } else {
      items = "Remove";
    }
    axios({
      method: "POST",
      url: "http://shiba.co.ke/shiba/cancelOrder.php",
      data: {
        orderID: ind,
        orders: items,
      },
    })
      .then((res) => {
        fetch();
        navigation.isFocused();
        alert(res.data);
        console.log(orderList);
        if (res.data == "Order Removed" && orderList == 0) {
          console.log("did that");
          //  navigation.push('Orders')
        }
      })
      .catch(() => {
        alert("Sorry, network error!!");
        fetch();
      });
  };

  const fetch = () => {
    setLoading(true);
    AsyncStorage.getItem("user").then((res) => {
      let user = JSON.parse(res);
      let resData;
      axios({
        method: "POST",
        url: "http://shiba.co.ke/shiba/getOrders.php",
        data: {
          userID: user.userID,
        },
      })
        .then((response) => {
          setLoading(false);
          if (typeof response.data != "string") {
            setOrderList(response.data);
            let filter = response.data.filter((item) => item.orders);
            let total = 0;
            filter.forEach((array) => {
              JSON.parse(array.orders).forEach((value) => {
                let itTotal = parseInt(value.price) + parseInt(value.packaging);
                let isTotal = itTotal * parseInt(value.count);
                total += parseInt(isTotal);
              });
            });
            setTotalPrice(total);
          } else {
            setOrderList([]);
            setTotalPrice(0);
          }
        })
        .catch((err) => {
          setLoading(false);
          alert("Sorry you might be offline");
        });
    });
  };
  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      fetch();
    });
    return willFocus;
  });
  return (
    <View style={globalStyles.main} showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginTop: -35,
        }}
      >
        <TopHeader props={{ navigation: navigation, title: "Orders" }} />
      </View>
      <ScrollView
        style={{
          height: "65%",
          width: "100%",
          // paddingBottom: "70%",
          marginTop: 20,
          // ,borderWidth:1
        }}
        showsHorizontalScrollIndicator={false}
      >
        {orderList != [] && orderList.length > 0 ? (
          orderList.map((item) => (
            <View key={item.orderID} style={{ paddingTop: 10 }}>
              {JSON.parse(item.orders).map((val) => (
                <TouchableOpacity
                  key={val.itemID}
                  style={styles.cartItem}
                  onPress={() => {
                    alert("Long press to cancel");
                  }}
                  onLongPress={() => {
                    // let obj = {}
                    let orderID = item.orderID;
                    let orders = JSON.parse(item.orders);

                    let filter = orders.map((mapItem) => mapItem.itemID);
                    let ind = filter.indexOf(val.itemID);

                    orders.splice(ind, ind + 1);
                    handleCancel(orders, orderID);
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      right: 30,
                      bottom: 5,
                      zIndex: 4,
                    }}
                  >
                    <Image
                      source={phone}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                      }}
                      onPress={() => {
                        Linking.openURL(`tel: ${val.adminPhone}`);
                      }}
                    >
                      {val.adminPhone}
                    </Text>
                  </View>

                  <Text
                    style={{
                      position: "absolute",
                      right: 40,
                      fontSize: 15,
                      top: 5,
                      color: "rgb(74, 4, 4)",
                      // borderWidth:1
                    }}
                  >
                    x{val.count}
                    {"\n"}
                    <Text
                      style={{
                        marginTop: "100%",
                        marginLeft: -30,
                      }}
                    >
                      {item.status}
                    </Text>
                  </Text>
                  <ImageBackground
                    style={{
                      height: 100,
                      width: 95,
                      marginLeft: 10,
                    }}
                    source={{ uri: val.thumbNail }}
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
                      {val.name}
                    </Text>
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 10,
                      }}
                    >
                      {val.hotel}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        marginTop: 5,
                      }}
                    >
                      {parseInt(val.price) + parseInt(val.packaging)}{" "}
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
              ))}
            </View>
          ))
        ) : (
          <View>
            {/* <Loader/> */}
            {loading ? (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 50,
                }}
              >
                Loading...
              </Text>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 50,
                }}
              >
                <Loader />
                <Text>Seems like Nothing is here... </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      fetch();
                    }}
                  >
                    <ImageBackground
                      source={refresh}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 20,
                        transform: [{ rotate: "45deg" }],
                        borderWidth: 1,
                        borderRadius: 100,
                        padding: 20,
                      }}
                      imageStyle={{
                        marginTop: 10,
                        marginLeft: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      {/* </View> */}

      <View
        style={{
          // position: "fixed",
          marginBottom: 10,
          marginLeft: "5%",
          marginTop: 10,
          borderRadius: 10,
          borderWidth: 1,
          width: "90%",
          backgroundColor: "white",
          // paddingTop: 10,
          // paddingBottom: 60,
          // boxShadow: " rgba(149, 157, 165) 0px 3px 15px" ,
          // border: "2px solid red",
          shadowColor: "black",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 10,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          style={{
            height: 20,
            width: 20,
            position: "absolute",
            right: 40,
            top: 50,
            zIndex: 5,
          }}
          onPress={() => {
            fetch();
          }}
        >
          <Image
            source={refresh}
            style={{
              height: 20,
              width: 20,
              transform: [{ rotate: "45deg" }],
            }}
          />
        </TouchableOpacity>
        <View style={styles.totalBox}>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Delivery time
          </Text>
          <View
            style={{
              position: "absolute",
              display: "flex",
              right: 10,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ImageBackground
              style={{
                height: 20,
                width: 20,
                border: "2px solid rgb(74, 4, 4)",
                // borderRadius: "100%",
                marginRight: 5,
              }}
              source={time}
              imageStyle={
                {
                  // borderRadius: 15,
                }
              }
            />
            <Text
              style={{
                marginLeft: 3,
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              25 mins
            </Text>
          </View>
          <Text
            style={{
              marginTop: 10,
            }}
          >
            Total Price
          </Text>
          <Text
            style={{
              fontSize: 30,
            }}
          >
            {totalPrice}
            <Text
              style={{
                fontSize: 15,
                color: "rgb(74, 4, 4)",
                fontWeight: "bold",
              }}
            >
              /=
            </Text>
          </Text>
          <TouchableOpacity
            style={{
              height: 40,
              width: 150,
              border: "2px solid rgb(74, 4, 4)",
              borderRadius: 10,
              position: "absolute",
              bottom: 30,
              backgroundColor: "rgb(74, 4, 4)",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              right: 10,
            }}
          >
            {orderList != 0 ? (
              <Text style={{ color: "white" }}>On the way!!</Text>
            ) : (
              <Text style={{ color: "white" }}>Make Order</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav props={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    // padding: "0",
    overflow: "none",
    height: "100%",
  },
  totalBox: {
    border: "2px solid rgb(74, 4, 4)",
    height: 150,
    width: "90%",
    marginLeft: "5%",
    // borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
  },
  buttons: {
    paddingLeft: 20,
    paddingRight: 20,
    // borderRadius: 10,
    marginLeft: 5,
    height: 35,
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
export default Orders;
