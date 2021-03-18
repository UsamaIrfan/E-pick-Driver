import React, { useState , useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons, AuthScreenLogo, Feather, FontAwesome5 } from "../Constants"
import colors from "../Theme/Colors";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";
import Fonts from "../Theme/Fonts";
import * as AuthActions from "../Store/action/login";
import Loader from './Loader';
import { getAllDocuments } from "../Store/action/Document";


const { height, width } = Dimensions.get("window")

const DrawerContent = (props) => {
    const { navigation } = props
    const [IsLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const userLoggedIn = useSelector(state => state.Auth.Login)

    const logoutHandler = async () => {
        setIsLoading(true)
        await dispatch(AuthActions.LogoutFunc(userLoggedIn.userId, navigation))
        setIsLoading(false)
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllDocs()
        });

        return unsubscribe;
    }, [navigation]);

    const getAllDocs = async () => {
        setIsLoading(true)
        await dispatch(getAllDocuments(userLoggedIn.userId))
        setIsLoading(false)
    }

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
                        <Text style={{ ...styles.infoText, fontSize: 20 }}>{userLoggedIn?.userName}</Text>
                        <Text style={styles.infoText}>Role: {userLoggedIn?.role}</Text>
                    </View>
                </View>
                <View style={styles.drawerLinks}>
                    <DrawerItem onPress={() => navigation.navigate("TabNavigator")} icon={() => (<Ionicons name="home" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Home</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Profile", { userLoggedIn })} icon={() => (<Ionicons name="person-sharp" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Profile</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Documents")} icon={() => (<Ionicons name="md-document-text-sharp" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Documents</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Reports")} icon={() => (<MaterialCommunityIcons name="file-document" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Reports</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Help")} icon={() => (<Entypo name="help-with-circle" size={28} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Help</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("ChangePassword")} icon={() => (<MaterialIcons name="lock" size={24} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Change Password</Text>} />
                    <DrawerItem onPress={() => navigation.navigate("Trips")} icon={() => (<FontAwesome5 name="location-arrow" size={24} color={colors.DarkGreen} />)} label={() => <Text style={styles.drawerText}>Trips</Text>} />
                </View>
                <View style={{ marginTop: height * 0.05 }}>
                    <TouchableOpacity onPress={logoutHandler} style={styles.logout}>
                        <Feather name="log-out" size={22} color={colors.DarkGrey} />
                        <Text style={styles.logOutText}>  Log Out</Text>
                    </TouchableOpacity>
                    <View style={styles.version}>
                        <Text style={{ fontSize: width * 0.03, fontFamily: Fonts.reg }}>V.1.0.0</Text>
                    </View>
                </View>
            </DrawerContentScrollView>
            {IsLoading && <Loader />}
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
        bottom: height * 0.006,
        flex: 1,
    },
    drawerLinks: {
        flex: 1,
        marginBottom: "auto"
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
        color: colors.LightGrey,
        fontFamily: Fonts.reg,
    },
    avatar: {
        marginRight: width * 0.02
    },
    drawerText: {
        fontSize: 18,
        color: colors.DarkGreen,
        fontFamily: Fonts.reg,
    },
    logout: {
        alignSelf: "flex-end",
        paddingRight: width * 0.1,
        flexDirection: "row",
        alignItems: "center"
    },
    logOutText: {
        fontSize: width * 0.05,
        color: colors.DarkGrey,
        fontFamily: Fonts.bold
    },
    version: {
        marginTop: height * 0.02,
        alignItems: "center",
    }
})
