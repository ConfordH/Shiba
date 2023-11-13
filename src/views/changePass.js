import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";
import Logo from "../components/logo";
import axios from "axios";
import md5 from "md5";

function ChangePass({ route, navigation }) {
  const [user, setUser] = useState(route.params.params.userData);

  const [Email, setEmail] = useState(user.Email);
  const [Password, setPassword] = useState(user.Password);
  const [curPassWord, setCurPassWord] = useState("");
  const [newPassword, setNewPassword] = useState(user.Password);
  const [userID, setUserID] = useState(user.userID);
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    if (Password == md5(curPassWord)) {
      axios({
        method: "POST",
        url: "http://shiba.co.ke/shiba/changePass.php",
        data: {
          Email: Email,
          Password: Password,
          newPassword: newPassword,
          userID: userID,
        },
      }).then(async (response) => {
        try {
          if (response.data.Password != undefined) {
            user["Password"] = response.data.Password;

            let data = JSON.stringify(user);
            await AsyncStorage.setItem("user", data);
            console.log("response", user);
            alert("Password Saved");
            window.location.reload();
          } else {
            alert(response.data);
            setLoading(false);
          }
        } catch (e) {
          alert("error somewhere!");
          setLoading(false);
        }
      });
    } else {
      alert("Password wasn't recognized");
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
      <View
        style={{
          position: "absolute",
          zIndex: 4,
          width: "100%",
          // border:'2px solid red'r
        }}
      >
        <BackButton
          props={{ navigation: navigation, title: "Change Password" }}
        />
      </View>

      <View
        style={{
          // border:'2px solid red',
          marginTop: 20,
          width: "100%",
          zIndex: 0,
          // position:'absolute',top:'0',
          // border:'2px solid red'
          overflow: "hidden",
        }}
      >
        <Logo />
      </View>
      <View
        style={[
          globalStyles.container,
          {
            marginTop: 60,
            // height: "85%",
            backgroundColor: "white",
            // border: "none",
            borderWidth: 0,
          },
        ]}
      >
        <Text>*Leave field blank if you don't want to change it</Text>
        <TextInput
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              // marginTop: 70,
            },
          ]}
          placeholder="Enter current password"
          onChangeText={(e) => setCurPassWord(e)}
          secureTextEntry={true}
        />
        <TextInput
          style={[globalStyles.LButtons, globalStyles.iText]}
          placeholder="Enter new password"
          onChangeText={(e) => setNewPassword(e)}
          secureTextEntry={true}
        />
        {loading ? (
          <Text
            style={{
              marginTop: 20,
            }}
          >
            loading...
          </Text>
        ) : (
          <></>
        )}
        <TouchableOpacity
          onPress={() => {
            handleUpdate();
          }}
          style={[
            globalStyles.container,
            globalStyles.LButtons,
            {
              marginTop: 30,
              backgroundColor: "rgb(74,4,4)",
            },
          ]}
        >
          <Text style={[globalStyles.bText, { color: "white" }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    border: "2px solid red",
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

export default ChangePass;
