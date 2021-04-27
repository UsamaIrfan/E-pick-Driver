import React, { useState, createRef, useEffect, } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import { Button as PaperButton } from 'react-native-paper';
import colors from "../../Theme/Colors";
import { TextInput as PaperInput } from 'react-native-paper';
import { DefaultTheme } from "react-native-paper";
import { FontAwesome, MaterialIcons, Entypo, Ionicons, AuthScreenLogo } from "../../Constants/index";
import Fonts from '../../Theme/Fonts';
import { useDispatch, } from 'react-redux';
import Toast from "react-native-simple-toast"
import * as authActions from '../../Store/action/login';
import Loader from "../../components/Loader";
import * as signUpActions from "../../Store/action/login";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Api } from "../../Store/server";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";


const { height, width } = Dimensions.get("window")

export default function SignUp({ navigation }) {

    const [Token, setToken] = useState(null)
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [IsLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getVehicleListing();
        });

        return unsubscribe;
    }, [navigation]);

    //PREVENTING GOING BACK

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true;
            };

            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => {
                // Once the Screen gets blur Remove Event Listener
                BackHandler.removeEventListener("hardwareBackPress", onBackPress);
            };
        }, [])
    );

    const authenticateHandler = async () => {
        await axios.get(`${Api}/api/Token`, {
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                setToken(response.data)
            })
            .catch((error) => {
                alert("error", error.response)
            })
        if (Email && Token && Password !== '') {
            setIsLoading(true);
            console.log(Email, Password, Token, navigation)
            await dispatch(authActions.LoginUser(Email, Password, Token, navigation));
            setIsLoading(false)
        }
    };

    const getVehicleListing = async () => {
        setIsLoading(true);
        await dispatch(signUpActions.getVehicles())
        setIsLoading(false);
    }
    const messageWithPosition = (position = "top", hasDescription = true, extra = {}) => {
        let message = {
            message: "Some message title",
            type: "info",
            position,
            ...extra,
        };
        if (hasDescription) {
            message = { ...message, description: "Lorem ipsum dolar sit amet" };
        } else {
            message = { ...message, floating: true };
        }

        showMessage(message);
    }

    const input2 = createRef();

    const passRef = createRef();
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
                        <TextInput blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => { passRef.current.focus() }} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setEmail(text)} placeholder="Username / Email" />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.inputIcon} s name="lock" size={18} color={colors.DarkGrey} />

                        <TextInput blurOnSubmit={false} textContentType="password" secureTextEntry={true} onSubmitEditing={() => authenticateHandler()} style={styles.defaultInput} underlineColor={colors.DarkGreen} ref={passRef} onChangeText={(text) => setPassword(text)} placeholder="Password" />
                    </View>
                    <TouchableOpacity activeOpacity={.6} onPress={() => navigation.push("ForgetPassword")} style={styles.forgetContainer}>
                        <Text style={{ ...styles.forgetText, color: colors.DarkGreen, }}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity activeOpacity={.6}
                        onPress={() => authenticateHandler()}
                        style={{ ...styles.buttonLogin }}>
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
        fontFamily: Fonts.bold,
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
        fontFamily: Fonts.reg,
    },
    footerText: {
        fontFamily: Fonts.reg,
    }
})