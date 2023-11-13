import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { globalStyles } from "../components/commonStyles";

export default function Info({ navigation }) {
  return (
    <SafeAreaView style={[globalStyles.main]}>
      <BackButton props={{ navigation: navigation, title: "" }} />

      <View
        style={[
          globalStyles.container,
          {
            height: "70%",
            marginTop: "5%",
            // ,border:'none'
            borderWidth: 0,
          },
        ]}
      >
        <Text
          style={{
            marginTop: 10,
            letterSpacing: 10,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          {" "}
          h~Conford.
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          || powered by CodeMonks
        </Text>

        <Text
          style={{
            bottom: 0,
            fontSize: 8,
            textAlign: "center",
          }}
        >
          hamiltonconford001@gmail.com
        </Text>
      </View>
    </SafeAreaView>
  );
}
