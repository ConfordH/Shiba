import React from "react";
import { View, Text, TouchableOpacity } from "react-native-web";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";
import Logo from "../components/logo";

function Confirm({ navigation }) {
  console.log(navigation);
  return (
    <View
      style={[
        {
          height: "100%",
          backgroundColor: "white",
        },
      ]}
    >
      <BackButton props={{ navigation: navigation, title: "" }} />
      <Logo/>

      <View style={[globalStyles.container,{
        marginTop:'30%',
        border:'none'
      }]}>
        <Text
          style={{
            fontSize: 25,
            color: "rgb(74, 4, 4)",
          }}
        >
          Check you mail
        </Text>
        <Text
          style={[
            globalStyles.iText,
            {
              width: "80%",
              textAlign: "center",
              color: "grey",
              marginBottom: "15%",
              marginTop: 10,
            },
          ]}
        >
          We have sent you a mail, please check your inbox/spam folder
        </Text>

        <TouchableOpacity
          style={[globalStyles.container, globalStyles.LButtons]}
          onPress={()=>{navigation.navigate('LandPage')}}
        >
          <Text style={[globalStyles.bText,{
            color:"rgb(74, 4, 4)"
          }]}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Confirm;
