import React from "react";
import Schedule from "../Screens/Main/Trips/ScheduleTrips";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InProgess from "../Screens/Main/Trips/InProgressTrips";
import Completed from "../Screens/Main/Trips/Completed";
import colors from "../Theme/Colors";

const Tab = createMaterialTopTabNavigator();

const TripTopTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Schedule" tabBarOptions={{
      inactiveTintColor: colors.White,
      activeTintColor: colors.White,
      pressColor: colors.LightGrey2,
      style:{
        backgroundColor: colors.DarkGreen,
    },
    indicatorStyle: {
        backgroundColor: colors.White,
    },
    }}>
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="In Progress" component={InProgess} />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
};

export default TripTopTabNavigator;