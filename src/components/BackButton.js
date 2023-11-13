import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { globalStyles } from "./commonStyles";

const BackButton = ({props})=>{
  // console.log('back',props.navigation)
  
    return(
<View>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={[globalStyles.buttons]}
        >
          <View
            style={{
              // borderLeft: "3px solid rgb(74, 4, 4)",
              // borderBottom: "3px solid rgb(74, 4, 4)",
              borderColor: "rgb(74, 4, 4)",
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              height: 13,
              marginLeft: 5,
              width: 13,
            }}
          />
        </TouchableOpacity>
        <Text style={[globalStyles.title]}>
          {props.title}
        </Text>
      </View>
    )
};
export default BackButton