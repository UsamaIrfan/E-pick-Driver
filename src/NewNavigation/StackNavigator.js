import React, { useEffect, useState } from "react";
import { StatusBar, View, Dimensions, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { AuthScreenLogo } from "../Constants"
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../Screens/AuthScreens/Home";
import SignUp from "../Screens/AuthScreens/SignUp";
import Login from "../Screens/AuthScreens/Login";
import ForgetPassword from "../Screens/AuthScreens/ForgetPassword";
import EnterForgetCode from "../Screens/AuthScreens/EnterForgetCode";
import BottomTabNavigator from "./BottomTabNavigator";
import ChangePasswordAuth from "../Screens/AuthScreens/ChangePasswordAuth";
import Reports from "../Screens/Main/Reports";
import HelpScreen from "../Screens/Main/Help";
import Profile from "../Screens/Main/Profile";
import ChangePassword from "../Screens/Main/ChangePassword";
import AddDocument from "../Screens/Main/AddDocument";
import MainChat from "../Screens/Main/Chats.jsx";
import DocInfo from "../Screens/Main/DocInfo";
import Documents from "../Screens/Main/Documents";
import Trips from "../Screens/Main/Trips/index";

import * as AuthActions from "../Store/action/login";
import Fonts from "../Theme/Fonts";
import colors from "../Theme/Colors";
import { Ionicons, Feather } from "../Constants";
import SOSButton from "../components/Button";

const { width, height } = Dimensions.get("window");
const Stack = createStackNavigator();

function MyStack() {

  const [appLoading, setAppLoading] = useState(true);
  const [UserToken, setUserToken] = useState(null);

  const dispatch = useDispatch()

  const tryLogin = async () => {
    const userStorage = await AsyncStorage.getItem("userData");

    if (userStorage != null) {
      const user = JSON.parse(userStorage);
      if (user.token != undefined && user.token != null) {
        setUserToken(user.token);
      }
      dispatch(AuthActions.Authenticate(user))
    }
    setTimeout(() => {
      setAppLoading(false);
    }, 1000);
  };

  useEffect(() => {
    tryLogin();
  }, []);

  const userLoggedIn = useSelector(state => state.Auth.Login)

  const logoutHandler = async (navigation) => {
    await dispatch(AuthActions.LogoutFunc(userLoggedIn.userId, navigation))
  }

  const header = (navigation, route) => {
    let routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    let header = {
      headerStyle: {
        backgroundColor: colors.DarkGreen,
      },
      headerTitle: null,
      headerLeft: () => (<Text style={{ textAlign: 'left', color: colors.White, fontSize: 22, marginLeft: 20, fontFamily: Fonts.reg }}>{routeName}</Text>),
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerBackTitle: null,
      headerRight: () => {
        if (routeName != "Settings") {
          return (
            <View style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginRight: 10,
            }}>
              <View style={{ marginRight: 20 }}>
                <SOSButton />
              </View>
              <View style={{
                width: width * 0.18,
                height: height * 0.15,
                marginRight: width * 0.015,
              }}>
                <Image source={AuthScreenLogo} style={{
                  ...StyleSheet.absoluteFill,
                  width: "100%",
                  height: "100%",
                }} />
              </View>
            </View>
          )
        } else {
          return (
            <TouchableOpacity activeOpacity={0.5} style={{ flexDirection: "row", marginRight: 10, }} onPress={() => logoutHandler(navigation)}>
              <Feather name="log-out" size={22} color={colors.White} style={{ marginRight: 10, }} />
              <Text style={{ color: colors.White, fontFamily: Fonts.reg, fontSize: width * 0.05 }}>Logout</Text>
            </TouchableOpacity>
          )
        }
      },
    };

    return header;
  };

  if (appLoading) {
    return (
      <View style={{ position: "relative", flex: 1 }}>
        <StatusBar backgroundColor={"#000"} />
        <ContentLoader
          backgroundColor="#f5f5f5"
          foregroundColor="#dbdbdb"
          speed={1}
          width={width}
          height={height}
        >
          <Circle cx="40" cy="40" r="25" />
          <Rect x={width / 2 + 20} y="20" rx="5" ry="5" width={width / 2 - 40} height="40" />
          <Rect x="20" y="110" rx="5" ry="5" width={width - 40} height="50" />
          <Rect x="20" y="170" rx="5" ry="5" width={width - 40} height="50" />
          <Rect x="20" y="230" rx="5" ry="5" width={width - 40} height="50" />
          <Rect x="20" y="290" rx="5" ry="5" width={width - 40} height="50" />
          <Rect x="0" y={height - 60} rx="0" ry="0" width={width} height="50" />
        </ContentLoader>
        <Text
          style={{
            fontFamily: Fonts.reg,
            fontSize: 12,
            zIndex: 999999999,
            position: "absolute",
            color: "#000",
            bottom: 0,
            width: width,
            textAlign: "center",
          }}
        >
          V.1.0.9
          </Text>
      </View>
    );
  }


  if (UserToken !== null) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MapMain"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.DarkGreen
            },
            headerTintColor: colors.White,
          }}
        >
          <Stack.Screen name="AppHome" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="EnterForgetCode" component={EnterForgetCode} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePasswordAuth" component={ChangePasswordAuth} options={{ headerShown: false }} />
          <Stack.Screen name="MapMain" component={BottomTabNavigator} options={({ navigation, route }) => header(navigation, route)} />
          <Stack.Screen name="Documents" component={Documents} />
          <Stack.Screen name="DocInfo" component={DocInfo} />
          <Stack.Screen name="Reports" component={Reports} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="AddDocuments" component={AddDocument} />
          <Stack.Screen name="MainChat" component={MainChat} />
          <Stack.Screen name="Trips" component={Trips} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (UserToken === null) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.DarkGreen
            },
            headerTintColor: colors.White,
          }}
        >
          <Stack.Screen name="AppHome" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="EnterForgetCode" component={EnterForgetCode} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePasswordAuth" component={ChangePasswordAuth} options={{ headerShown: false }} />
          <Stack.Screen name="MapMain" component={BottomTabNavigator} options={({ navigation, route }) => header(navigation, route)} />
          <Stack.Screen name="Documents" component={Documents} />
          <Stack.Screen name="DocInfo" component={DocInfo} />
          <Stack.Screen name="Reports" component={Reports} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="AddDocuments" component={AddDocument} />
          <Stack.Screen name="MainChat" component={MainChat} />
          <Stack.Screen name="Trips" component={Trips} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default MyStack;
