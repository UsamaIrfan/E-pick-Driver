import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity , StatusBar } from 'react-native'
import colors from "../../../Theme/Colors";
import { Ionicons, MaterialIcons, Octicons, Entypo, FontAwesome5 } from "../../../Constants"
import Fonts from '../../../Theme/Fonts';
import { color } from 'react-native-reanimated';
import TopTabNavigator from "../../../Navigation/TripTopTabNavigator";

const { height, width } = Dimensions.get("window")

const Trips = ({ navigation }) => {

    const ChatHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5} style={styles.headerLeft}>
                <Octicons name="chevron-left" size={30} color={colors.White} />
                <View style={{ justifyContent: "center", alignItems: "center", borderRadius: width * 0.08 / 2, width: width * 0.08, height: width * 0.08, backgroundColor: colors.White }}>
                    <Ionicons name="person" size={21} color={colors.DarkGreen} />
                </View>
                <View style={{ justifyContent: "space-between" }} >
                    <Text style={{ color: colors.White, fontWeight: "bold", fontFamily: Fonts.reg }}>{item.PhoneNumber}</Text>
                    <Text style={{ fontFamily: Fonts.reg, color: colors.White, fontSize: width * 0.03 }}>Active Now</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <Entypo name="dots-three-vertical" size={24} color={colors.White} />
            </TouchableOpacity>
        </View>
    )

    const List = ({ item }) => (
        <TouchableOpacity activeOpacity={0.5} style={styles.listContainer}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: width * 0.04 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", borderRadius: width * 0.1 / 2, width: width * 0.1, height: width * 0.1, backgroundColor: colors.DarkGreen }}>
                        <Ionicons name="person" size={24} color={colors.White} />
                    </View>
                </View>
                <View style={{ justifyContent: "space-between" }} >
                    <Text style={{ color: colors.DarkGreen, fontWeight: "bold", fontFamily: Fonts.reg }}>{item.PhoneNumber}</Text>
                    <Text style={{ fontFamily: Fonts.reg }}>{item.lastMessage}</Text>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ marginBottom: "7%", color: colors.DarkGreen, fontFamily: Fonts.reg }} >{item.lastSeen}</Text>
                {!item.read ? <MaterialIcons name="error" size={18} color={colors.DarkGreen} /> : <MaterialIcons name="done" size={18} color={colors.DarkGreen} />}
            </View>
        </TouchableOpacity>
    )

    return (
        <>
            < TopTabNavigator />
        </>
    )
}

export default Trips

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: height * 0.02,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: width * 0.04,
        marginTop: height * 0.008,
        backgroundColor: colors.White,
        marginHorizontal: width * 0.01,
        borderWidth: 1,
        borderColor: colors.LightGrey2,
    },
    scrollView: {
        backgroundColor: colors.BackgroundGrey,
        // height: height * 0.72
        height: height * 0.92
    },
    headerContainer: {
        flexDirection: "row",
        height: height * 0.07,
        backgroundColor: colors.DarkGreen,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: width * 0.02,
        marginTop: height * 0.006,
    },
    headerText: {
        color: colors.White,
        fontSize: width * 0.05,
        fontFamily: Fonts.reg,
    },
    headerLeft: {
        width: "50%",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        justifyContent: 'space-between',
    },
})
