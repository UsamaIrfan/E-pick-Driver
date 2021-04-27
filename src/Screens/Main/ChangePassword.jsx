import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Loader from "../../components/Loader";
import { useSelector, useDispatch } from "react-redux"
import { MaterialIcons, Entypo } from "../../Constants"
import colors from "../../Theme/Colors";
import { changePassword } from "../../Store/action/login";

const { height, width } = Dimensions.get("window");

const ChangePassword = ({ navigation }) => {

    const [OldPassword, setOldPassword] = useState("")
    const [NewPassword, setNewPassword] = useState("")
    const [RePassword, setRePassword] = useState("")
    const [IsLoading, setIsLoading] = useState(false)

    const input2 = useRef();
    const input3 = useRef();

    const dispatch = useDispatch()

    const userId = useSelector(state => state.Auth.Login.userId)

    const passwordChangehandler = async (userId, oldPass, newPass, confirmPass) => {
        if (oldPass != "" && newPass != oldPass && newPass != "" && newPass == confirmPass) {
            setIsLoading(true)
            await dispatch(changePassword(userId, oldPass, newPass, navigation))
            setIsLoading(false)
        }

    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <View style={styles.inputFieldContainer}>
                <View style={styles.inputContainer}>
                    <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                    <TextInput secureTextEntry={true} returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => input2.current.focus()} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setOldPassword(text)} placeholder="Old Password" />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                    <TextInput secureTextEntry={true} returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => input3.current.focus()} ref={input2} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setNewPassword(text)} placeholder="New Password" />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                    <TextInput secureTextEntry={true} style={styles.defaultInput} onSubmitEditing={() => passwordChangehandler(userId, OldPassword, NewPassword, RePassword)} underlineColor={colors.DarkGreen} ref={input3} onChangeText={(text) => setRePassword(text)} placeholder="Confirm Password" />
                </View>
                <TouchableOpacity onPress={() => passwordChangehandler(userId, OldPassword, NewPassword, RePassword)} activeOpacity={0.5} style={styles.buttonLogin}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
            </View>
            {IsLoading && <Loader />}
        </KeyboardAvoidingView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: { flex: 1, },
    inputContainer: {
        borderBottomColor: colors.DarkGreen,
        borderBottomWidth: 2,
        borderStyle: "solid",
        height: height * 0.08,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputFieldContainer: {
        paddingHorizontal: width * 0.05,
        flex: 1,
        backgroundColor: colors.BackgroundGrey,
        justifyContent: "center"
    },
    inputIcon: {
        paddingRight: width * 0.02,
    },
    inputsContainer: {
        paddingHorizontal: 30,
    },
    defaultInput: {
        flex: 1,
        fontSize: width * 0.04,
    },
    inputIcon: {
        paddingRight: width * 0.02,
    },
    buttonLogin: {
        marginTop: 10,
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
    },
})
