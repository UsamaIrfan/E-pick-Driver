import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../components/Loader';
import { Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons, AuthScreenLogo, Feather, FontAwesome5, avatar } from "../../Constants"
import { Avatar } from "react-native-paper";
import colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import * as AuthActions from "../../Store/action/login";
import { getAllDocuments, getAllDocumentsTypes } from "../../Store/action/Document";
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get("window")

const Settings = ({ navigation }) => {

    const dispatch = useDispatch()

    const logoutHandler = async () => {
        setIsLoading(true)
        await dispatch(AuthActions.LogoutFunc(userLoggedIn.userId, navigation))
        setIsLoading(false)

    }

    const getDocumentTypes = async () => {
        await dispatch(getAllDocumentsTypes())
        await dispatch(getAllDocuments(userLoggedIn.userId))
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 10, }} onPress={logoutHandler}>
                    <Text style={{ color: colors.White, fontFamily: Fonts.reg, fontSize: width * 0.04 }}>Logout</Text>
                </TouchableOpacity>
            )
        });
        const unsubscribe = navigation.addListener('focus', () => {
            getDocumentTypes()
        });

        return unsubscribe;
    }, [])


    const [IsLoading, setIsLoading] = useState(false)

    const userLoggedIn = useSelector(state => state.Auth.Login)

    return (
        <>
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.profileContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar.Image style={styles.avatar} size={80} source={avatar} />
                        <View style={styles.profileTextContainer}>
                            <Text style={{ ...styles.infoText, fontSize: width * 0.08, color: colors.DarkGreen }}>{userLoggedIn?.userName}</Text>
                            <Text style={styles.infoText}>Role: {userLoggedIn?.role}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.linksContainer}>
                    <View style={styles.linksRow}>
                        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => navigation.navigate("Profile", { userLoggedIn })}>
                            <LinearGradient colors={colors.gradientArray} style={styles.link}>
                                <Ionicons name="person-sharp" size={28} color={colors.White} />
                                <Text style={styles.linksText}>Profile</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => navigation.navigate("Documents")}>
                            <LinearGradient colors={colors.gradientArray} style={styles.link} >
                                <Ionicons name="md-document-text-sharp" size={28} color={colors.White} />
                                <Text style={styles.linksText}>Documents</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.linksRow}>
                        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => navigation.navigate("Reports")}>
                            <LinearGradient colors={colors.gradientArray} style={styles.link}>
                                <MaterialCommunityIcons name="file-document" size={28} color={colors.White} />
                                <Text style={styles.linksText}>Reports</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => navigation.navigate("Help")}>
                            <LinearGradient colors={colors.gradientArray} style={styles.link} >
                                <Entypo name="help-with-circle" size={28} color={colors.White} />
                                <Text style={styles.linksText}>Help</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.linksRow}>
                        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => navigation.navigate("ChangePassword")}>
                            <LinearGradient colors={colors.gradientArray} style={styles.link} >
                                <MaterialIcons name="lock" size={24} color={colors.White} />
                                <Text style={styles.linksText}>Change Password</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => navigation.navigate("Trips")}>
                            <LinearGradient colors={colors.gradientArray} style={styles.link} >
                                <FontAwesome5 name="location-arrow" size={24} color={colors.White} />
                                <Text style={styles.linksText}>Trips</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity style={styles.logoutContainer} onPress={logoutHandler}>
                    <Text style={{ color: colors.White, fontFamily: Fonts.reg, fontSize: width * 0.04 }}>Logout</Text>
                </TouchableOpacity> */}
                </View>
            </ScrollView>
            {IsLoading && <Loader />}
        </>
    )
}

export default Settings

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: "center",
        height: height * 0.2,
        flexDirection: "row",
        marginHorizontal: width * 0.05,
        justifyContent: 'space-between'
    },
    profileTextContainer: {
        marginLeft: width * 0.03
    },
    infoText: {
        color: colors.LightGrey,
        fontFamily: Fonts.reg,
    },
    avatar: {
        backgroundColor: colors.DarkGrey,
        marginBottom: height * 0.02,
    },
    linksContainer: {
        height: height * 0.6,
        justifyContent: 'space-evenly'
    },
    linksRow: {
        flexDirection: "row",
        marginHorizontal: width * 0.08,
        justifyContent: 'center',
    },
    link: {
        backgroundColor: colors.DarkGreen,
        width: width * 0.35,
        height: width * 0.3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginHorizontal: width * 0.06,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    linksText: {
        color: colors.White,
        fontFamily: Fonts.reg,
        fontSize: width * 0.04,
        textAlign: "center",
        marginTop: 10,
    },
    logoutContainer: {
        marginHorizontal: width * 0.12,
        paddingVertical: 20,
        backgroundColor: colors.DarkGreen,
        borderRadius: 8,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
})
