import React, { useEffect } from "react";
import { Text, TouchableOpacity,View } from "react-native";
import { SlideInUp } from "react-native-reanimated";
import { globalStyles } from "../components/commonStyles";
import Logo from "../components/logo";

function DelMessage({navigation}) {
  useEffect(()=>{
    navigation.addListener('beforeRemove', (e)=>{
      e.preventDefault()
    })
  })
  return (
    <View
      style={globalStyles.main}
    >
      <Logo/>
      <View>
        <Text
          style={{
            color: "rgb(74, 4, 4)",
            fontSize: 25,
            marginTop: 50,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Your food is on the way
        </Text>
        <Text
          style={{
            color: "grey",
            padding: 10,
            fontSize: 13,
            width:'80%',
            marginLeft:'10%',
            textAlign: "center",
          }}
        >
          Thank you for your order! you can track the delivery in 'Order'
          section
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            // marginTop: 10,
          }}
        >
          Est. Delivery Time : 24 mins
        </Text>
      </View>
      <TouchableOpacity
        style={[
          globalStyles.container,
          {
            height: 40,
            backgroundColor: "rgb(74, 4, 4)",
            width: "70%",
            marginLeft: "15%",
            marginTop: 40,
          },
        ]}
        onPress={()=>{navigation.push('Orders')}}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
          }}
        >
          Track My Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default DelMessage;
