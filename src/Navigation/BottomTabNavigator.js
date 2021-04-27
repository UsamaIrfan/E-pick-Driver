import React from "react";
import { TouchableOpacity, View } from "react-native";
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
import Svg, { Path } from "react-native-svg";

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
        name="LocationFetchTab"
        component={HomeScreen}
        options={{
          // tabPress: (e) => {
          //   e.preventDefault();
          // },
          // tabBarIcon: (props) => (
          //   <TouchableOpacity
          //     style={{
          //       zIndex: 1,
          //     }}
          //     activeOpacity={1}
          //     onPress={(e) => {
          //       e.preventDefault();
          //       navigation.navigate("Home");
          //       // console.log(route.name)
          //     }}
          //   >
          //     <TouchableRipple
          //       onPress={() => {
          //         navigation.navigate("Home");
          //       }}
          //       activeOpacity={1}
          //       rippleColor="#fff"
          //       style={{
          //         backgroundColor: "green",
          //         height: 65,
          //         width: 65,
          //         borderRadius: 100,
          //         backgroundColor: colors.DarkGreen,
          //         paddingTop: 15,
          //         marginBottom: height * 0.08,
          //       }}
          //     >
          //       <FontAwesome
          //         name="location-arrow"
          //         style={{ alignSelf: "center" }}
          //         color="#fff"
          //         size={35}
          //       />
          //     </TouchableRipple>
          //   </TouchableOpacity>
          // ),
          tabBarButton: (props) => {
            return (
              <View style={{ flex: 1, alignItems: "center" }}>
                <View
                  style={{ flexDirection: "row", position: "absolute", top: 0 }}
                >
                  <View style={{ flex: 1, backgroundColor: "transparent" }}></View>
                  <Svg width={70 + 30} height={72} viewBox="0 0 75 61">
                    <Path
                      d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                      fill={"#fff"}
                    />
                  </Svg>
                  <View style={{ flex: 1, backgroundColor: "#FFF" }}></View>
                </View>

                <TouchableOpacity
                  style={{
                    top: -(width * 0.2) / 1.5,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                    height: 70,
                    borderRadius: 35 ,
                    overflow: "hidden",
                    backgroundColor: colors.DarkGreen,
                  }}
                  onPress={props.onPress}
                >
                  <FontAwesome
                    name="location-arrow"
                    style={{ alignSelf: "center" }}
                    color="#fff"
                    size={35}
                  />
                </TouchableOpacity>
              </View>
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
