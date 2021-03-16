import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import colors from "../../../Theme/Colors";
import { Entypo } from "../../../Constants"
import Fonts from '../../../Theme/Fonts';

const { height, width } = Dimensions.get("window")

const Schedule = ({ navigation }) => {

    const DATA = [
        {
            from: "Karachi",
            to: "Lahore",
            time: "5:00 PM",
        }, {
            from: "Islamabad",
            to: "Murree",
            time: "5:00 PM",
        }, {
            from: "Tharparkar",
            to: "Murree",
            time: "5:00 PM",
        },
    ]

    const List = ({ item }) => (
        <View style={{ borderBottomColor: colors.LightGrey, borderBottomWidth: 1, position: "relative", flexDirection: "row", alignItems: "center", height: height * 0.115, marginHorizontal: width * 0.08, marginTop: height * 0.004, paddingVertical: height * 0.007}}>
            <View style={{ position: "absolute", alignItems: "flex-start", justifyContent: "center", left: 0, height: "100%", zIndex: 2, width: 50, }}>
                <Entypo style={{ position: "absolute", left: 0, alignItems: 'flex-start', left: "-45%" }} name="flow-line" size={width * 0.12} color={colors.DarkGreen} />
            </View>
            <View style={{ marginLeft: "5%", flex: 1, justifyContent: "space-between", height: "100%" }}>
                <View>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035 }}>From</Text>
                    <Text style={{ color: colors.DarkGreen, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>{item.from}</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035 }}>Destination</Text>
                    <Text style={{ color: colors.DarkGreen, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>{item.to}</Text>
                </View>
            </View>
            <View style={{ justifyContent: "space-between", height: "100%" }}>
                <View>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035 }}>Time</Text>
                    <Text style={{ color: colors.DarkGreen, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>{item.time}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: 13, fontSize: width * 0.035 }}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            {DATA.map((item, i) => (
                <List item={item} key={i} />
            ))}
        </View>
    )
}

export default Schedule

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BackgroundGrey,
        flex: 1,
    },
})
