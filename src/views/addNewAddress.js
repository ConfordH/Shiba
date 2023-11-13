import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";

function AddNewAddress({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [edit, setEdit] = useState("");
  const [indItem, setIndItem] = useState("");
  const [remove,setRemove] = useState(false);

  const [addresses, setAddresses] = useState([]);

  console.log();
  useEffect( () => {
    const willFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("addresses")
        .then((res) => {
          if (res) {
            let array = JSON.parse(res);
            setAddresses(array);

            if (route.params.ops == "Edit") {
              let filter = array.map((item) => item.room);
              let ind = filter.indexOf(route.params.room);
              setEdit(array[ind]);
              setIndItem(ind)
              setRemove(true)

              setTitle(array[ind].title)
              setRoom(array[ind].room)
              setPhone(array[ind].phone)
              setDetails(array[ind].details)
              setLocation(array[ind].location)
            } else {
              console.log(route.params);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return willFocus;
  }, []);

  return (
    <View style={[globalStyles.main]}>
      <View style={{
        marginTop:-20,
      }}>
      <BackButton props={{ navigation: navigation, title: "Add New Address" }} />
      </View>
      <View
        style={[
          globalStyles.container,
          {
            marginTop: 0,
            height: "85%",
            borderWidth:0
          },
        ]}
      >
        <Text
          style={{
            fontSize: 23,
            color: "rgb(74, 4, 4)",
            // marginTop: 20,
          }}
        >
          Address
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "grey",
          }}
        >
          {route.params.ops} Address
        </Text>

        <TextInput
          style={[
            globalStyles.LButtons,
            globalStyles.iText,
            {
              marginTop: 40,
            },
          ]}
          placeholder={
            edit ? edit.title : "Title of Address e.g My Class Address"
          }
          onChangeText={(e) => {
            setTitle(e);
          }}
        />
        <TextInput
          style={[globalStyles.LButtons, globalStyles.iText]}
          placeholder={edit ? edit.location : "Part of institution e.g Hostel"}
          
          onChangeText={(e) => {
            setLocation(e);
          }}
        />
        <TextInput
          style={[globalStyles.LButtons, globalStyles.iText]}
          placeholder={
            edit ? edit.room : "Room number e.g C14, pref 02/03 e.t.c"
          }
          onChangeText={(e) => {
            setRoom(e);
          }}
        />
        <TextInput
          style={[globalStyles.LButtons, globalStyles.iText]}
          placeholder={edit ? edit.phone : "Phone number i.e Delivery number"}
          
          onChangeText={(e) => {
            setPhone(e);
          }}
        />
        <TextInput
          style={[globalStyles.LButtons, globalStyles.iText]}
          placeholder={edit ? edit.details : "More specific details"}
          
          onChangeText={(e) => {
            setDetails(e);
          }}
          ay
        />
        <TouchableOpacity
          onPress={async () => {
            if (route.params.ops != "Edit") {
              let array = await AsyncStorage.getItem("addresses");
              array = JSON.parse(array);
              let check = array.map((item) => item.room);

              if (check.indexOf(room) == -1) {
                if (
                  title != "" &&
                  location != "" &&
                  room != "" &&
                  phone != "" &&
                  details != ""
                ) {
                  let addObj = {
                    title: title,
                    location: location,
                    room: room,
                    phone: phone,
                    details: details,
                  };
                  addresses.push(addObj);
                  let string = JSON.stringify(addresses);
                  await AsyncStorage.setItem("addresses", string);
                  navigation.goBack();
                } else {
                  alert("some fields are missing");
                }
              } else {
                alert(`the address for ${room} is already created`);
              }
            } else {
              addresses[indItem].room = room
              addresses[indItem].title = title
              addresses[indItem].location = location
              addresses[indItem].details = details
              addresses[indItem].phone = phone

              let editString = JSON.stringify(addresses)
              await AsyncStorage.setItem('addresses', editString)

              alert('Done!')
              navigation.goBack()
            }
          }}
          style={[
            globalStyles.container,
            globalStyles.LButtons,
            {
              marginTop: 50,
              backgroundColor: "rgb(74, 4, 4)",
            },
          ]}
        >
          <Text
            style={[
              globalStyles.bText,
              {
                color: "white",
              },
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
{remove?
        <TouchableOpacity
        onPress= {async()=>{
          addresses.splice(indItem, indItem+1)
          let stringInd = JSON.stringify(addresses)
          await AsyncStorage.setItem('addresses',stringInd)
          navigation.goBack()
        }}
          style={[
            globalStyles.container,
            globalStyles.LButtons,
            {
              marginTop: 10,
              backgroundColor: "rgb(74, 4, 4)",
            },
          ]}
        >
          <Text
            style={[
              globalStyles.bText,
              {
                color: "white",
              },
            ]}
          >
            remove
          </Text>
        </TouchableOpacity>:<></>}
      </View>
    </View>
  );
}

export default AddNewAddress;
