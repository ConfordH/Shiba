import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { globalStyles } from "../components/commonStyles";
import { LinearGradient } from "expo-linear-gradient";

import logo from "../../assets/icons/logo.png";
import image1 from "../../assets/images/image2.png";

function LandPage({ navigation }) {
  // console.log(navigation);
  return (
    <SafeAreaView>
      <ImageBackground
        source={image1}
        style={[
          globalStyles.container,
          {
            borderWidth: 0,
            height: "100%",
            backgroundColor: "white",
            padding: 10,
          },
        ]}
        imageStyle={{
          // top:'200px'
          resizeMode: "cover",
          height: "55%",
          // ,width:'80'
          // borderWidth:1,border
          // borderColor:'rgb(74, 4, 4)',
        }}
      >
        <LinearGradient
          // end={{x: 0, y: 0.8}}
          colors={["transparent", "#ffffff"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "56%",
          }}
        />
        <ImageBackground
          source={logo}
          style={[
            globalStyles.container,
            {
              height: 120,
              width: 120,
              // marginTop: 100,
              borderRadius: 10,
              backgroundColor: "rgb(255, 255, 255)",
            },
          ]}
          imageStyle={{
            height: "90%",
            width: "90%",
            top: "5%",
            left: "5%",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "brown",
            resizeMode: "center",
          }}
        ></ImageBackground>
        <Text
          style={{
            fontSize: 30,
            color: "rgb(94, 4, 4)",
            marginTop: "60%",
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 15,
            width: "80%",
            marginTop: 10,
            marginBottom: "10%",
            textAlign: "center",
          }}
        >
          To shiba, happy ordering and eating
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LogIn");
          }}
          style={[
            globalStyles.container,
            styles.pgButtons,
            { backgroundColor: "rgb(74, 4, 4)", borderRadius: 10 },
          ]}
        >
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={[globalStyles.container, styles.pgButtons]}
        >
          <Text
            style={{ fontSize: 15, fontWeight: "bold", color: "rgb(74, 4, 4)" }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pgButtons: {
    width: "90%",
    height: 45,
    marginTop: 25,
    borderRadius: 10,
  },
});
export default LandPage;
