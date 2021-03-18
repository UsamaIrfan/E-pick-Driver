import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import colors from "../../../Theme/Colors";
import { Entypo } from "../../../Constants"
import { useSelector, useDispatch } from "react-redux";
import Fonts from '../../../Theme/Fonts';
import Loader from '../../../components/Loader';
import { getDriverBookingsScheduled } from "../../../Store/action/Location";

const { height, width } = Dimensions.get("window")

const Completed = ({ navigation }) => {


    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllBookings()
        });

        return unsubscribe;
    }, [navigation]);

    const userLoggedIn = useSelector(state => state.Auth.Login)
    const bookings = useSelector(state => state.Location.bookings)

    const [IsLoading, setIsLoading] = useState(false)

    const getAllBookings = async () => {
        setIsLoading(true)
        await dispatch(getDriverBookingsScheduled(userLoggedIn.userId))
        setIsLoading(false)
    }

    const List = ({ item }) => (
        <View style={{ borderBottomColor: colors.LightGrey, borderBottomWidth: 1, position: "relative", flexDirection: "row", alignItems: "center", height: height * 0.115, marginHorizontal: width * 0.08, marginTop: height * 0.004, paddingVertical: height * 0.007 }}>
            <View style={{ position: "absolute", alignItems: "flex-start", justifyContent: "center", left: 0, height: "100%", zIndex: 2, width: 50, }}>
                <Entypo style={{ position: "absolute", left: 0, alignItems: 'flex-start', left: "-45%" }} name="flow-line" size={55} color={colors.DarkGreen} />
            </View>
            <View style={{ marginLeft: "5%", flex: 1, justifyContent: "space-between", height: "100%" }}>
                <View>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035, color: colors.LightGrey }}>From</Text>
                    <Text style={{ color: colors.DarkGreen, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>{item.pickupLocation.length > 20 ? item.pickupLocation.slice(0, 20) : item.pickupLocation}</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035, color: colors.LightGrey }}>Destination</Text>
                    <Text style={{ color: colors.DarkGreen, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>{item.destination.length > 25 ? item.destination.slice(0, 25) : item.destination}</Text>
                </View>
            </View>
            <View style={{ justifyContent: "space-between", height: "100%", width: "50%" }}>
                <View style={{ alignItems: "flex-start", alignSelf: "flex-end", width: "75%" }}>
                    <View></View>
                    <View>
                        <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035, color: colors.LightGrey }}>Time</Text>
                        <Text style={{ color: colors.DarkGreen, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>{item.bookingTime}</Text>
                    </View>
                </View>
                <View activeOpacity={0.5} style={{ justifyContent: "flex-end", justifyContent: "flex-end", flexDirection: "row", alignItems: "flex-start", alignSelf: "flex-end", }}>
                    <View style={{ flexDirection: "row", marginRight: "5%", height: "100%" }}>
                        <Text style={{ color: colors.DarkGreen, alignSelf: "flex-end", fontSize: width * 0.035, fontFamily: Fonts.reg, }}>{item.status}</Text>
                    </View>
                    <View style={{ width: "40%" }}>
                        <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035, fontFamily: Fonts.reg, }}>{item.currency}</Text>
                        <Text style={{ color: !item.cancelled ? colors.DarkGreen : colors.Red, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>2000</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            {bookings.map((item, i) => (
                <List item={item} key={i} />
            ))}
            {IsLoading && <Loader />}
        </View>
    )
}

export default Completed

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BackgroundGrey,
        flex: 1,
    },
})
