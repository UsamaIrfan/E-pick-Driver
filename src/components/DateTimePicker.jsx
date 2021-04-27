import React, { useEffect, useState, useContext } from "react";
import { Dimensions, SafeAreaView, TextInput, View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, ColorPropType, Platform } from "react-native";
import { Entypo, Feather, Fontisto, MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import colors from "../Theme/Colors"
import Fonts from "../Theme/Fonts"
import CalendarPicker from "react-native-calendar-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";
const { width } = Dimensions.get('window');

export function DateTimePicker(props) {
    const editable = useSelector((state) => state.Auth.canEdit);
    const [isFocused, setIsFocus] = useState(false);
    const [date, setDate] = useState(props.value != undefined && props.value != "" ? props.value.split(' ')[0] : "");
    const [time, setTime] = useState(props.value != undefined && props.value != "" ? props.value.split(' ').length > 0 ? new Date() : "" : "");
    const [showTime, setShowTime] = useState(props.value != undefined && props.value != "" ? props.value.split(' ').length > 0 ? props.value.split(' ')[1] : "" : "");
    const [showCalendar, setShowCalendar] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const onDateChange = (date) => {
        let changeDate = new Date(date);
        let day = changeDate.getDate();
        let month = changeDate.getMonth() + 1;
        let year = changeDate.getFullYear();
        let appendDate = (year + "-" + month + "-" + day);
        setDate(appendDate);
        setShowCalendar(false);
        props.onChange(appendDate);
        // console.log(date);
    };

    return (
        <>
            <View style={{ marginBottom: 20, flex: 1, borderColor: colors.DarkGray, borderWidth: 1, borderRadius: 5, paddingLeft: 15, paddingTop: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ fontSize: 12, color: isFocused ? colors.secondary : colors.DarkGreen, textTransform: 'uppercase', fontFamily: Fonts.reg }}>{props.label}</Text>
                        <TouchableOpacity onPress={() => { setShowCalendar(true); }} style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            <>
                                {props.iconName &&
                                    <>
                                        {props.iconType == "Entypo" &&
                                            <Entypo name={props.iconName} size={18} color={isFocused ? colors.secondary : colors.DarkGreen} />
                                        }
                                        {props.iconType == "Feather" &&
                                            <Feather name={props.iconName} size={18} color={isFocused ? colors.secondary : colors.DarkGreen} />
                                        }
                                        {props.iconType == "Fontisto" &&
                                            <Fontisto name={props.iconName} size={18} color={isFocused ? colors.secondary : colors.DarkGreen} />
                                        }
                                        {props.iconType == "MaterialCommunityIcons" &&
                                            <MaterialCommunityIcons name={props.iconName} size={18} color={isFocused ? colors.secondary : colors.DarkGreen} />
                                        }
                                        {props.iconType == "MaterialIcons" &&
                                            <MaterialIcons name={props.iconName} size={18} color={isFocused ? colors.secondary : colors.DarkGreen} />
                                        }
                                        {props.iconType == "FontAwesome5" &&
                                            <FontAwesome5 name={props.iconName} size={18} color={isFocused ? colors.secondary : colors.DarkGreen} />
                                        }
                                    </>
                                }
                                <View style={{ paddingLeft: 15, flex: 1 }}>
                                    <TextInput
                                        {...props}
                                        editable={false}
                                        onFocus={() => {
                                            if (editable) {
                                                setIsFocus(true);
                                                setShowCalendar(true);
                                            }
                                        }}
                                        onBlur={() => { setIsFocus(false); }}
                                        value={date}
                                        placeholderTextColor={colors.DarkGreen}
                                        style={{ height: 25, flex: 1, paddingLeft: 25, fontFamily: Fonts.reg, color: colors.DarkGreen }}
                                    />

                                </View>
                            </>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.DarkGreen, textTransform: 'uppercase', fontFamily: Fonts.reg }}>Time</Text>
                        <TouchableOpacity onPress={() => { setIsDatePickerVisible(true); }} style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            <Ionicons name="time-outline" size={20} color={isFocused ? colors.secoundPrimary : colors.DarkGreen} />
                            <View style={{ paddingLeft: 15, flex: 1, flexDirection: 'row' }}>
                                <TextInput
                                    {...props}
                                    editable={false}
                                    onFocus={() => { setIsFocus(true); }}
                                    onBlur={() => { setIsFocus(false); }}
                                    value={showTime}
                                    placeholderTextColor={colors.DarkGreen}
                                    style={{ height: 25, flex: 1, paddingLeft: 25, fontFamily: Fonts.reg, color: colors.DarkGreen }}
                                />
                                <Ionicons name="ios-chevron-forward-sharp" size={24} color={colors.DarkGreen} style={{ bottom: 6 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    date={time}
                    onConfirm={(date) => { console.log(date); setShowTime(date.toLocaleTimeString()); setIsDatePickerVisible(false); }}
                    onCancel={() => { setIsDatePickerVisible(false); }}
                />
            </View>
            {showCalendar === true && (
                <View style={{ backgroundColor: 'white', position: 'relative', top: -20, elevation: (Platform.OS === 'android') ? 5 : 0 }}>
                    <CalendarPicker initialDate={new Date()} width={width - 30} onDateChange={onDateChange} />
                </View>
            )}
        </>
    )
}