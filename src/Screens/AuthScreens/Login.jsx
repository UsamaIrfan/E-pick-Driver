import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native'
import { Button as PaperButton } from 'react-native-paper';
import colors from "../../Theme/Colors";
import { TextInput as PaperInput } from 'react-native-paper';
import { DefaultTheme } from "react-native-paper";
import { FontAwesome, MaterialIcons, Entypo, Ionicons, AuthScreenLogo } from "../../Constants/index";

// const theme = {
//     ...DefaultTheme,
//     roundness: 2,
//     colors: {
//         ...DefaultTheme.colors,
//         primary: '#3498db',
//         accent: '#f1c40f',
//     }
// };
const { height, width } = Dimensions.get("window")

export default function SignUp({ navigation }) {


    const input2 = useRef();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const loginValidate = () => {
        navigation.navigate("MapMain")
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.DarkGreen} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={AuthScreenLogo} />
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Log In</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons style={styles.inputIcon} name="person" size={18} color={colors.DarkGrey} />
                        <TextInput returnKeyType="next" onSubmitEditing={() => input2.current.focus()} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setEmail(text)} placeholder="Username / Email" />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.inputIcon} s name="lock" size={18} color={colors.DarkGrey} />
                        <TextInput onSubmitEditing={() => loginValidate()} style={styles.defaultInput} underlineColor={colors.DarkGreen} ref={input2} onChangeText={(text) => setPassword(text)} placeholder="Password" />
                    </View>
                    <TouchableOpacity activeOpacity={.6} onPress={() => navigation.push("ForgetPassword")} style={styles.forgetContainer}>
                        <Text style={{ ...styles.forgetText, color: colors.DarkGreen, }}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity activeOpacity={.6} onPress={() => loginValidate()} style={{ ...styles.buttonLogin }}>
                        <Text style={{ ...styles.buttonText }}>Log In</Text>
                    </TouchableOpacity>
                    <View style={styles.sepLineContainer}>
                        <View style={styles.sepLine}></View>
                        <Text style={styles.sepText}>OR</Text>
                        <View style={styles.sepLine}></View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} activeOpacity={.6} style={styles.footerLinks}>
                            <Text style={{ ...styles.footerText, color: colors.LightGrey }}>Don't Have an Account?</Text>
                            <Text style={{ ...styles.footerText, color: colors.DarkGreen }}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

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
        color: colors.LightGrey2
    },
    defaultInput: {
        flex: 1,
        fontSize: width * 0.04,
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
        color: colors.DarkGrey
    },
    buttonText: {
        color: colors.White,
        fontSize: 18,
        textTransform: "none",
    },
    buttonsContainer: {
        flex: 1,
        paddingVertical: 10,
        marginTop: height * 0.05
    },
    forgetContainer: {
        marginBottom: height * 0.04
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: "center",
    }
})