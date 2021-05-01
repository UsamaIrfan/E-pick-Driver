import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import Loader from "../../components/Loader";
import { avatar, FontAwesome } from "../../Constants"
import colors from "../../Theme/Colors";
import { Avatar, TouchableRipple } from "react-native-paper"
import { useSelector, useDispatch } from "react-redux";
import Fonts from '../../Theme/Fonts';
import * as userActions from "../../Store/action/login";
import { TextInput } from 'react-native-gesture-handler';
import { updateProfile } from "../../Store/action/login";
import * as ImagePicker from 'expo-image-picker';
import { updateAvatar } from "../../Store/action/login";
import * as FileSystem from 'expo-file-system';
import { showMessage } from 'react-native-flash-message';
import { DatePicker } from "../../components/DatePicker";

const { width, height } = Dimensions.get("window")

const Profile = ({ route, navigation }) => {
    
    const dispatch = useDispatch();
    
    const { userLoggedIn } = route.params;

    const _input = useRef()
    const _input1 = useRef()
    const _input2 = useRef()
    const _input3 = useRef()
    const _input4 = useRef()
    const _input5 = useRef()
    const _input6 = useRef()
    const _input7 = useRef()
    
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 10, }} onPress={() => navigation.navigate("MapMain", {screen: "Notification"})}>
                    <FontAwesome name="bell" color={colors.White} size={24} />
                </TouchableOpacity>
            )
        });
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLoading(true);
            getUserInfo();
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserInfo();
        });

        return unsubscribe;
    }, [navigation]);

    const [First, setFirst] = useState()
    const [Last, setLast] = useState()
    const [Middle, setMiddle] = useState()
    const [Province, setProvince] = useState()
    const [City, setCity] = useState()
    const [Company, setCompany] = useState()
    const [LicenseNumber, setLicenseNumber] = useState()
    const [LicenseExpiry, setlicenseExpiry] = useState()
    const [PostalCode, setPostalCode] = useState()
    const [InsuranceNumber, setInsuranceNumber] = useState()
    const [InsuranceExpiry, setInsuranceExpiry] = useState()
    const [IsLoading, setIsLoading] = useState(false);
    const [Phone, setPhone] = useState();
    const [Address, setAddress] = useState();
    const [date, setdate] = useState()
    const [UserAvatar, setUserAvatar] = useState();
    const [Doc64URI, setDoc64URI] = useState();



    const convertStringToBinary = (str) => str.split("").map(l => l.charCodeAt(0).toString(2)).join(" ");

    const getUserInfo = async () => {
        await dispatch(userActions.getUserInfo(userLoggedIn.userId))
    }

    const getUserAvatar = async () => {

        let response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!response.cancelled) {
            setIsLoading(true)
            setUserAvatar(response);
            const docURIArr = response.uri.split("/");
            const avatarName = docURIArr[docURIArr.length - 1]
            const docType = response.uri.split(".")
            const fileBase64 = await FileSystem.readAsStringAsync(response.uri, {
                encoding: FileSystem.EncodingType.Base64,
            })
                .then((response64) => {
                    setDoc64URI(`base64, ${response64}`)
                    console.log({
                        name: avatarName,
                        type: docType[docType.length - 1],
                        uri: response.uri,
                    })
                }).catch((error) => {
                    showMessage({ message: `Unable to Update Profile, ${error.message}`, type: "warning" })
                })
            dispatch(updateAvatar(userLoggedIn.userId, avatarName, response.type, Doc64URI))
            setIsLoading(false)
        }
    }

    const updateProfileHandler = () => {
        setIsLoading(true)
        dispatch(updateProfile(
            userLoggedIn.userId,
            First ? First : userInfo?.firstName,
            Last ? Last : userInfo?.lastName,
            Middle ? Middle : userInfo?.middleName,
            Address ? Address : userInfo?.address,
            Phone ? Phone : userInfo?.phoneNumber,
            InsuranceNumber ? InsuranceNumber : userInfo?.insuranceNumber,
            PostalCode ? PostalCode : userInfo?.postalCode,
            Company ? Company : userInfo?.insuranceCompany,
            InsuranceExpiry ? InsuranceExpiry : userInfo?.insuranceExpiryDate,
            LicenseNumber ? LicenseNumber : userInfo?.driversLicenseNumber,
            LicenseExpiry ? LicenseExpiry : userInfo?.driversLicenseExpiryDate,
            City ? City : userInfo?.city,
            Province ? Province : userInfo?.province,
            navigation
        ))
        setIsLoading(false)
    }

    const currentUser = useSelector(state => state.Auth.Login)
    const userInfo = useSelector(state => state.Auth.userInfo)


    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={85}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={styles.container}>
                        <View style={styles.upperView}>
                            <TouchableRipple onPress={getUserAvatar} style={{ zIndex: 2 }} rippleColor={colors.LightGrey2}>
                                <Avatar.Image source={UserAvatar ? { uri: UserAvatar.uri } : avatar} size={110} style={{ zIndex: 1 }} />
                            </TouchableRipple>
                            <Text style={{ fontSize: width * 0.07, color: colors.DarkGreen, fontFamily: Fonts.reg }}>{currentUser?.userName}</Text>
                            <Text style={{ fontFamily: Fonts.reg }}>{currentUser?.role}</Text>
                        </View>
                        <View style={styles.lowerView}>
                            <View>
                                <View style={{ ...styles.labelInput, borderColor: colors.LightGray3 }}>
                                    <Text style={styles.inputTitle}>Email</Text>
                                    <TextInput style={{ ...styles.userDetails, color: colors.LightGrey }} editable={false} defaultValue={userInfo?.email} onChangeText={(text) => { }} />
                                </View>
                                <View style={{ ...styles.labelInput, borderColor: colors.LightGray3 }}>
                                    <Text style={styles.inputTitle}>Phone</Text>
                                    <TextInput onSubmitEditing={() => _input.current.focus()} blurOnSubmit={false} returnKeyType="next" style={{ ...styles.userDetails, color: colors.LightGrey }} editable={false} defaultValue={userInfo?.phoneNumber} onChangeText={(text) => { }} />
                                </View>
                                <View style={styles.labelInput}>
                                    <Text style={styles.inputTitle}>City</Text>
                                    <TextInput ref={_input} style={styles.userDetails} placeholder="Enter City Name" defaultValue={userInfo?.city} value={City} onChangeText={(text) => setCity(text)} />
                                </View>
                                <View style={styles.labelInput}>
                                    <Text style={styles.inputTitle}>Province</Text>
                                    <TextInput onSubmitEditing={() => _input1.current.focus()} blurOnSubmit={false} returnKeyType="next" style={styles.userDetails} value={Province} placeholder="Enter Province Name" defaultValue={userInfo?.province} onChangeText={(text) => setProvince(text)} />
                                </View>
                                <View style={styles.labelInput}>
                                    <Text style={styles.inputTitle}>Address</Text>
                                    <TextInput ref={_input1} onSubmitEditing={() => _input2.current.focus()} blurOnSubmit={false} returnKeyType="next" style={styles.userDetails} placeholder="Enter Your Address" value={Address} defaultValue={userInfo?.address} onChangeText={(text) => setAddress(text)} />
                                </View>
                                <View style={styles.labelInput}>
                                    <Text style={styles.inputTitle}>Company</Text>
                                    <TextInput ref={_input2} onSubmitEditing={() => _input3.current.focus()} blurOnSubmit={false} returnKeyType="next" style={styles.userDetails} defaultValue={userInfo?.insuranceCompany} value={Company} placeholder="Insurance Company Name" onChangeText={(text) => setCompany(text)} />
                                </View>
                                <View style={styles.labelInput}>
                                    <Text style={styles.inputTitle}>License No.</Text>
                                    <TextInput ref={_input3} onSubmitEditing={() => _input4.current.focus()} blurOnSubmit={false} returnKeyType="next" style={styles.userDetails} value={LicenseNumber} placeholder="Enter Driver License Number" defaultValue={userInfo?.driversLicenseNumber} onChangeText={(text) => setLicenseNumber(text)} />
                                </View>
                                <DatePicker
                                    label={"License Expiry Date"}
                                    iconName={"date"}
                                    iconType="Fontisto"
                                    defaultValue={userInfo?.driversLicenseExpiryDate}
                                    value={LicenseExpiry}
                                    placeholder={"End Date"}
                                    onChange={(val) => {
                                        setlicenseExpiry(val);
                                    }}
                                    onSubmitEditing={() => _input4.current.focus()}
                                />
                                <View style={styles.labelInput}>
                                    <Text style={styles.inputTitle}>Postal Code</Text>
                                    <TextInput ref={_input4} onSubmitEditing={() => _input6.current.focus()} blurOnSubmit={false} returnKeyType="next" style={styles.userDetails} value={PostalCode} defaultValue={userInfo?.postalCode} placeholder="Enter Postal Code" onChangeText={(text) => setPostalCode(text)} />
                                </View>
                                <View style={styles.labelInput}>
                                    <Text style={styles.inputTitle}>Insurance No.</Text>
                                    <TextInput ref={_input6} blurOnSubmit={false} returnKeyType="next" style={styles.userDetails} value={InsuranceNumber} placeholder="Enter Insurance Number" defaultValue={userInfo?.insuranceNumber} onChangeText={(text) => setInsuranceNumber(text)} />
                                </View>
                                <DatePicker
                                    label={"Insurance Expiry Date"}
                                    iconName={"date"}
                                    iconType="Fontisto"
                                    defaultValue={userInfo?.insuranceExpiryDate}
                                    value={InsuranceExpiry}
                                    placeholder={"End Date"}
                                    onChange={(val) => {
                                        setInsuranceExpiry(val);
                                    }}
                                />

                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity activeOpacity={.6} onPress={() => { updateProfileHandler() }} style={{ ...styles.buttonSave, marginHorizontal: !currentUser.emailVerified ? 3 : 0, }}>
                                    <Text style={{ ...styles.buttonText }}>Save</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
                {userInfo?.success == null && <Loader />}
            </KeyboardAvoidingView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    upperView: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
        height: height * 0.3
    },
    lowerView: {
        flex: 1,
        zIndex: 2,
        marginHorizontal: width * 0.06,
    },
    userDetails: {
        fontSize: width * 0.04,
        color: colors.DarkGrey,
        fontFamily: Fonts.reg,
        flex: 1,
    },
    verifyText: {
        fontWeight: "bold",
        fontFamily: Fonts.bold,
        borderColor: colors.DarkGreen, borderBottomWidth: 1,
    },
    inputTitle: {
        fontFamily: Fonts.reg,
        marginRight: 10,
        color: colors.DarkGreen
    },
    labelInput: {
        flexDirection: "row",
        color: colors.DarkGrey,
        borderBottomWidth: 2,
        borderColor: colors.LightGray3,
        alignItems: "center",
        marginVertical: height * 0.02,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    buttonSave: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        paddingVertical: height * 0.02,
        textTransform: "none",
        backgroundColor: colors.DarkGreen,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
    },
    buttonText: {
        color: colors.White,
        fontSize: 18,
        textTransform: "none",
        fontFamily: Fonts.reg,
    },
})
