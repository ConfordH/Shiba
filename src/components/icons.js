import React from "react";
import { ImageBackground } from "react-native";


function Icons({props}){
    return(
        
        <ImageBackground
          style={{
            height: "70%",
            width: "70%",
            // borderRadius: "100%",
            // border:'2px solid red'
          }}
          imageStyle={{
            // size
            height: "100%",
            width: "100%",
          }}
          source={props.iconName}
        />
    )
}

export default Icons