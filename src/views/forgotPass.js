import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Linking,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";

import logo from "../../assets/icons/logo.png";
import Logo from "../components/logo";
function ForgotPass({ navigation }) {
  const [Email, setEmail] = useState("");

  const handleRecover = () => {
    if (Email != "") {
      console.log("handle recover password");
    } else {
      alert("Field is empty");
    }
  };
  return (
    <View
      style={[
        {
          height: "100%",
          backgroundColor: "white",
        },
      ]}
    >
      <BackButton props={{ navigation: navigation, title: "Recover" }} />
      <Logo />
      <View
        style={[
          globalStyles.container,
          {
            marginTop: 50,
            borderWidth: 0,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 28,
            color: "rgb(74, 4, 4)",
            marginBottom: 50,
          }}
        >
          Forgot Password
        </Text>
        <Text
          style={[
            globalStyles.iText,
            {
              width: "80%",
              textAlign: "center",
              // marginBottom: "1%",
            },
          ]}
        >
          Enter your registered email or phone number
        </Text>
        <TextInput
          style={[
            globalStyles.LButtons,
            {
              outline: "none",
            },
          ]}
          placeholder="example@gmail.com"
          onChangeText={(event) => {
            setEmail(event);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("http://shiba.co.ke/shiba/recover.php");
          }}
          style={[
            globalStyles.container,
            globalStyles.LButtons,
            {
              backgroundColor: "rgb(74,4,4)",
            },
          ]}
        >
          <Text style={[globalStyles.bText, { color: "white" }]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgotPass;
