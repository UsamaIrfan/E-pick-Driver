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
    const input3 = useRef();
    const input4 = useRef();
    const input5 = useRef();

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.DarkGreen} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={AuthScreenLogo} />
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Register</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons style={styles.inputIcon} name="person" size={18} color={colors.DarkGrey} />
                        <TextInput returnKeyType="next" onSubmitEditing={() => input2.current.focus()} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setFirstName(text)} placeholder="First Name" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons style={styles.inputIcon} name="person" size={18} color={colors.DarkGrey} />
                        <TextInput returnKeyType="next" onSubmitEditing={() => input3.current.focus()} ref={input2} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={text => (setLastName(text))} placeholder="Last Name" />
                    </View>
                    <View style={styles.inputContainer}>
                        <FontAwesome style={styles.inputIcon} name="phone" size={18} color={colors.DarkGrey} />
                        <TextInput returnKeyType="next" onSubmitEditing={() => input4.current.focus()} ref={input3} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setMobile(text)} placeholder="Phone Number" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Entypo style={styles.inputIcon} name="mail" size={18} color={colors.DarkGrey} />
                        <TextInput returnKeyType="next" onSubmitEditing={() => input5.current.focus()} ref={input4} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setEmail(text)} placeholder="Email" />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                        <TextInput onSubmitEditing={() => navigation.push("MapMain")} style={styles.defaultInput} underlineColor={colors.DarkGreen} ref={input5} onChangeText={(text) => setPassword(text)} placeholder="Password" />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <View>
                        <Button color={colors.DarkGreen} title="Register" style={styles.buttonLogin} />
                        <TouchableOpacity activeOpacity={.6} style={styles.footerLinks}>
                            <Text style={{ ...styles.footerText, ...styles.forgetText, color: colors.DarkGreen, }}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.push("Login")} activeOpacity={.6} style={styles.footerLinks}>
                            <Text style={{ ...styles.footerText, color: colors.LightGrey }}>Already Have an Account?</Text>
                            <Text style={{ ...styles.footerText, color: colors.DarkGreen }}>Login</Text>
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
        marginTop: height * 0.01
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
    },
    buttonText: {
        color: colors.White,
        fontSize: 18,
        textTransform: "none",
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: "center",
    }
})