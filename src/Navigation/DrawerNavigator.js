import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Documents from "../Screens/Main/Documents";
import BottomTabNavigator from "./BottomTabNavigator";
import DrawerContent from "../components/DrawerContent";
import DocInfo from "../Screens/Main/DocInfo";
import colors from "../Theme/Colors";
import Reports from "../Screens/Main/Reports";
import HelpScreen from "../Screens/Main/Help";
import Profile from "../Screens/Main/Profile";
import ChangePassword from "../Screens/Main/ChangePassword";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{headerPressColorAndroid: colors.DarkGreen}} drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="TabNavigator" component={BottomTabNavigator} />
      <Drawer.Screen name="Documents" component={Documents} />
      <Drawer.Screen name="DocInfo" component={DocInfo} />
      <Drawer.Screen name="Reports" component={Reports} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
