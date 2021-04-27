import React, { useState, createRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, ScrollView, TouchableOpacity, TextInput, LayoutAnimation, Platform, UIManager } from 'react-native'
import colors from "../../Theme/Colors";
import { FontAwesome, MaterialIcons, Entypo, Ionicons, AuthScreenLogo, Feather, FontAwesome5 } from "../../Constants/index";
import Fonts from '../../Theme/Fonts';
import * as signUpActions from "../../Store/action/login";
import Loader from "../../components/Loader";
import { useSelector, useDispatch } from "react-redux";

const { height, width } = Dimensions.get("window")

export default function SignUp({ navigation }) {

    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [Mobile, setMobile] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [IsLoading, setIsLoading] = useState(false)
    const [vehicleId, setVehicleId] = useState(null);

    const dispatch = useDispatch()

    // Drop Down Expand Logic
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getVehicleListing();
        });

        return unsubscribe;
    }, [navigation]);

    const getVehicleListing = async () => {
        setIsLoading(true);
        await dispatch(signUpActions.getVehicles())
        setIsLoading(false);
    }

    const authenticateHandler = async () => {
        if (Email != '' && Password != '' && FirstName != '' && LastName != '' && Mobile != '' && vehicleId != '' && Email && Password && FirstName && LastName && Mobile && vehicleId) {
            try {
                setIsLoading(true);
                await dispatch(signUpActions.SignUpUser(Email, Password, FirstName, LastName, Mobile, Number(vehicleId.value), navigation));
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.log(err.message);
            }
        }
    };

    const vehicles = useSelector(state => state.Auth.Vehicles)

    const input2 = createRef();
    const input3 = createRef();
    const input4 = createRef();
    const input5 = createRef();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.DarkGreen} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={AuthScreenLogo} />
            </View>
            <ScrollView style={styles.inputsContainer}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Register</Text>
                </View>
                <View
                    style={styles.inputFieldContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={styles.inputContainer}>
                        <Ionicons style={styles.inputIcon} name="person" size={18} color={colors.DarkGrey} />
                        <TextInput blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => input2.current.focus()} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setFirstName(text)} placeholder="First Name" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons style={styles.inputIcon} name="person" size={18} color={colors.DarkGrey} />
                        <TextInput blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => input3.current.focus()} ref={input2} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={text => (setLastName(text))} placeholder="Last Name" />
                    </View>
                    <View style={styles.inputContainer}>
                        <FontAwesome style={styles.inputIcon} name="phone" size={18} color={colors.DarkGrey} />
                        <TextInput blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => input4.current.focus()} ref={input3} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setMobile(text)} placeholder="Phone Number" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Entypo style={styles.inputIcon} name="mail" size={18} color={colors.DarkGrey} />
                        <TextInput blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => input5.current.focus()} ref={input4} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setEmail(text)} placeholder="Email" />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                        <TextInput onSubmitEditing={() => toggleExpand()} blurOnSubmit={false} secureTextEntry={true} style={styles.defaultInput} underlineColor={colors.DarkGreen} ref={input5} onChangeText={(text) => setPassword(text)} placeholder="Password" />
                    </View>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.2}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderColor: colors.DarkGreen,
                                borderWidth: 1,
                                padding: 10,
                                paddingVertical: 15,
                                borderRadius: 10,
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                            onPress={() => toggleExpand()}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 15, color: colors.DarkGreen, marginLeft: 5, fontFamily: Fonts.reg }}>
                                    {vehicleId ? vehicleId.text : "Select Vehicle"}
                                </Text>
                            </View>

                            <FontAwesome5
                                name={expanded ? "chevron-up" : "chevron-down"}
                                size={20}
                                color={colors.DarkGreen}


                            />
                        </TouchableOpacity>

                        {expanded && vehicles.map((item, idx) => (
                            <TouchableOpacity onPress={() => { setVehicleId(item); toggleExpand() }} activeOpacity={.5} key={idx} style={{ padding: 10 }}>
                                <Text style={{ fontFamily: Fonts.reg, fontSize: 14, color: colors.DarkGreen }}>{item.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => authenticateHandler()}
                            style={{ ...styles.buttonLogin }}
                        >
                            <Text style={{ ...styles.buttonText }}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")} activeOpacity={.6} style={styles.footerLinks}>
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
            </ScrollView>
            { IsLoading && <Loader />}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BackgroundGrey
    },
    logoContainer: {
        flex: .3,
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
        fontFamily: Fonts.reg,
    },
    inputContainer: {
        borderBottomColor: colors.DarkGreen,
        borderBottomWidth: 2,
        borderStyle: "solid",
        height: height * 0.08,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    forgetText: {
        marginLeft: "auto",
        marginTop: height * 0.01,
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
    buttonText: {
        color: colors.White,
        fontSize: 18,
        textTransform: "none",
        fontFamily: Fonts.reg,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 10,
        zIndex: -1,
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 10,
    },
    footerText: {
        fontFamily: Fonts.reg,
    }
})