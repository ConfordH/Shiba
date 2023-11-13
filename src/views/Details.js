import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import BackButton from "../components/BackButton";
import BottomNav from "../components/bottomNav";
import logo from "../../assets/icons/all.png";
import { globalStyles } from "../components/commonStyles";
import cartImg from "../../assets/icons/cart.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Details({ route, navigation }) {
  const [countNum, setCountNum] = useState(0);
  const [logBox, setLogBox] = useState(false);
  const [reRender, setReRender] = useState(0);
  const [loadObj, setLoadObj] = useState(route.params.cartItems);
  const [favorites, setFavorites] = useState(0);
  const [force, setForce]= useState(0)

  let time = 0;
  setTimeout(() => {
    time++;
  }, 500);

  useEffect(() => {
    AsyncStorage.getItem("cart").then((res) => {
      let cartString = res;
      let cartList = JSON.parse(cartString);

      let filter = cartList.map((item) => item.itemID);
      let ind = filter.indexOf(loadObj.itemID);

      if (ind > -1) {
        setCountNum(cartList[ind].count);
        setReRender(cartList[ind].count);
        setForce(cartList[ind].count);
      }
    });
  },[]);

  const fav = ()=>{

    AsyncStorage.getItem('favorites').then((res)=>{
      let favList = JSON.parse(res)
      if(res){
        favList = favList.map(item=>item.itemID)
        let index = favList.indexOf(loadObj.itemID)
        if(index != -1){
          setFavorites(1)
        }else{
          setFavorites(0)
        }


      }
    }).catch((err)=>{
      // alert(err)
    })
  }
  useEffect(()=>{
    fav()
  })
  const handleLoadCart = async (par) => {
    let cartString = await AsyncStorage.getItem("cart");
    let cartList = JSON.parse(cartString);

    let filter = cartList.map((item) => item.itemID);
    let ind = filter.indexOf(loadObj.itemID);

    if (ind != -1) {
      if (par == "Add") {
        cartList[ind].count += 1;
      } else {
        if (par == "SubNull") {
          cartList[ind].count = 0;
          if (cartList[ind].count < 1) {
            cartList.splice(ind, ind + 1);
          }
        } else {
          cartList[ind].count -= 1;
        }
      }
    } else {
      if (par == "Add") {
        cartList.push(loadObj);
      }
    }

    cartString = JSON.stringify(cartList);
    await AsyncStorage.setItem("cart", cartString);
  };
  return (
    <View
      style={[
        globalStyles.main,
        {
          paddingTop: -20,
        },
      ]}
    >
      <BackButton props={{ navigation: navigation, title: "Details" }} />
      {logBox ? (
        <View
          style={[
            globalStyles.container,
            {
              paddingTop: 100,
              paddingBottom: 100,
              // flex:1,
              position:'absolute',
              backgroundColor: "white",
              zIndex: 3,
              top: "30%",
              left: "5%",
              boxShadow: " rgba(149, 157, 165) 0px 8px 24px",
              width: "90%",
              borderRadius:10
            },
          ]}
        >
          <Text
            style={[
              globalStyles.iText,
              {
                textAlign: "center",
              },
            ]}
          >
            Want to continue shopping?
          </Text>
          <TouchableOpacity
            onPress={async () => {
              setLogBox(false);
              navigation.goBack()
            }}
            style={[
              globalStyles.container,
              {
                width:140,
                paddingTop:5,
                paddingBottom:5,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={[
                globalStyles.bText,
                {
                  fontSize: 16,
                },
              ]}
            >
              Sure
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLogBox(false);
              navigation.navigate("Cart");
            }}
            style={[
              globalStyles.container,
              {
                width:140,
                paddingTop:5,
                paddingBottom:5,
                marginTop: 10,
                backgroundColor:'rgb(74,4,4)'
              },
            ]}
          >
            <Text
              style={[
                globalStyles.bText,
                {
                  fontSize: 15,
                  color:'white'
                },
              ]}
            >
              Go to Cart
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <View
        style={[
          styles.buttons,
          {
            right: 25,
            overflow: "hidden",
            position: "absolute",
            top: 15,
            zIndex:4
          },
        ]}
      >
        <View
          style={
            {
              // transform: "rotate(-45deg)",
            }
          }
        >
          <Rating
            type="heart"
            ratingColor="rgb(74, 4, 4)"
            ratingCount={1}
            // size={3}
            // imageSize={15}
            ratingBackgroundColor="rgb(74, 4, 4)"
            startingValue={favorites}
            onFinishRating={() => {
              let favItem = route.params.cartItems;
              let paramList = [];
              paramList.push(favItem);
              AsyncStorage.getItem("favorites").then((res)=>{
                let storeList = res
                storeList = JSON.parse(storeList);
                let set = [...new Set([...storeList, ...paramList])];
                set = JSON.stringify(set);
                AsyncStorage.setItem("favorites", set).then(()=>{

                  fav()
                });
              });
             
            }}
            readonly = {favorites == 1?true:false}
          />
        </View>
      </View>

      <ScrollView
        style={{
          marginTop: 30,
          maxHeight: "85%",
          overflow: "hidden",
          // backgroundColor:'red'
        }}
      >
        <ImageBackground
          style={{
            height: 250,
          }}
          source={{ uri: loadObj.thumbNail }}
          imageStyle={{
            borderRadius: 15,
          }}
        />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 20,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if(force <1){
                setForce(0)
              }else{
                setForce(force - 1)
              }
              if (countNum > 1) {
                setReRender(reRender - 1);
                handleLoadCart("Sub");
              } else {
                setCountNum(0);
                setReRender(0);
                handleLoadCart("SubNull");
              }
            }}
            style={[
              globalStyles.buttons,
              {
                // position: "relative",
                marginLeft: -50,
                marginTop: -0,
                height: 35,
                width: 35,
                // borderRadius: 7,
                backgroundColor: "rgb(74, 4, 4)",
              },
            ]}
          >
            <Text
              style={{
                transform: [{ rotate: "135deg" }],
                // transform: "rotate(135deg)",
                fontSize: 20,
                marginTop: 5,
                textAlign: "center",
                marginLeft: -0,
                color: "white",
                // fontWeight:'bold'
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: 50,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                marginLeft: 40,
              }}
            >
              {reRender}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if(force >=0){
                setForce(force + 1)
              }else{
                setForce(0)
              }
              if(loadObj.status == '1'){
              setReRender(reRender + 1);
              handleLoadCart("Add");
            }}}
            style={[
              globalStyles.buttons,
              {
                // position: "relative",
                marginTop: -0,
                // margin: "0",
                height: 35,
                width: 35,
                // borderRadius: 7,
                backgroundColor: "rgb(74, 4, 4)",
              },
            ]}
          >
            <Text
              style={{
                transform: [{ rotate: "135deg" }],
                // transform: "rotate(135deg)",
                fontSize: 20,
                marginTop: 3,
                textAlign: "center",
                marginLeft: -0,
                color: "white",
                // fontWeight:'bold'
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor:'red'
            
            paddingBottom:20,
            paddingTop:20,
          }}
        >
          <View
            style={{
              width: "95%",
              // border: "2px solid rgb(74, 4, 4)",
              borderRadius: 20,
              padding: 10,

              shadowColor: "black",
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
              backgroundColor:'white',
              // borderWidth:1
              // boxShadow: " rgba(149, 157, 165) 0px 8px 24px",
            }}
          >
            <AirbnbRating
              showRating={false}
              size={12}
              count={5}
              defaultRating={loadObj.rating}
              isDisabled
              selectedColor="rgb(74, 4, 4)"
            />
            <Text
              style={{
                fontSize: 20,
                marginTop: 5,
              }}
            >
              {loadObj.name}
            </Text>
            <Text
              style={{
                // marginTop: 5,
                fontSize: 13,
                color: "grey",
              }}
            >
              {loadObj.description}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
              }}
            >
              Packaging: {loadObj.packaging} /=
            </Text>
            <Text
              style={{
                fontSize: 14,
              }}
            >
              item Price: {loadObj.price} /=
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Total Price
            </Text>
            <Text>
              {" "}
              <Text
                style={{
                  fontSize: 40,
                  color: "brown",
                }}
              >
                {parseInt(loadObj.price) + parseInt(loadObj.packaging)}
              </Text>
              /=
            </Text>
            {/* <Text>{force}</Text> */}
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 20,
                bottom: 20,
                height: 35,
                width: 35,
                // borderRadius: "100%",
                boxShadow: " rgba(149, 157, 165) 0px 8px 24px",
              }}
              onPress={() => {
                setLogBox(true);
              }}
            >
              <ImageBackground
                source={cartImg}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    position: "absolute",
                    top: -15,
                    right: 0,
                  }}
                >
                  {force}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNav props={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
  },
  buttons: {
    border: "2px solid rgb(74, 4, 4)",
    height: 45,
    width: 45,
    // borderRadius: 10,
    // transform: "rotate(45deg)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    // position: "fixed",
  },
});

export default Details;
