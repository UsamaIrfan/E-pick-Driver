import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { Ionicons, avatar } from "../../Constants"
import colors from "../../Theme/Colors";
import { Avatar, TouchableRipple } from "react-native-paper"
import { useSelector, useDispatch } from "react-redux";
import Fonts from '../../Theme/Fonts';
import * as userActions from "../../Store/action/login";
import { TextInput } from 'react-native-gesture-handler';
import { updateProfile } from "../../Store/action/login";
import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64'
import { updateAvatar } from "../../Store/action/login";

const { width, height } = Dimensions.get("window")

const Profile = ({ route, navigation }) => {

    const { userLoggedIn } = route.params;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("User ==>", userLoggedIn)
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
    const [UserAvatar, setUserAvatar] = useState();

    const dispatch = useDispatch();

    const convertStringToBinary = (str) => str.split("").map(l => l.charCodeAt(0).toString(2)).join(" ");

    const getUserInfo = async () => {
        setIsLoading(true);
        await dispatch(userActions.getUserInfo(userLoggedIn.userId))
        setIsLoading(false);
    }

    const getUserAvatar = async () => {
        // await DocumentPicker.getDocumentAsync()
        //     .then((response) => {
        //         setDocument(response)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
        //     })

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setUserAvatar(result);
            const docURIArr = result.uri.split("/");
            const avatarName = docURIArr[docURIArr.length - 1]
            const binaryURI = convertStringToBinary(result.uri)
            setUserAvatar(result.uri)
            console.log(result.uri)
            setIsLoading(true)
            dispatch(updateAvatar(userLoggedIn.userId, avatarName, result.type, `base64,${base64.encode(binaryURI)}`))
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
            Phone ? Phone : userInfo.phoneNumber,
            InsuranceNumber ? InsuranceNumber : userInfo.insuranceNumber,
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
            <Header name="User Profile" icon={<Ionicons name="ios-person" size={24} color={colors.White} />} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.upperView}>
                        <TouchableRipple onPress={getUserAvatar} style={{ zIndex: 2 }} rippleColor={colors.LightGrey2}>
                            <Avatar.Image source={UserAvatar ? {uri: UserAvatar} : avatar} size={110} style={{ zIndex: 1 }} />
                        </TouchableRipple>
                        <Text style={{ fontSize: width * 0.07, color: colors.DarkGreen, fontFamily: Fonts.reg }}>{currentUser?.userName}</Text>
                        <Text style={{ fontFamily: Fonts.reg }}>{currentUser?.role}</Text>
                    </View>
                    <View style={styles.lowerView}>
                        <ScrollView>
                            <View style={{ ...styles.labelInput, borderColor: colors.LightGrey }}>
                                <Text style={styles.inputTitle}>Email</Text>
                                <TextInput style={styles.userDetails} editable={false} defaultValue={userInfo?.email} onChangeText={(text) => { }} />
                            </View>
                            <View style={{ ...styles.labelInput, borderColor: colors.LightGrey }}>
                                <Text style={styles.inputTitle}>Phone</Text>
                                <TextInput style={styles.userDetails} editable={false} defaultValue={userInfo?.phoneNumber} onChangeText={(text) => { }} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>City</Text>
                                <TextInput style={styles.userDetails} placeholder={userInfo?.city} defaultValue={City} onChangeText={(text) => setCity(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>Province</Text>
                                <TextInput style={styles.userDetails} defaultValue={Province} placeholder={userInfo?.province} onChangeText={(text) => setProvince(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>Address</Text>
                                <TextInput style={styles.userDetails} defaultValue={Address} placeholder={userInfo?.address} onChangeText={(text) => setAddress(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>Company</Text>
                                <TextInput style={styles.userDetails} defaultValue={Company} placeholder={userInfo?.insuranceCompany} onChangeText={(text) => setCompany(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>License No.</Text>
                                <TextInput style={styles.userDetails} defaultValue={LicenseNumber} placeholder={userInfo?.driversLicenseNumber} onChangeText={(text) => setLicenseNumber(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>License Expiry Date</Text>
                                <TextInput style={styles.userDetails} defaultValue={LicenseExpiry} placeholder={userInfo?.driversLicenseExpiryDate} onChangeText={(text) => setlicenseExpiry(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>Postal Code</Text>
                                <TextInput style={styles.userDetails} defaultValue={PostalCode} placeholder={userInfo?.postalCode} onChangeText={(text) => setPostalCode(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>Insurance No.</Text>
                                <TextInput style={styles.userDetails} defaultValue={InsuranceNumber} placeholder={userInfo?.insuranceNumber} onChangeText={(text) => setInsuranceNumber(text)} />
                            </View>
                            <View style={styles.labelInput}>
                                <Text style={styles.inputTitle}>Insurance Expiry Date</Text>
                                <TextInput style={styles.userDetails} defaultValue={InsuranceExpiry} placeholder={userInfo?.insuranceExpiryDate} onChangeText={(text) => setInsuranceExpiry(text)} />
                            </View>

                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity activeOpacity={.6} onPress={() => { updateProfileHandler() }} style={{ ...styles.buttonSave, marginHorizontal: !currentUser.emailVerified ? 3 : 0, }}>
                                <Text style={{ ...styles.buttonText }}>Save</Text>
                            </TouchableOpacity>
                            {/* {!currentUser?.emailVerified && <TouchableOpacity activeOpacity={.6} onPress={() => {}} style={{ ...styles.buttonSave, marginHorizontal: !currentUser.emailVerified ? 3 : 0, }}>
                            <Text style={{ ...styles.buttonText }}>Verify Email</Text>
                        </TouchableOpacity>} */}
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
            {IsLoading && <Loader />}
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        height: "90%",
    },
    upperView: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
        flex: .65,
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
    },
    labelInput: {
        flexDirection: "row",
        color: colors.DarkGrey,
        borderBottomWidth: 2,
        borderColor: colors.DarkGreen,
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
        flex: 1,
    },
    buttonText: {
        color: colors.White,
        fontSize: 18,
        textTransform: "none",
        fontFamily: Fonts.reg,
    },
})
