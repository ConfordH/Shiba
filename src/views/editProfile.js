import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";
import Logo from "../components/logo";
import axios from "axios";
import refresh from "../../assets/icons/refresh.png";

function EditProfile({ route, navigation }) {
  const [user, setUser] = useState(route.params.params.userData);

  const countries = ["Egypt", "Ireland"];

  const [Email, setEmail] = useState(user.Email);
  const [Phone, setPhone] = useState(user.Phone);
  const [Name, setName] = useState(user.Name);
  const [Institution, setInstitution] = useState(user.campusID);
  const [Password, setPassword] = useState(user.Password);
  const [prevEmail, setPrevEmail] = useState(user.Email);
  const [userID, setUserID] = useState(user.userID);
  const [loadingCamp, setLoading] = useState(true);
  const [campList, setCampList] = useState([]);
  const [tempCampName, setCampName] = useState(user.campName);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    // setLoading(true);
    axios({
      method: "GET",
      url: "http://shiba.co.ke/shiba/getCamps.php",
    })
      .then((res) => {
        // alert(JSON.stringify(res.data))
        let filterList = res.data.map((item) => item.name);
        let filterSpecs = res.data.map((item) => item.regionSpecs);

        let tempCampList = [];
        filterList.forEach((value, ind) => {
          let myString = `${filterList[ind]}, ${filterSpecs[ind]}`;
          tempCampList.push(myString);
        });

        setCampList(tempCampList);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(`Something broke!`);
        setReload(true);
      });
  }, [campList]);
  // alert(user.Name)
  const handleUpdate = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "http://shiba.co.ke/shiba/updateProfile.php",
      data: {
        Email: Email,
        Phone: Phone,
        Name: Name,
        Institution: Institution,
        Password: Password,
        prevEmail: prevEmail,
        userID: userID,
      },
    })
      .then(async (response) => {
        setLoading(false);
        try {
          if (response.data.Name != undefined) {
            let data = JSON.stringify(response.data);

            await AsyncStorage.setItem("user", data);
            console.log("response", response.data);
            alert("Profile Saved");

            navigation.goBack();
            // window.location.reload();
          } else {
            alert(response.data);
          }
        } catch (e) {
          alert("Failed, check on your network");
        }
      })
      .catch((er) => {
        setLoading(false);
        alert("er");
      });
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
          // border:'2px solid red',
        }}
      >
        <BackButton props={{ navigation: navigation, title: "Edit Profile" }} />
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
      <ScrollView
        style={{
          // borderWidth:1,
          marginTop: 50,
        }}
        contentContainerStyle={{
          // borderWidth:1,
          flexGrow: 1,
          // justifyContent:'center'
          alignItems: "center",
        }}
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
          placeholder={user.Name}
          onChangeText={(e) => setName(e)}
        />
        <TextInput
          style={[globalStyles.LButtons, globalStyles.iText]}
          placeholder={user.Email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          style={[globalStyles.LButtons, globalStyles.iText]}
          placeholder={user.Phone}
          onChangeText={(e) => setPhone(e)}
        />
        <SelectDropdown
          data={campList}
          onSelect={(value, ind) => {
            setInstitution(ind + 1);
            // alert(ind)
          }}
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              // outline: "none",
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
          defaultButtonText={tempCampName}
          // placeholder="Choose institution"
          dropdownStyle={{
            backgroundColor: "white",
            border: "2px solid rgb(74, 4, 4)",
            backgroundColor: "#FAFAFA",
          }}
          rowTextStyle={{
            fontSize: 15,
            paddingLeft: 4,
          }}
          rowStyle={{
            marginTop: 10,
            padding: 10,
            borderBottom: "2px solid rgb(74, 4, 4)",
          }}
        />
        {loadingCamp ? <Text>loading...</Text> : <></>}
        {reload ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                fetch();
              }}
            >
              <ImageBackground
                source={refresh}
                style={{
                  height: 10,
                  width: 10,
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
              marginTop: 20,
              backgroundColor: "rgb(74,4,4)",
            },
          ]}
        >
          <Text style={[globalStyles.bText, { color: "white" }]}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
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

export default EditProfile;
