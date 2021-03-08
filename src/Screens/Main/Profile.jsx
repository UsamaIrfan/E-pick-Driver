import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import Header from "../../components/Header";
import { Ionicons, avatar } from "../../Constants"
import colors from "../../Theme/Colors";
import { Avatar } from "react-native-paper"
import { useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window")

const Profile = () => {

    const currentUser = useSelector(state => state.currentUser)

    return (
        <View>
            <Header name="User Profile" icon={<Ionicons name="ios-person" size={24} color={colors.White} />} />
            <View style={styles.container}>
                <View style={styles.upperView}>
                    <Avatar.Image source={avatar} size={130} />
                    <Text style={{ fontSize: width * 0.07, color: colors.DarkGreen }}>{currentUser?.name}</Text>
                    <Text>{currentUser?.email}</Text>
                </View>
                <View style={styles.lowerView}>
                    <Text style={styles.userDetails}>Phone: {currentUser?.phone}</Text>
                    <Text style={styles.userDetails}>CNIC: {currentUser?.CNIC}</Text>
                    {!currentUser?.emailVerified &&
                        <TouchableOpacity style={{ alignItems: "center" }}>
                            <Text style={styles.verifyText}>Verify your Email</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
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
        fontSize: width * 0.05,
        color: colors.DarkGrey,
        marginVertical: height * 0.025,
    },
    verifyText: {
        fontWeight: "bold"
        , borderColor: colors.DarkGreen, borderBottomWidth: 1,
    }
})
