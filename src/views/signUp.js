import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Link,
  Linking,
  // CheckBox
} from "react-native";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";
import axios from "axios";
import Picker from "react-native-picker-select";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { CheckBox } from "@react-native-community/checkbox";
const countries = ["Egypt", "Ireland", "Ireland", "Ireland"];

function SignUp({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Name, setName] = useState("");
  const [Institution, setInstitution] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [campList, setCampList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    axios({
      method: "GET",
      url: "http://shiba.co.ke/shiba/getCamps.php",
    })
      .then((res) => {
        // alert(JSON.stringify(res.data))
        if (typeof res.data != "string") {
          let filterList = res.data.map((item) => item.name);
          let filterSpecs = res.data.map((item) => item.regionSpecs);

          let tempCampList = [];
          filterList.forEach((value, ind) => {
            let myString = `${filterList[ind]}, ${filterSpecs[ind]}`;
            tempCampList.push(myString);
          });

          setCampList(tempCampList);
          setLoading(false);
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("Sorry, you might be offline");
        setReload(true);
      });
  }, [campList]);

  const handleSignIn = () => {
    setLoading(true);

    if (
      Email != "" &&
      Password != "" &&
      confirmPassword != "" &&
      Institution != "" &&
      Name != "" &&
      Phone != ""
    ) {
      if (Password == confirmPassword) {
        axios({
          method: "POST",
          url: "http://shiba.co.ke/shiba/signUp.php",
          data: {
            Email: Email,
            Phone: Phone,
            Name: Name,
            Institution: Institution,
            Password: Password,
          },
        })
          .then(async (response) => {
            try {
              if (response.data.Name) {
                let data = JSON.stringify(response.data);

                await AsyncStorage.setItem("user", data);
                await AsyncStorage.setItem("isLoggedIn", "true");
                await AsyncStorage.setItem("cart", JSON.stringify([]));
                await AsyncStorage.setItem("addresses", JSON.stringify([]));
                await AsyncStorage.setItem("favorites", JSON.stringify([]));
                window.location.reload();
              } else {
                alert(response.data);
                setLoading(false);
              }
            } catch (e) {
              console.log(e);
              setLoading(false);
            }
          })
          .catch(() => {
            alert("Sorry, network issues");
            setLoading(false);
          });
      } else {
        alert("Passwords din't match");
        setLoading(false);
      }
    } else {
      alert("Some fields are not filled");
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
          flex: 1,
        }}
      >
        <BackButton props={{ navigation: navigation, title: "Sign Up" }} />
      </View>
      <View
        style={[
          globalStyles.container,
          {
            marginTop: 100,
            height: "85%",
            backgroundColor: "white",
            borderWidth: 0,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 25,
            color: "rgb(94, 4, 4)",
            // marginTop: 20,
          }}
        >
          Register
        </Text>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          create your new account
        </Text>
        {loading ? (
          <Text
            style={{
              marginTop: 30,
            }}
          >
            Loading...
          </Text>
        ) : (
          <Text
            style={{
              marginTop: 30,
            }}
          ></Text>
        )}

        <TextInput
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              marginTop: 10,
              outline: "none",
            },
          ]}
          placeholder="Email "
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              outline: "none",
            },
          ]}
          placeholder="Phone number"
          onChangeText={(text) => {
            setPhone(text);
          }}
        />
        <TextInput
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              outline: "none",
            },
          ]}
          placeholder="firstName secondName"
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <SelectDropdown
          data={campList}
          onSelect={(value, ind) => {
            setInstitution(ind + 1);
          }}
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              outline: "none",
            },
          ]}
          buttonStyle={{
            width: "90%",
            borderWidth: 1,
            borderColor: "rgb(74, 4, 4)",
            borderRadius: 10,
            height: 50,
            justifyContent: "flex-end",
            alignItems: "center",
            // paddingLeft: 10,
            marginTop: 15,
            backgroundColor: "transparent",
          }}
          buttonTextStyle={{
            fontSize: 15,
            textAlign: "left",
            color: "grey",
          }}
          defaultButtonText="Choose institution"
          // placeholder="Choose institution"
          dropdownStyle={[
            {
              backgroundColor: "white",
              border: "2px solid rgb(74, 4, 4)",
              backgroundColor: "#FAFAFA",
              textAlign: "left",
            },
          ]}
          rowTextStyle={{
            fontSize: 18,
            textAlign: "left",
            // paddingLeft: 15,
          }}
          rowStyle={{
            marginTop: 10,
            padding: 10,
            borderBottom: "2px solid rgb(74, 4, 4)",
          }}
        />

        <TextInput
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              outline: "none",
            },
          ]}
          placeholder="Password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <TextInput
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              outline: "none",
            },
          ]}
          placeholder="Confirm Password"
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          secureTextEntry={true}
        />

        <View
          style={[
            globalStyles.container,
            {
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 20,
              // marginTop: "5%",
              borderWidth: 0,
            },
          ]}
        >
          {/* <CheckBox
            value={isSelected}
            onValueChange={() => {
              if (isSelected == false) {
                setSelection(true);
                setDisabled(false);
              } else {
                setSelection(false);
                setDisabled(true);
              }
            }}
          /> */}
          <Text
            style={[
              globalStyles.iText,
              {
                paddingLeft: 10,
                marginTop: 20,
              },
            ]}
          >
            By clicking agree to our{" "}
            <Text
              style={{
                color: "rgb(74, 4, 4)",
              }}
              onPress={() => {
                Linking.openURL("http://shiba.co.ke/shiba/policy.txt");
              }}
            >
              terms and conditions
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={isDisabled}
          style={[
            globalStyles.container,
            globalStyles.LButtons,
            {
              marginTop: 20,
              backgroundColor: "rgb(74, 4, 4)",
            },
          ]}
          onPress={handleSignIn}
        >
          <Text style={[globalStyles.bText, { color: "white" }]}>Sign Up</Text>
        </TouchableOpacity>

        <Text
          style={[
            globalStyles.iText,
            {
              marginTop: 30,
            },
          ]}
        >
          Already having an account?{" "}
          <TouchableOpacity
            onPress={() => navigation.navigate("LogIn")}
            style={{
              color: "rgb(74, 4,4)",
            }}
          >
            <Text style={[globalStyles.iText]}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

export default SignUp;
