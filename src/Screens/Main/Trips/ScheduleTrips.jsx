import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import colors from "../../../Theme/Colors";
import { Entypo } from "../../../Constants"
import Fonts from '../../../Theme/Fonts';
import { getDriverBookingsScheduled } from "../../../Store/action/Location";
import Loader from '../../../components/Loader';

const { height, width } = Dimensions.get("window")

const Schedule = ({ navigation }) => {

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
                <Entypo style={{ position: "absolute", left: 0, alignItems: 'flex-start', left: "-45%" }} name="flow-line" size={width * 0.12} color={colors.DarkGreen} />
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
            <View style={{ justifyContent: "space-between", height: "100%" }}>
                <View>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: width * 0.035, color: colors.LightGrey }}>Time</Text>
                    <Text style={{ color: colors.DarkGreen, fontFamily: Fonts.reg, fontSize: width * 0.035 }}>{item.bookingTime}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={{ fontFamily: Fonts.reg, fontSize: 13, fontSize: width * 0.035 }}>{item.status}</Text>
                </TouchableOpacity>
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

export default Schedule

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BackgroundGrey,
        flex: 1,
    },
})
