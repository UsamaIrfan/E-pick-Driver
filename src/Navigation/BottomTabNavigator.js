import React from "react";
import { TouchableOpacity } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import HomeScreen from "../Screens/Main/Home";
import Settings from "../Screens/Main/Settings";
import Chats from "../Screens/Main/Chats";
import Notification from "../Screens/Main/Notification";
import colors from "../Theme/Colors";
import { FontAwesome, Ionicons } from "../Constants";

const { height } = Dimensions.get("window");

const BottomTabNavigator = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: colors.DarkGreen,
        inactiveTintColor: colors.DarkGrey,
        style: {
          height: height * 0.08,
          paddingBottom: height * 0.01,
          paddingTop: height * 0.02,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome name="home" color={props.color} size={props.size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name="ios-chatbubbles"
              color={props.color}
              size={props.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LocationFetchTab"
        component={HomeScreen}
        options={{
          // tabPress: (e) => {
          //   e.preventDefault();
          // },
          tabBarIcon: (props) => (
            <TouchableOpacity
              style={{}}
              activeOpacity={1}
              onPress={(e) => {
                e.preventDefault();
                navigation.navigate("Home");
                // console.log(route.name)
              }}
            >
              <TouchableRipple
                onPress={() => {
                  navigation.navigate("Home");
                }}
                activeOpacity={1}
                rippleColor="#fff"
                style={{
                  backgroundColor: "green",
                  height: 65,
                  width: 65,
                  borderRadius: 100,
                  backgroundColor: colors.DarkGreen,
                  paddingTop: 15,
                  marginBottom: height * 0.08,
                }}
              >
                <FontAwesome
                  name="location-arrow"
                  style={{ alignSelf: "center" }}
                  color="#fff"
                  size={35}
                />
              </TouchableRipple>
            </TouchableOpacity>
          ),
          tabBarLabel: "",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome name="bell" color={props.color} size={props.size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.toggleDrawer();
          },
          tabBarIcon: (props) => (
            <TouchableOpacity
              onPress={(e) => {
                navigation.toggleDrawer();
                e.preventDefault();
              }}
              activeOpacity={1}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="gear" color={props.color} size={props.size} />
            </TouchableOpacity>
          ),
          // tabBarVisible:false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
