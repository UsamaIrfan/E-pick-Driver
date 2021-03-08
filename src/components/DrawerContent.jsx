import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons, AuthScreenLogo , Feather } from "../Constants"
import colors from "../Theme/Colors";
import { Avatar } from "react-native-paper";

const { height, width } = Dimensions.get("window")

const DrawerContent = (props) => {
    const { navigation } = props
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View style={styles.headerDrawer}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Ionicons name="md-menu" size={width * 0.09} color={colors.White} />
                        </TouchableOpacity>
                        <Image style={styles.drawerLogo} source={AuthScreenLogo} />
                    </View>
                </View>
                <View style={styles.drawerInfo}>
                    <View style={styles.avatarContainer}>
                        <Avatar.Image style={styles.avatar} size={80} source={require("../../assets/avatar.png")} />
                    </View>
                    <View>
                        <Text style={{ ...styles.infoText, fontSize: 20 }}>Mr. SAM</Text>
                        <Text style={styles.infoText}>email@someone.com</Text>
                        <Text style={styles.infoText}>Rating: </Text>
                    </View>
                </View>
                <View style={styles.drawerLinks}>
                    <DrawerItem onPress={() => navigation.navigate("TabNavigator")} icon={() => (<Ionicons name="home" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Home</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Profile")} icon={() => (<Ionicons name="person-sharp" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Profile</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Documents")} icon={() => (<Ionicons name="md-document-text-sharp" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Documents</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Reports")} icon={() => (<MaterialCommunityIcons name="file-document" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Reports</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Help")} icon={() => (<Entypo name="help-with-circle" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Help</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("ChangePassword")} icon={() => (<MaterialIcons name="lock" size={24} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Change Password</Text>} />
                </View>
                <TouchableOpacity style={styles.logout}>
                <Feather name="log-out" size={22} color={colors.DarkGrey} />
                    <Text style={styles.logOutText}>  Log Out</Text>
                </TouchableOpacity>
                <View style={styles.version}>
                    <Text style={{fontSize: width * 0.03}}>V.1.0.0</Text>
                </View>
            </DrawerContentScrollView>

        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    headerDrawer: {
        backgroundColor: colors.DarkGreen,
        height: height * 0.08,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: width * 0.02,
        bottom: height * 0.006
    },
    drawerLogo: {
        width: width * 0.14,
        height: height * 0.12,
    },
    drawerInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingVertical: height * 0.03,
        borderBottomWidth: 3,
        borderStyle: "solid",
        borderColor: colors.LightGrey2,
    },
    infoText: {
        color: colors.LightGrey
    },
    avatar: {
        marginRight: width * 0.02
    },
    drawerText: {
        fontSize: 18,
        color: colors.DarkGreen,
    },
    logout: {
        alignSelf: "flex-end",
        marginTop: height * 0.05,
        paddingRight: width * 0.1,
        flexDirection: "row",
        alignItems: "center"
    },
    logOutText: {
        fontSize: width * 0.05,
        color: colors.DarkGrey
    },
    version: {
        marginTop: height * 0.02,
        alignItems: "center"
    }
})
