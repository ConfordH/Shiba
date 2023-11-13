import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import BottomNav from "../components/bottomNav";
import { globalStyles } from "../components/commonStyles";
import { iconNames } from "../components/iconNames";
import Icons from "../components/icons";
import TopHeader from "../components/topHeader";
import { default as list } from "../props/props";
import MasonryList from "@react-native-seoul/masonry-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loader from "../components/loader";
import refresh from "../../assets/icons/refresh.png";

function Hotel({ route, navigation }) {
  const [hotelList, setHotelList] = useState([]);
  const [hotelConstList, setConstHotelList] = useState([]);
  // const [route.params.params, setHotelParams] = useState(route.params.params);
  const [loading, setLoading] = useState(true);
  // alert(route.params.params.name)

  const fetch = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "http://shiba.co.ke/shiba/getItems.php",
      data: { hotelID: route.params.params.hotelID },
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (typeof res.data != "string") {
          setHotelList(res.data);
          setConstHotelList(res.data);
        } else {
          alert(res.data);
        }
      })
      .catch(() => {
        setLoading(false);
        alert("Seems like you are offline");
      });
  };
  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      fetch();
    });

    return willFocus;
  });

  const categFilter = (name) => {
    if (name != "All") {
      setHotelList(hotelConstList.filter((categ) => categ.category == name));
    } else {
      setHotelList(hotelConstList);
    }
  };

  return (
    <View style={globalStyles.main} showsVerticalScrollIndicator={false}>
      <TopHeader
        props={{ navigation: navigation, title: route.params.params.name }}
      />
      <View
        style={[
          globalStyles.container,
          {
            marginTop: 20,
            paddingLeft: 5,
            flexDirection: "row",
            borderWidth: 0,
          },
        ]}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              const categName = "All";
              categFilter(categName);
            }}
            style={styles.categMiniBox}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              All
            </Text>
            <View style={styles.categIcon}>
              <View
                style={{
                  height: "70%",
                  width: "70%",
                  marginTop: 4,
                  marginLeft: 10,
                }}
              >
                <Icons props={{ iconName: iconNames.allIcon }} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const categName = "Fast";
              categFilter(categName);
            }}
            style={styles.categMiniBox}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Fast
            </Text>
            <View style={styles.categIcon}>
              <View
                style={{
                  height: "70%",
                  width: "70%",
                  marginTop: 4,
                  marginLeft: 10,
                }}
              >
                <Icons props={{ iconName: iconNames.fastIcon }} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const categName = "Drinks";
              categFilter(categName);
            }}
            style={styles.categMiniBox}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Drinks
            </Text>
            <View style={styles.categIcon}>
              <View
                style={{
                  height: "70%",
                  width: "70%",
                  marginTop: 4,
                  marginLeft: 10,
                }}
              >
                <Icons props={{ iconName: iconNames.drinkIcon }} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const categName = "Tea";
              categFilter(categName);
            }}
            style={styles.categMiniBox}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Tea
            </Text>
            <View style={styles.categIcon}>
              <View
                style={{
                  height: "70%",
                  width: "70%",
                  marginTop: 4,
                  marginLeft: 10,
                }}
              >
                <Icons props={{ iconName: iconNames.teaIcon }} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const categName = "Fruits";
              categFilter(categName);
            }}
            style={styles.categMiniBox}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Fruits
            </Text>
            <View style={styles.categIcon}>
              <View
                style={{
                  height: "70%",
                  width: "70%",
                  marginTop: 4,
                  marginLeft: 10,
                }}
              >
                <Icons props={{ iconName: iconNames.fruitIcon }} />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <TextInput
        placeholder="search bar"
        style={[styles.search, {}]}
        onFocus={(e) =>
          navigation.navigate("Search", {
            params: { isSearching: true, word: e.target.value },
          })
        }
      />
      <ScrollView
        style={{
          marginTop: 20,
        }}
      >
        <MasonryList
          data={hotelList}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{ alignSelf: "stretch" }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignSelf: "stretch",
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View>
                {/* <Loader/> */}
                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
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
            );
          }}
          renderItem={({ item, ind }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  if (item.status == 1) {
                    let ind = hotelList
                      .map((obj) => obj.itemID)
                      .indexOf(item.itemID);
                    navigation.navigate("Details", {
                      cartItems: {
                        name: item.name,
                        hotel: route.params.params.name,
                        price: item.price,
                        estDelTime: item.estDelTime,
                        thumbNail: item.thumbNail,
                        count: parseInt(item.count),
                        rating: parseInt(item.rating),
                        itemID: parseInt(item.itemID),
                        packaging: item.packaging,
                        category: item.category,
                        delivery: item.delivery,
                        status: item.status,
                        adminPhone: item.phone,
                        description: item.description,
                      },
                    });
                  } else {
                    alert("Sorry this item is not available as at now");
                  }
                }}
              >
                <ImageBackground
                  source={{ uri: item.thumbNail }}
                  style={{
                    borderBottom: "2px solid rgb(74, 4, 4)",
                    borderBottomWidth: 1,
                    height: 120,
                    width: "100%",
                    borderRadius: 55,
                    // overflow: "hidden",
                    paddingBottom: 10,
                  }}
                  imageStyle={{
                    height: 105,
                    borderRadius: 10,
                    // paddingBottom:10
                  }}
                />
                <View
                  style={{
                    width: 120,
                  }}
                >
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 100,
                      borderWidth: 0.5,
                      position: "absolute",
                      right: 10,
                      backgroundColor: item.status == 1 ? "green" : "red",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12 }}>Price : {item.price}</Text>
                  <Text style={{ fontSize: 12 }}>Hotel : {item.hotel}</Text>
                  <Text style={{ fontSize: 12 }}>Est : {item.estDelTime}</Text>

                  <View
                    style={{
                      marginLeft: -10,
                      marginTop: 5,
                    }}
                  >
                    <AirbnbRating
                      count={5}
                      size={10}
                      defaultRating={item.rating}
                      isDisabled
                      showRating={false}
                      selectedColor="rgb(74, 4, 4)"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          flexDirection="true"
        />
      </ScrollView>
      {/* </View> */}
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
  search: {
    borderWidth: 1,
    borderColor: "grey",
    height: 35,
    borderRadius: 15,
    paddingLeft: 10,
    width: "80%",
    marginTop: 10,
    marginLeft: 10,
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
    border: "2px solid rgb(74, 4, 4)",
    height: 120,
    // borderRadius: 20,
    marginTop: 20,
    display: "flex",
    // justifyContent:'center',
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  categMiniBox: {
    border: "2px solid rgb(74, 4, 4)",
    borderWidth: 1,
    borderColor: "rgb(74,4,4)",
    minWidth: 85,
    paddingRight: 10,
    paddingLeft: 10,
    height: 30,
    borderRadius: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  categIcon: {
    height: 35,
    width: 35,
    // borderRadius: "100%",
    marginTop: 10,
  },
  trending: {
    // marginTop:'5px',
    paddingLeft: 5,
    // paddingTop: 15,
    height: "42%  ",
    // border:'2px solid red'
  },
  item: {
    // border: "2px solid rgb(74, 4, 4)",
    borderWidth: 1,
    // height: "fit-content",n
    paddingBottom: 5,
    width: 130,
    borderRadius: 15,
    borderColor: "rgb(74,4,4)",
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "white",
    marginLeft: "7%",
    alignItems: "center",
  },
});
export default Hotel;
