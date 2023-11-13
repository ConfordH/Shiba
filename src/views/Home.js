import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import props from "../props/props";
import TopHeader from "../components/topHeader";
import BottomNav from "../components/bottomNav";
import Icons from "../components/icons";
import { iconNames } from "../components/iconNames";
import { globalStyles } from "../components/commonStyles";
import Loader from "../components/loader";
import { AirbnbRating, Rating } from "react-native-ratings";
import MasonryList from "@react-native-seoul/masonry-list";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image";
import refresh from "../../assets/icons/refresh.png";
function Home({ navigation }) {
  const [hotelList, setHotelList] = useState([]);
  const [hotelConstList, setConstHotelList] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [stateImages, setStateImages] = useState([
    "https://media.npr.org/assets/img/2022/06/06/gettyimages-1199291938-40_custom-7191b02345de50bf85961f6342c202dd9d6d20a0-s800-c85.webp",
    "https://media.npr.org/assets/img/2022/06/06/gettyimages-1199291938-40_custom-7191b02345de50bf85961f6342c202dd9d6d20a0-s800-c85.webp",
    "https://media.npr.org/assets/img/2022/06/06/gettyimages-1199291938-40_custom-7191b02345de50bf85961f6342c202dd9d6d20a0-s800-c85.webp",
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      let campusID = JSON.parse(res).campusID;
      axios({
        method: "POST",
        url: "http://shiba.co.ke/shiba/ads.php",
        data: { campusID: campusID },
      })
        .then(async (res) => {
          if (typeof res.data != "string") {
            let stateFilter = res.data.map((item) => item.thumbNail);
            setStateImages(stateFilter);
            // alert(data)
          }
        })
        .catch((eer) => {
          // alert(eer)
        });
    });
  });
  const fetch = () => {
    AsyncStorage.getItem("user").then((res) => {
      setLoading(true);
      let campusID = JSON.parse(res).campusID;
      // alert(campusID)
      axios({
        method: "POST",
        url: "http://shiba.co.ke/shiba/getHotels.php",
        data: { campusID: campusID },
      })
        .then(async (res) => {
          if (typeof res.data != "string") {
            console.log(res.data);
            setHotelList(res.data);
            setConstHotelList(res.data);
            setLoading(false);
          }
        })
        .catch((eer) => {
          alert("Seems like you are offline");
          setLoading(false);
        });
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
      AsyncStorage.getItem("user")
        .then((res) => {
          let parse = JSON.parse(res);
          setUserDetails(parse);
          // alert('user')
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
        });
    });
    return willFocus;
  });
  const categFilter = (name) => {
    if (name != "All") {
      setHotelList(
        hotelConstList.filter((categ) => categ.categories.includes(name))
      );
    } else {
      setHotelList(hotelConstList);
    }
  };
  return (
    <View
      style={[
        globalStyles.main,
        {
          paddingTop: -10,
        },
      ]}
    >
      {/* {true?<TopHeader props={navigation} />:<></>} */}
      <TopHeader props={{ navigation: navigation, title: "Home" }} />

      <View
        style={{
          overflow: "hidden",
        }}
      >
        <TextInput
          placeholder="search bar"
          style={[styles.search, { fontSize: 15 }]}
          onFocus={(e) =>
            navigation.navigate("Search", {
              params: { isSearching: true, word: e.target.value },
            })
          }
        />
        <View style={styles.advert}>
          <SliderBox
            images={stateImages}
            onCurrentImagePressed={(e) => {
              alert(e);
            }}
            dotStyle={{
              display: "none",
            }}
            autoplay
            circleLoop
            autoplayInterval={5000}
          />

          <ImageBackground
            style={{
              height: "100%",
              width: "100%",
              // borderRadius: 15,
              overflow: "hidden",
              // border:'2px solid red'
            }}
            imageStyle={{
              // size
              height: "100%",
              width: "100%",
            }}
            source={
              "https://media.npr.org/assets/img/2022/06/06/gettyimages-1199291938-40_custom-7191b02345de50bf85961f6342c202dd9d6d20a0-s800-c85.webp"
            }
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
              paddingLeft: 5,
            }}
          >
            Categories
          </Text>
        </View>
        <ScrollView
          style={styles.categBox}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
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
      <Text
        style={{
          margin: 0,
          paddingBottom: 15,
          paddingLeft: 10,
          fontWeight: "bold",
        }}
      >
        {userDetails ? userDetails.campName : "Hotels"}
      </Text>

      <ScrollView style={styles.trending}>
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
                {loading ? (
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Loading...
                  </Text>
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
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  // alert(item.name)
                  if (item.status == "Open") {
                    navigation.navigate("Hotel", {
                      params: { hotelID: item.hotelID, name: item.name },
                    });
                  } else {
                    alert("Hotel Closed");
                  }
                }}
              >
                <ImageBackground
                  source={{ uri: item.image }}
                  // onError={(e)=>alert('error image',e)}
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
                  <Text
                    style={{
                      fontSize: 15,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12 }}>Status : {item.status}</Text>
                  <Text style={{ fontSize: 12 }}>Est : {item.estTime}</Text>

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
      <BottomNav
        style={{
          height: 50,
        }}
        props={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    // border: "2px solid rgb(74, 4, 4)",

    borderWidth: 1,
    borderColor: "rgb(74, 4, 4)",
    height: 35,
    fontSize: 18,
    borderRadius: 15,
    paddingLeft: 15,
    width: "80%",
    marginTop: 10,
    marginLeft: 10,
  },
  advert: {
    border: "2px solid rgb(74, 4, 4)",
    marginTop: 15,
    height: 200,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: "1.5%",
    width: "97%",
  },
  categBox: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
    marginTop: 5,
    paddingBottom: 15,
    paddingLeft: 5,
  },
  categMiniBox: {
    // border: "2px solid rgb(74, 4, 4)",
    borderWidth: 1,
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
    height: "42%",
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
export default Home;
