import { Component, React, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/views/Home";
import Details from "./src/views/Details";
import Cart from "./src/views/cart";
import Favorites from "./src/views/favorites";
import AddAddress from "./src/views/addAddress";
import AddAnotherAdd from "./src/views/addAnotherAdd";
import CartDetails from "./src/views/cartDetails";
import Search from "./src/views/search";

import BottomNav from "./src/components/bottomNav";
import TopHeader from "./src/components/topHeader";

import props from "./src/props/props";
import DelMessage from "./src/views/delMessage";
import Orders from "./src/views/orders";
import LandPage from "./src/views/landPage";
import LogIn from "./src/views/logIn";
import ForgotPass from "./src/views/forgotPass";
import Confirm from "./src/views/confirm";
import SignUp from "./src/views/signUp";
import Profile from "./src/views/Profile";
import MyAddress from "./src/views/myAddress";
import AddNewAddress from "./src/views/addNewAddress";
import EditProfile from "./src/views/editProfile";
import Views from "./src/views/view";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Info from "./src/views/info";
import ChangePass from "./src/views/changePass";
import Hotel from "./src/views/hotel";

const Stack = createNativeStackNavigator();

class App extends Component {
  // const [isLoggedIn, setLoggedIn] = useState(true);

  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
    };
  }

  getUser=async()=>{

    try {
      let token = await AsyncStorage.getItem("isLoggedIn");

      if (token) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    } catch (error) {
      console.log(error);
    }
  }
   componentDidMount() {
    this.getUser()
  }
  componentDidUpdate(){
    this.getUser()
  }

  render() {
    if (this.state.isLoggedIn == true) {
      return (
        <NavigationContainer>
          {/* {true?<TopHeader props={navigation} />:<></>} */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddAddress"
              component={AddAddress}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DelMessage"
              component={DelMessage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyAddress"
              component={MyAddress}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddNewAddress"
              component={AddNewAddress}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CartDetails"
              component={CartDetails}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Hotel"
              component={Hotel}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Views"
              component={Views}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Info"
              component={Info}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChangePass"
              component={ChangePass}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandPage">

          <Stack.Screen
              name="LandPage"
              component={LandPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPass"
              component={ForgotPass}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Confirm"
              component={Confirm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
const headerNone = {
  headerShown: false,
};

export default App;
