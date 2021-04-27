import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native'
import colors from "../../Theme/Colors";
import { FontAwesome, MaterialIcons, Entypo, Ionicons, AuthScreenLogo } from "../../Constants/index";
import Fonts from "../../Theme/Fonts";
import { useSelector, useDispatch } from "react-redux"
import Toast from "react-native-simple-toast";
import Loader from "../../components/Loader";

const { height, width } = Dimensions.get("window")

export default function EnterForgetCode({ navigation }) {

    const [Code, setCode] = useState("");

    const [IsLoading, setIsLoading] = useState(false)

    const code = useSelector(state => state.Auth.userInfo.verificationCode);
 
    const codeSubmitHandler = (code ,enteredCode) => {
        if (code == enteredCode) {
            navigation.navigate("ChangePasswordAuth");
        } else {
            showMessage({message: `Code Does not Match.`, type: "warning"})
        }
    } 

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.DarkGreen} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={AuthScreenLogo} />
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Enter Code</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputContainer}>
                        {/* <Entypo style={styles.inputIcon} name="mail" size={18} color={colors.DarkGrey} /> */}
                        <TextInput style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setCode(text)} placeholder="Verification Code" />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => {codeSubmitHandler(code, Code)}} activeOpacity={.6} style={{ ...styles.buttonLogin }}>
                        <Text style={{ ...styles.buttonText }}>Submit Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {IsLoading && <Loader />}
        </View>
    )
}

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
        borderRadius: 8,
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