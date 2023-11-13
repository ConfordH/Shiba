import React from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";

function AddAnotherAdd() {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <View style={styles.buttons}>
        <View
          style={{
            borderLeft: "3px solid black",
            borderBottom: "3px solid black",
            height: 13,
            marginLeft: 5,
            width: 13,
          }}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          //   marginTop: "1,
          fontSize: 20,
          position: "fixed",
          width: "100%",
          height: 100,
          backgroundColor: "white",
          paddingTop: 45,
          zIndex: "2",
        }}
      >
        Choose Address
      </Text>

      <TextInput
        style={{
          height: 50,
          width: "90%",
          backgroundColor: "grey",
          // borderRadius: 15,
          marginTop:150,
          color:'white'
        }}
        placeholder="Address Title"

      ></TextInput>
      <TextInput
        placeholder="Hostel/Class/Office ?"
        style={{
          height: 50,
          width: "90%",
          backgroundColor: "grey",
          // borderRadius: 15,
          color:'white',
          marginTop:'15px',
        }}
      ></TextInput>
      <TextInput
        placeholder="name"
        style={{
          height: 50,
          width: "90%",
          backgroundColor: "grey",
          // borderRadius: 15,
          marginTop:'15px'
        }}
      ></TextInput>
      <TouchableOpacity

        style={{
          height: 50,
          width: "90%",
          backgroundColor: "red",
          // borderRadius: 15,
          marginTop:'15px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Text style={{
            fontSize:25,
            color:"white",
        }}>Save</Text>
      </TouchableOpacity>
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
    position: "fixed",
    left: 20,
    position: "absolute",
    zIndex: "3",
  },
});
export default AddAnotherAdd;
