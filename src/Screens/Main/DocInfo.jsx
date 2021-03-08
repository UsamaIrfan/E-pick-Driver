import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity , Share } from 'react-native'
import Header from "../../components/Header";
import colors from "../../Theme/Colors";
import { Ionicons, MaterialIcons, Entypo, FontAwesome5 } from "../../Constants"

const { height, width } = Dimensions.get("window")

const DocInfo = ({ route, navigation }) => {

    const { item } = route.params;

    const shareMessage = (path, title) => {
        // //Here is the Share API
        Share.share({
          message: path.toString(),
          url: path,
        })
          //after successful share return result
          .then((result) => console.log(result))
          //If any thing goes wrong it comes here
          .catch((errorMsg) => console.log(errorMsg));
      };

    const ChatHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.5} style={styles.headerLeft}>
                <MaterialIcons name="menu" size={30} color={colors.White} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
                <TouchableOpacity activeOpacity={0.5}>
                    <MaterialIcons name="delete" size={30} color={colors.White} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareMessage(item.description)} activeOpacity={0.5}>
                    <FontAwesome5 name="share-alt" size={22} color={colors.White} />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={{ backgroundColor: colors.BackgroundGrey }}>
            <Header name={"Documents"} icon={
                <Ionicons name="document-text-sharp" size={24} color={colors.White} />
            } />
            <ChatHeader />
            <View style={styles.scrollView}>
                <View style={styles.docContainer}>
                    <View style={styles.docTitle}>
                        <Text style={styles.titleText}>Document</Text>
                    </View>
                    <ScrollView style={styles.descContainer}>
                        <Text style={{lineHeight: 20}}>{item.description}</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default DocInfo

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: height * 0.02,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: width * 0.04,
        marginTop: height * 0.008,
        backgroundColor: colors.White,
        marginHorizontal: width * 0.01,
        borderWidth: 1,
        borderColor: colors.LightGrey,
    },
    scrollView: {
        backgroundColor: colors.BackgroundGrey,
        height: height * 0.81,
    },
    headerContainer: {
        flexDirection: "row",
        height: height * 0.07,
        backgroundColor: colors.DarkGreen,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: width * 0.04,
        marginTop: height * 0.006,
    },
    headerText: {
        color: colors.White,
        fontSize: width * 0.05,
    },
    headerLeft: {
        width: "20%",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    headerRight: {
        flexDirection: "row",
        width: width * 0.15,
        justifyContent: "space-between",
        alignItems: "center"
    },
    docContainer: {
        backgroundColor: colors.White,
        marginHorizontal: width * 0.06,
        marginTop: height * 0.03,
        paddingHorizontal: width * 0.04,
        paddingBottom: height * 0.03,
        height: height * 0.75,
    },
    docTitle: {
        paddingTop: height * 0.02, 
        paddingBottom: height * 0.05,
    },
    titleText: {
        fontSize: width * 0.05,
        color: colors.DarkGrey,
        fontWeight: "bold"
    },
    descContainer: {
        height: height * 0.5,
        paddingBottom: height * 0.05,
        borderBottomWidth: 1,
        borderColor: colors.LightGrey
    }
})
