import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions , TouchableOpacity } from 'react-native';
import Header from "../../components/Header";
import { MaterialIcons, Entypo } from "../../Constants"
import colors from "../../Theme/Colors";

const { height, width } = Dimensions.get("window")

const ChangePassword = ({navigation}) => {

    const [OldPassword, setOldPassword] = useState("")
    const [NewPassword, setNewPassword] = useState("")
    const [RePassword, setRePassword] = useState("")

    const input2 = useRef();
    const input3 = useRef();

    return (
        <View style={styles.container}>
            <Header name="Reset Password" icon={<MaterialIcons name="lock" size={24} color={colors.White} />} />

            <View style={styles.inputFieldContainer}>
                <View style={styles.inputContainer}>
                    <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                    <TextInput returnKeyType="next" onSubmitEditing={() => input2.current.focus()} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setOldPassword(text)} placeholder="Old Password" />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                    <TextInput returnKeyType="next" onSubmitEditing={() => input3.current.focus()} ref={input2} style={styles.defaultInput} underlineColor={colors.DarkGreen} onChangeText={(text) => setNewPassword(text)} placeholder="New Password" />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons style={styles.inputIcon} name="lock" size={18} color={colors.DarkGrey} />
                    <TextInput style={styles.defaultInput} onSubmitEditing={() => navigation.navigate("TabNavigator")} underlineColor={colors.DarkGreen} ref={input3} onChangeText={(text) => setRePassword(text)} placeholder="Confirm Password" />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} activeOpacity={0.5} style={styles.buttonLogin}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
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
        height: height * 0.9,
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
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        backgroundColor: colors.DarkGreen,
        height: height * 0.06,
        marginTop: 20,
    },
    buttonText: {
        color: colors.White,
        fontSize: 18,
    },
})
