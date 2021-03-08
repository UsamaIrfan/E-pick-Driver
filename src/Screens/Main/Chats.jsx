import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import Header from "../../components/Header";
import colors from "../../Theme/Colors";
import { Ionicons, MaterialIcons, Octicons, Entypo } from "../../Constants"

const { height, width } = Dimensions.get("window")

const Chats = ({navigation}) => {

    const DATA = [
        {
            name: "Usama Irfan",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: true,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: true,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: true,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: true,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you boy?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        },
        {
            name: "Some One",
            PhoneNumber: "+923211234567",
            lastMessage: "Where are you guy?",
            profile: "",
            lastSeen: "2 Days Ago",
            read: false,
        }
    ]

    const ChatHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5} style={styles.headerLeft}>
                <Octicons name="chevron-left" size={30} color={colors.White} />
                <Text style={styles.headerText}>Inbox</Text>
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
                    <Text style={{ color: colors.DarkGreen, fontWeight: "bold" }}>{item.PhoneNumber}</Text>
                    <Text>{item.lastMessage}</Text>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ marginBottom: "7%", color: colors.DarkGreen }} >{item.lastSeen}</Text>
                {!item.read ? <MaterialIcons name="error" size={18} color={colors.DarkGreen} /> : <MaterialIcons name="done" size={18} color={colors.DarkGreen} />}
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ backgroundColor: colors.BackgroundGrey }}>
            <Header
                name={"Chats"}
                icon={<Ionicons
                    name="ios-chatbubbles"
                    color={colors.White}
                    size={24}
                />}
            />
            <ChatHeader />
            <ScrollView style={styles.scrollView}>
                {DATA.map((item, i) => (
                    <List item={item} key={i} />
                ))}
            </ScrollView>
        </View>
    )
}

export default Chats

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
        borderColor: colors.LightGrey,
    },
    scrollView: {
        backgroundColor: colors.BackgroundGrey,
        height: height * 0.72
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
    },
    headerLeft: {
        width: "20%",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        justifyContent: 'space-between',
    },
})
