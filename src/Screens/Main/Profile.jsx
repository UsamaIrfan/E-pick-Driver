import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { Ionicons, avatar } from "../../Constants"
import colors from "../../Theme/Colors";
import { Avatar } from "react-native-paper"
import { useSelector, useDispatch } from "react-redux";
import Fonts from '../../Theme/Fonts';
import * as userActions from "../../Store/action/login";

const { width, height } = Dimensions.get("window")

const Profile = ({ route, navigation }) => {

    const { userLoggedIn } = route.params;
    const [IsLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserInfo();
        });
    
        return unsubscribe;
    }, [navigation]);
    
    const getUserInfo = async () => {
        setIsLoading(true);
        await dispatch(userActions.getUserInfo(userLoggedIn.userId))
        setIsLoading(false);
    }

    const currentUser = useSelector(state => state.Auth.Login)
    const userInfo = useSelector(state => state.Auth.userInfo)


    return (
        <View style={{flex: 1}}>
            <Header name="User Profile" icon={<Ionicons name="ios-person" size={24} color={colors.White} />} />
            <View style={styles.container}>
                <View style={styles.upperView}>
                    <Avatar.Image source={avatar} size={130} />
                    <Text style={{ fontSize: width * 0.07, color: colors.DarkGreen , fontFamily: Fonts.reg }}>{currentUser?.userName}</Text>
                    <Text style={{fontFamily: Fonts.reg}}>{currentUser?.role}</Text>
                </View>
                <View style={styles.lowerView}>
                    <Text style={styles.userDetails}>City: {userInfo?.city} </Text>
                    <Text style={styles.userDetails}>Phone: {userInfo?.phoneNumber} </Text>
                    <Text style={styles.userDetails}>Insurance Company: {userInfo.insuranceCompany ? userInfo.insuranceCompany : 
                        <TouchableOpacity style={{ alignItems: "center", marginTop: "auto" }}>
                            <Text style={styles.verifyText}>Add</Text>
                        </TouchableOpacity>} </Text>
                    <Text style={styles.userDetails}>Driver Licence: {userInfo?.driversLicenseNumber  ? userInfo?.driversLicenseNumber : 
                        <TouchableOpacity style={{ alignItems: "center", marginTop: "auto" }}>
                            <Text style={styles.verifyText}>Add</Text>
                        </TouchableOpacity>} </Text>
                    <Text style={styles.userDetails}>Insurance Expiry Date: {userInfo?.insuranceExpiryDate  ? userInfo?.insuranceExpiryDate : 
                        <TouchableOpacity style={{ alignItems: "center", marginTop: "auto" }}>
                            <Text style={styles.verifyText}>Add</Text>
                        </TouchableOpacity>} </Text>

                    {!currentUser?.emailVerified &&
                        <TouchableOpacity style={{ alignItems: "center", marginTop: "auto" }}>
                            <Text style={styles.verifyText}>Verify your Email</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
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
        flex: 1,
    },
    lowerView: {
        flex: 1,
        marginHorizontal: width * 0.06,
    },
    userDetails: {
        fontSize: width * 0.04,
        color: colors.DarkGrey,
        marginVertical: height * 0.015,
        fontFamily: Fonts.reg,
    },
    verifyText: {
        fontWeight: "bold",
        fontFamily: Fonts.bold,
        borderColor: colors.DarkGreen, borderBottomWidth: 1,
    }
})
