import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/AuthScreens/Home";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "../Screens/AuthScreens/SignUp";
import Login from "../Screens/AuthScreens/Login";
import ForgetPassword from "../Screens/AuthScreens/ForgetPassword";
import MapMain from "../Screens/Main/Main";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="MapMain" component={MapMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
