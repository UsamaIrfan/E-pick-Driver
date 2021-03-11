import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native'
import colors from "../../Theme/Colors";
import { FontAwesome, MaterialIcons, Entypo, Ionicons, AuthScreenLogo } from "../../Constants/index";
import Fonts from '../../Theme/Fonts';
import * as signUpActions from "../../Store/action/login";
import Loader from "../../components/Loader";
import Toast from "react-native-simple-toast";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';

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

    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [Mobile, setMobile] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [IsLoading, setIsLoading] = useState(false)
    const [vehicleId, setVehicleId] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getVehicleListing();
            getLocation()
        });

        return unsubscribe;
    }, [navigation]);

    const getLocation = async () => {
        try {
            Toast.showWithGravity("Getting Location", Toast.SHORT, Toast.BOTTOM);
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                // setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            // setLocation(location);
        }
        catch {
            Toast.showWithGravity("Unable To get location", Toast.SHORT, Toast.BOTTOM);
        }
    }

    const getVehicleListing = async () => {
        setIsLoading(true);
        await dispatch(signUpActions.getVehicles())
        setIsLoading(false);
    }

    const authenticateHandler = async () => {
        if (Email !== '' && Password !== '' && FirstName !== '' && LastName !== '' && Mobile !== '' && vehicleId !== '') {
            try {
                setIsLoading(true);
                await dispatch(signUpActions.SignUpUser(Email, Password, FirstName, LastName, Mobile, vehicleId, navigation));
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.log(err.message);
            }
        }
    };

    const vehicles = useSelector(state => state.Auth.Vehicles)

    console.log("Vehicl ==> ", vehicles)

    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();
    const input5 = useRef();

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
                        <TextInput secureTextEntry={true} style={styles.defaultInput} underlineColor={colors.DarkGreen} ref={input5} onChangeText={(text) => setPassword(text)} placeholder="Password" />
                    </View>
                    {vehicles && <DropDownPicker
                        // items={[
                        //     {label: 'UK', value: 'uk', },
                        //     {label: 'France', value: 'france', },
                        // ]}

                        items={vehicles?.map((item, i) => {
                            return {
                                label: item.color.toString(),
                                value: item.id,
                            }
                        })}
                        defaultValue={vehicleId}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: colors.BackgroundGrey, }}
                        placeholder="Select Vehicle"
                        // itemStyle={{
                        //     justifyContent: 'flex-start'
                        // }}
                        dropDownStyle={{ backgroundColor: colors.BackgroundGrey, fontFamily: Fonts.reg }}
                        onChangeItem={item => {
                            setVehicleId(item.value);
                        }}
                    />}
                </View>
                <View style={styles.buttonsContainer}>
                    <View>
                        <Button color={colors.DarkGreen} title="Register" style={styles.buttonLogin} onPress={authenticateHandler} />
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
    },
    footerText: {
        fontFamily: Fonts.reg,
    }
})