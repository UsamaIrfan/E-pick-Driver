import React from "react";
import { TouchableOpacity, View, SafeAreaView } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import HomeScreen from "../Screens/Main/Home";
import Settings from "../Screens/Main/Settings";
import Chats from "../Screens/Main/Chats";
import Notification from "../Screens/Main/Notification";
import colors from "../Theme/Colors";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "../Constants";

const { height, width } = Dimensions.get("window");

const BottomTabNavigator = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();

  // Demo Booking
  const Booking = {
    active: false,
  };

  return (
    
    <Tab.Navigator
      initialRouteName="Map"
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
        name="Map"
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
            <TouchableOpacity
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={1}
              onPress={(e) => {
                e.preventDefault();
                if (Booking.active) {
                  navigation.navigate("Chats");
                }
                // console.log(route.name)
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (Booking.active) {
                    navigation.navigate("Chats");
                  }
                }}
                activeOpacity={1}
                style={
                  {
                    // height: "100%",
                    // width: "100%",
                  }
                }
              >
                {Booking.active ? (
                  <Ionicons
                    name="ios-chatbubbles"
                    color={props.color}
                    size={props.size}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="chat-remove"
                    size={props.size}
                    color={props.color}
                  />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          ),
        }}
      />

<Tab.Screen
        name="Map "
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => {
            return (
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                activeOpacity={1}
                onPress={(e) => {
                  e.preventDefault();
                  if (Booking.active) {
                    navigation.navigate("Map")
                  }
                }}
              >
                <TouchableOpacity
                  style={{
                    top: -(width * 0.2) / 2.7,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 65,
                    height: 65,
                    borderRadius: 35,
                    overflow: "hidden",
                    backgroundColor: colors.DarkGreen,
                  }}
                  onPress={() => {
                    navigation.navigate("Map")
                  }}
                >
                  <FontAwesome
                    name="location-arrow"
                    style={{ alignSelf: "center" }}
                    color="#fff"
                    size={35}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          },
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
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            fontSize: 10,
            backgroundColor: colors.Red,
            height: 20,
            textAlign: "center",
            width: 8,
            borderRadius: 10,
          }
        }}
      />
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: (props) => (<FontAwesome name="gear" color={props.color} size={props.size} />) }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
