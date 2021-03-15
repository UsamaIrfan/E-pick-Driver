import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Loader from "../../components/Loader";
import { useSelector, useDispatch } from "react-redux"
import { MaterialIcons, Entypo } from "../../Constants"
import colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import {AuthScreenLogo} from "../../Constants"
import {forgetPasword} from "../../Store/action/login";

const { height, width } = Dimensions.get("window");

const ChangePasswordAuth = ({ navigation }) => {

    const [Email, setEmail] = useState("")
    const [NewPassword, setNewPassword] = useState("")
    const [IsLoading, setIsLoading] = useState(false)

    const input2 = useRef();
    const input3 = useRef();

    const dispatch = useDispatch()

    const forgetPasswordHandler = (email, password) => {
        setIsLoading(true)
        dispatch(forgetPasword(email, password, navigation))
        setIsLoading(false)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.DarkGreen} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={AuthScreenLogo} />
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Profile Update</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputContainer}>
                        <Entypo style={styles.inputIcon} name="mail" size={18} color={colors.DarkGrey} />
                        <TextInput style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setEmail(text)} placeholder="Email" />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.inputIcon} s name="lock" size={18} color={colors.DarkGrey} />
                        <TextInput style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => {setNewPassword(text)}} placeholder="New Password" />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => {forgetPasswordHandler(Email, NewPassword)}} activeOpacity={.6} style={{ ...styles.buttonLogin }}>
                        <Text style={{ ...styles.buttonText }}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {IsLoading && <Loader />}
        </View>
    )
}

export default ChangePasswordAuth

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BackgroundGrey
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputsContainer: {
        flex: 3,
        paddingHorizontal: 30,
    },
    logo: {
        width: width * 0.25,
        height: height * 0.2,
    },
    headingText: {
        fontSize: width * 0.05,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: colors.DarkGrey,
        textTransform: "uppercase",
        fontFamily: Fonts.bold,
    },
    heading: {
        marginBottom: 20
    },

    inputs: {
        backgroundColor: "transparent",
        height: height * 0.08,
    },
    inputContainer: {
        borderBottomColor: colors.DarkGreen,
        borderBottomWidth: 2,
        borderStyle: "solid",
        height: height * 0.08,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    forgetText: {
        marginLeft: "auto",
        marginTop: height * 0.01,
        color: colors.LightGrey2,
        fontFamily: Fonts.reg,
    },
    defaultInput: {
        flex: 1,
        fontSize: width * 0.04,
        fontFamily: Fonts.reg,
    },
    inputIcon: {
        paddingRight: width * 0.02,
    },
    buttonLogin: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        marginBottom: height * 0.05,
        paddingVertical: height * 0.02,
        textTransform: "none",
        backgroundColor: colors.DarkGreen,
    },
    sepLineContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.04
    },
    sepLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.DarkGrey
    },
    sepText: {
        color: colors.DarkGrey,
        fontFamily: Fonts.reg,
    },
    buttonText: {
        color: colors.White,
        fontSize: 18,
        textTransform: "none",
        fontFamily: Fonts.reg,
    },
    buttonsContainer: {
        marginTop: height * 0.04,
        flex: 1,
        paddingVertical: 10,
    },
    forgetContainer: {
        marginBottom: height * 0.04
    },
    footerLinks: {
        marginTop: height * 0.04,
        flexDirection: 'row',
        justifyContent: "center",
        fontFamily: Fonts.reg,
    }
})