import React, { useEffect, useState, useContext } from "react";
import {
  Dimensions,
  SafeAreaView,
  TextInput,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Entypo,
  Feather,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import colors from "../Theme/Colors";
import Fonts from "../Theme/Fonts";
import CalendarPicker from "react-native-calendar-picker";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");

export function DatePicker(props) {
  const editable = useSelector((state) => state.Auth.canEdit);
  const [isFocused, setIsFocus] = useState(false);
  const [date, setDate] = useState(props.value);
  const [showCalendar, setShowCalendar] = useState(false);
  const onDateChange = (date) => {
    let changeDate = new Date(date);
    let day = changeDate.getDate();
    let month = changeDate.getMonth() + 1;
    let year = changeDate.getFullYear();
    let appendDate = year + "-" + month + "-" + day;
    setDate(appendDate);
    setShowCalendar(false);
    props.onChange(appendDate);
  };

  return (
    <View
      style={{
        flex: 1,
        borderColor: colors.DarkGray,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        paddingVertical: 5,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: isFocused ? colors.LightGrey2 : colors.DarkGreen,
          textTransform: "uppercase",
          fontFamily: Fonts.reg,
        }}
      >
        {props.label}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setShowCalendar(true);
        }}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <>
          {props.iconName && (
            <>
              {props.iconType == "Entypo" && (
                <Entypo
                  name={props.iconName}
                  size={18}
                  color={isFocused ? colors.LightGrey2 : colors.DarkGreen}
                />
              )}
              {props.iconType == "Feather" && (
                <Feather
                  name={props.iconName}
                  size={18}
                  color={isFocused ? colors.LightGrey2 : colors.DarkGreen}
                />
              )}
              {props.iconType == "Fontisto" && (
                <Fontisto
                  name={props.iconName}
                  size={18}
                  color={isFocused ? colors.LightGrey2 : colors.DarkGreen}
                />
              )}
              {props.iconType == "MaterialCommunityIcons" && (
                <MaterialCommunityIcons
                  name={props.iconName}
                  size={18}
                  color={isFocused ? colors.LightGrey2 : colors.DarkGreen}
                />
              )}
              {props.iconType == "MaterialIcons" && (
                <MaterialIcons
                  name={props.iconName}
                  size={18}
                  color={isFocused ? colors.LightGrey2 : colors.DarkGreen}
                />
              )}
              {props.iconType == "FontAwesome5" && (
                <FontAwesome5
                  name={props.iconName}
                  size={18}
                  color={isFocused ? colors.LightGrey2 : colors.DarkGreen}
                />
              )}
            </>
          )}
          <View style={{ paddingLeft: 15, flex: 1 , flexDirection:'row'}}>
            <TextInput
              {...props}
              editable={false}
              onFocus={() => {
                if(editable){
                  setIsFocus(true);
                  setShowCalendar(true);
                }
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              value={date}
              placeholderTextColor={colors.LightGrey2}
              style={{
                height: 25,
                flex: 1,
                paddingLeft: 25,
                fontSize: 12,
                textAlign: "left",
                fontFamily: Fonts.reg,
                color: colors.DarkGreen,
              }}
            />
            <Ionicons
              name="ios-chevron-forward-sharp"
              size={24}
              color={colors.DarkGreen}
              style={{bottom:6}}
            />
          </View>
        </>
      </TouchableOpacity>
      {showCalendar === true && (
        <View style={{ backgroundColor: "transparent", right: 8 }}>
          <CalendarPicker width={width - 30} onDateChange={onDateChange} />
        </View>
      )}
    </View>
  );
}
