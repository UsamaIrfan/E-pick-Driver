import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "../Constants"
import colors from "../Theme/Colors";
import Fonts from '../Theme/Fonts';

const { width, height } = Dimensions.get("window");

const Collapsible = ({ item }) => {

    const [ReadMoreToggle, setReadMoreToggle] = useState(false)

    return (
        <View style={styles.listContainer}>
            <View style={styles.list}>
                <View style={{ ...styles.listItem, justifyContent: "space-between", marginBottom: "auto" }}>
                    <Text style={{...styles.title, backgroundColor: !item.read ? colors.LightGrey : colors.DarkGreen}}>{item.name}</Text>
                    <MaterialIcons name="delete" size={20} color={colors.LightGrey} />
                </View>
                <TouchableOpacity activeOpacity={0.5} style={{ ...styles.desc }}>
                    <Text>{item.description}</Text>
                </TouchableOpacity>
                <View style={{...styles.listItem, marginBottom: "auto"}}>
                    <TouchableOpacity style={styles.readMore} activeOpacity={0.8} onPress={() => setReadMoreToggle(!ReadMoreToggle)} >
                        <Text style={{fontFamily: Fonts.reg}}>Read More.</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ ...styles.descView, display: ReadMoreToggle ? null : "none" , maxHeight: ReadMoreToggle ? null : 0, backgroundColor: !item.read ? colors.LightGrey : colors.DarkGreen }}>
                <Text style={{ color: colors.White, padding: width * 0.02 }}>{item.description}</Text>
            </View>
        </View>
    )
}
export default Collapsible

const styles = StyleSheet.create({
    listContainer: {
        position: "relative",
        overflow: "visible",
        zIndex: 5,
    },
    list: {
        height: height * 0.12,
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: colors.White,
        marginHorizontal: width * 0.05,
        marginTop: height * 0.02,
        zIndex: -1,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: width * 0.04,
    },
    title: {
        backgroundColor: colors.DarkGreen,
        color: colors.White,
        padding: 4,
        fontFamily: Fonts.bold,
    },
    desc: {
        marginTop: height * 0.005,
        maxHeight: height * 0.025,
        overflow: "hidden",
        marginLeft: width * 0.02,
        fontFamily: Fonts.reg
    },
    readMore: {
        marginLeft: 'auto',
        marginTop: height * 0.01,
    },
    descView: {
        backgroundColor: colors.DarkGreen,       
        marginHorizontal: width * 0.05,
        // padding: width * 0.02,
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
    },

})
