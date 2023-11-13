import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import BottomNav from "../components/bottomNav";
import { globalStyles } from "../components/commonStyles";
import Logo from "../components/logo";

import infoLogo from '../../assets/icons/infoLogo.png'
import powerIcon from '../../assets/icons/powericon.png'
function Profile({ navigation }) {
  // console.log(route)

  const [logBox, setLogBox] = useState(false);
  const [user, setUser] = useState(0);
  const [loader, setLoader]= useState(false)

  var globalObject = ["tempUser"];

  useEffect(() => {
    const willFocus = navigation.addListener('focus',()=>{
    setLoader(true)
    AsyncStorage.getItem("user").then((res) => {
        setUser(res);
        setLoader(false)
      });
    })
    return willFocus
  }, []);
  return (
    <View style={[globalStyles.main,{
    }]}>
    <View
      style={[
        globalStyles.container,
        {
          // borderRadius: "0",
          borderWidth:0,
          height: "100%",
          backgroundColor: "white",
        },
      ]}
    >
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate('Info')
      }}
          style={{
            position: "absolute",
            right: "7%",
            top: 60,
            height: 24,
            width: 24,
            // borderRadius:'100%',
            zIndex:4
          }}> 
        <Image
          source={infoLogo}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => {
        setLogBox(true);
      }}
          style={{
            position: "absolute",
            right: "7%",
            top: 100,
            border:'2px solid rgb(74, 4, 4)',
            height: 25,
            width: 25,
            // borderRadius:'100%',
            zIndex:4
          }}> 
        <Image
          source={powerIcon}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </TouchableOpacity>
      {logBox ? (
        <View
          style={[
            globalStyles.container,
            {
              padding: 100,
              position: "absolute",
              backgroundColor: "white",
              zIndex: 3,
            },
          ]}
        >
          <Text style={[globalStyles.iText]}>Are you sure?</Text>
          <TouchableOpacity
            onPress={async () => {
              AsyncStorage.removeItem('user');
              AsyncStorage.removeItem('isLoggedIn');
              window.location.reload();
            }}
            style={[
              globalStyles.container,
              {
                padding: 5,
                paddingLeft: 30,
                paddingRight: 30,
                marginTop: 20,
              },
            ]}
          >
            <Text style={[globalStyles.bText]}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLogBox(false);
            }}
            style={[
              globalStyles.container,
              {
                padding: 5,
                paddingLeft: 30,
                paddingRight: 30,
                marginTop: 10,
              },
            ]}
          >
            <Text style={[globalStyles.bText]}>cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          marginTop: -100,
          width: "100%",
        }}
      >
        <Logo />
      </View>
      <Text
        style={{
          fontSize: 18,
          marginTop: 30,
        }}
      >
        {JSON.parse(user).Name}
      </Text>
      <Text
        style={{
          fontSize: 10,
          width: "80%",
          color: "grey",
          //   marginBottom: "30%",
          textAlign: "center",
        }}
      >
        {JSON.parse(user).Email}
{'\n'}
        {JSON.parse(user).Phone}
      </Text>
      {loader?<Text style={{
        fontSize:12
      }}>loading...</Text>:<></>}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditProfile", {
            params: { userData: JSON.parse(user) },
          });
        }}
        style={[
          {
            backgroundColor: "rgb(74, 4, 4)",
            marginTop: 10,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
            marginBottom: 30,
          },
        ]}
      >
        <Text style={{ fontSize: 15, color: "white" }}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Favorites");
        }}
        style={[globalStyles.LButtons, { justifyContent: "center" }]}
      >
        <Text style={[globalStyles.iText]}>My Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyAddress");
        }}
        style={[globalStyles.LButtons, { justifyContent: "center" }]}
      >
        <Text style={[globalStyles.iText]}>My AddAddress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChangePass", {
            params: { userData: JSON.parse(user) },
          });
        }}
        style={[globalStyles.LButtons, { justifyContent: "center"}]}
      >
        <Text style={[globalStyles.iText]}>Change Password</Text>
      </TouchableOpacity>

    </View>
    <View style={{
      position:'absolute'
      ,bottom:0,
      marginLeft:'5%'
    }}>
    <BottomNav props={navigation} />

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pgButtons: {
    width: "90%",
    height: 50,
    marginTop: 25,
  },
});
export default Profile;
