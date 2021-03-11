import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/AuthScreens/Home";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "../Screens/AuthScreens/SignUp";
import Login from "../Screens/AuthScreens/Login";
import ForgetPassword from "../Screens/AuthScreens/ForgetPassword";
import MapMain from "../Screens/Main/Main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {StatusBar} from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const Stack = createStackNavigator();

function MyStack() {

  const [appLoading, setAppLoading] = useState(true)

  const tryLogin = async () => {
    const userStorage = await AsyncStorage.getItem("userData");

    if (userStorage != null) {
      const user = JSON.parse(userStorage);
      console.log(user)
      if (user.token != undefined && user.token != null) {
        console.log(user.token)
      }
      // dispatch(authActions.Authenticate(user));
    }
    setTimeout(() => {
      // setAppLoading(false);
      console.log("Loading....")
    }, 1000);
  };

  useEffect(() => {
    tryLogin()
  }, [])

  {appLoading && (
    <>
      <StatusBar backgroundColor={"#FFF"} />
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ContentLoader
          backgroundColor="#f5f5f5"
          foregroundColor="#dbdbdb"
          speed={1}
          width={WIDTH}
          height={HEIGHT}
        >
          <Circle cx={60} cy="90" r="40" />
          <Rect
            x="20"
            y="200"
            rx="5"
            ry="5"
            width={WIDTH - 40}
            height="50"
          />
          <Rect
            x="20"
            y="260"
            rx="5"
            ry="5"
            width={WIDTH - 40}
            height="50"
          />
          <Rect
            x="20"
            y="320"
            rx="5"
            ry="5"
            width={WIDTH - 40}
            height="50"
          />
          <Rect
            x="20"
            y="380"
            rx="5"
            ry="5"
            width={WIDTH - 40}
            height="50"
          />
          <Rect
            x="20"
            y="440"
            rx="5"
            ry="5"
            width={WIDTH - 40}
            height="50"
          />
          <Rect
            x="0"
            y={HEIGHT - 60}
            rx="0"
            ry="0"
            width={WIDTH}
            height="50"
          />
        </ContentLoader>
        <Text
          style={{
            fontFamily: FONTFAMILY.Regular,
            fontSize: 10,
            zIndex: 999999999,
            position: "absolute",
            color: "#000",
            bottom: 0,
          }}
        >
          v1.3.9
        </Text>
      </View>
    </>
  )}

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
