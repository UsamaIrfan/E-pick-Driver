import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import COLORS from "../Theme/Colors";
import FONTFAMILY from "../Theme/Fonts"
import { Feather, FontAwesome5 } from "@expo/vector-icons";

const Accordian = (props) => {
  
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.2}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor:COLORS.primary,
          borderWidth:1,
          padding:10,
          paddingVertical:15,
          borderRadius:10,
          marginTop:10,
          marginBottom:10,
        }}
        onPress={() => toggleExpand()}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="check-square" size={20} color={COLORS.DarkGreen} />
          <Text style={{ fontSize: 15, color: COLORS.DarkGreen, marginLeft:5 , fontFamily:FONTFAMILY.reg}}>
            {props.title} 
          </Text>
        </View>

        <FontAwesome5
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={COLORS.DarkGreen}
          

        />
      </TouchableOpacity>

      {expanded && (
        {...props.children}
      )}
    </View>
  );
};

export default Accordian;