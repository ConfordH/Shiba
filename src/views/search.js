import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import { globalStyles } from "../components/commonStyles";

import props from "../props/props";
import BottomNav from "../components/bottomNav";
import TopHeader from "../components/topHeader";
import MasonryList from "@react-native-seoul/masonry-list";
import { default as list } from "../props/props";
import { AirbnbRating } from "react-native-ratings";
import axios from "axios";
import Loader from "../components/loader";
import refresh from "../../assets/icons/refresh.png";

function Search({ route, navigation }) {
  const [hotelList, setHotelList] = useState([]);
  const [hotelConstList, setConstHotelList] = useState([]);
  // const [hotelParams, setHotelParams] = useState(route.params.params)
  const [isSearching, setIsSearching] = useState(false);
  const [categFilter, setCategFilter] = useState([]);
  const [descFilter, setDescFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const searchEng = (value) => {
    let nameList = [];
    let descList = [];
    let categList = [];
    let set = [];
    let anotherSet = [];
    let searchedList = hotelConstList;
    value = value.toUpperCase();
    value = value.split(" ");

    searchedList.forEach((item, ind) => {
      console.log("description", item.description);
      if (
        value.includes(item.name.toUpperCase()) ||
        value.includes(item.category.toUpperCase())
      ) {
        console.log(item.description);
        if (nameList.indexOf(hotelConstList[ind] != -1)) {
          nameList.push(hotelConstList[ind]);
        }
      }

      anotherSet = [...new Set([...set, ...nameList])];

      item.description.split(" ").forEach((anotherItem) => {
        if (value.includes(anotherItem.toUpperCase())) {
          if (nameList.indexOf(hotelConstList[ind] != -1)) {
            nameList.push(hotelConstList[ind]);
          }
        }
      });
      anotherSet = [...new Set([...set, ...nameList])];
    });

    value.forEach((string) => {
      if (string != " " && value != "") {
        searchedList.forEach((item, ind) => {
          if (item.name.toUpperCase().includes(string)) {
            if (descList.indexOf(hotelConstList[ind] != -1)) {
              descList.push(hotelConstList[ind]);
            }
          }
        });

        set = [...new Set([...set, ...descList])];

        searchedList.forEach((item, ind) => {
          if (item.description.toUpperCase().includes(string)) {
            if (descList.indexOf(hotelConstList[ind] != -1)) {
              descList.push(hotelConstList[ind]);
            }
          }
        });

        set = [...new Set([...set, ...descList])];

        searchedList.forEach((item, ind) => {
          if (item.category.toUpperCase().includes(string)) {
            if (categList.indexOf(hotelConstList[ind] != -1)) {
              categList.push(hotelConstList[ind]);
            }
          }
        });
        set = [...new Set([...set, ...categList])];

        searchedList = set;
        setHotelList(set);
      } else {
        console.log(hotelConstList);
        setHotelList(hotelConstList);
      }
    });
  };

  const fetch = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://shiba.co.ke/shiba/allItems.php",
    })
      .then((res) => {
        console.log(res);
        if (typeof res.data != "string") {
          setHotelList(res.data);
          setConstHotelList(res.data);
          console.log("console data", res.data);

          let filteredHotelList = res.data.map((item) => item.category);

          setCategFilter(filteredHotelList);

          filteredHotelList = res.data.map((item) => item.description);
          setDescFilter(filteredHotelList);

          filteredHotelList = res.data.map((item) => item.name);
          setNameFilter(filteredHotelList);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        alert("Network Error");
      });
  };
  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      fetch();
    });

    return willFocus;
  });

  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      console.log("confirm", hotelList);
    });
    return willFocus;
  });

  // useEffect(() => {
  //   const willFocus = navigation.addListener('focus',()=>{

  //     if (route.params) {
  //       setSearchValue(route.params.params.word)
  //     }
  //   })
  //   return willFocus
  // });
  return (
    <View style={globalStyles.main}>
      {/* <TopHeader props={navigation} /> */}
      <TopHeader props={{ navigation: navigation, title: "Search" }} />

      <TextInput
        placeholder="search bar"
        style={[styles.search, { marginTop: 20 }]}
        // onSubmitEditing={()=>navigation.navigate('Cart')}
        onChange={(e) => {
          let value = e.target.value;
          setSearchValue(value);
          searchEng(value);
        }}
        // value={route.params?route.params.params.word:''}
        value={searchValue}
        autoFocus={route.params ? route.params.params.isSearching : false}
      />
      <View style={styles.trending}>
        <Text
          style={{
            margin: 0,
            marginLeft: 20,
            fontWeight: "bold",
            marginTop: -10,
          }}
        >
          {hotelList.length == hotelConstList.length
            ? "Search"
            : `${hotelList.length} results found`}
        </Text>

        <ScrollView
          style={{
            marginTop: 10,
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
                        marginTop: 30,
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
            renderItem={({ item }) => {
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
                          hotel: item.hotel,
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
                      // paddingLeft:'5%'
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
                    <Text style={{ fontSize: 12 }}>Hotel : {item.hotel}</Text>
                    <Text style={{ fontSize: 12 }}>
                      Est : {item.estDelTime}
                    </Text>

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
      </View>
      {/* <View  style={{
        bottom:200
        // bac
      }} > */}
      <BottomNav props={navigation} />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  trending: {
    height: "70%",
    marginTop: 20,
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

export default Search;
