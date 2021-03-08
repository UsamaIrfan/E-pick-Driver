import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { FontAwesome5 } from "../Constants";
import colors from "../Theme/Colors";
import { Ionicons, AuthScreenLogo } from "../Constants"

const { height, width } = Dimensions.get("window")

const Header = ({ name, style , icon}) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            <View style={styles.leftContent}>
                {!icon ? <FontAwesome5 name="car" size={24} color={colors.White} /> : icon }
                <Text style={styles.headerText}>{name}</Text>
            </View>
            <View style={styles.rightContent}>
                <Image source={AuthScreenLogo} style={styles.headerLogo} />
                <Ionicons name="ios-information-circle" size={24} color={colors.LightGrey} />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.DarkGreen,
        height: height * 0.08,
        paddingHorizontal: width * 0.04,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftContent: {
        alignItems: "center",
        flexDirection: "row",
    },
    headerText: {
        color: colors.White,
        fontSize: width * 0.045,
        fontWeight: "bold",
        marginLeft: width * 0.025,
    },
    rightContent: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    headerLogo: {
        width: width * 0.18,
        height: height * 0.15,
        marginRight: width * 0.015
    },
})
