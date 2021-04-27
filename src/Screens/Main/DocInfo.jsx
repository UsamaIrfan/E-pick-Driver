import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Share, TextInput } from 'react-native'
import Header from "../../components/Header";
import colors from "../../Theme/Colors";
import { Ionicons, MaterialIcons, Entypo, FontAwesome5 } from "../../Constants"
import Fonts from '../../Theme/Fonts';

const { height, width } = Dimensions.get("window")

const DocInfo = ({ route, navigation }) => {

    const { item, image, fileType } = route.params;

    console.log("DOC INFO =========>", item.path)

    const PdfReader = ({ url: uri }) => <WebView style={{ flex: 1 }} source={{ uri }} />

    const shareMessage = (path, title,) => {
        // //Here is the Share API
        Share.share({
            title: title,
            message: path.toString(),
            url: path,
        })
            //after successful share return result
            .then((result) => console.log(result))
            //If any thing goes wrong it comes here
            .catch((errorMsg) => console.log(errorMsg));
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{...styles.headerRight, marginRight: 10,}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <MaterialIcons name="delete" size={30} color={colors.White} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shareMessage(item.path, item.name)} activeOpacity={0.5}>
                        <FontAwesome5 name="share-alt" size={22} color={colors.White} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [])

    const DocHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.5} style={styles.headerLeft}>
                <MaterialIcons name="menu" size={30} color={colors.White} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
                <TouchableOpacity activeOpacity={0.5}>
                    <MaterialIcons name="delete" size={30} color={colors.White} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareMessage(item.path, item.name)} activeOpacity={0.5}>
                    <FontAwesome5 name="share-alt" size={22} color={colors.White} />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={{ backgroundColor: colors.BackgroundGrey }}>
            <View style={styles.scrollView}>
                <View>
                    <View style={styles.labelInput}>
                        <Text style={styles.inputTitle}>Name</Text>
                        <Text style={styles.docDetails} numberOfLines={1} >{item.name}</Text>
                    </View>
                    <View style={styles.labelInput}>
                        <Text style={styles.inputTitle}>File Type</Text>
                        <Text style={styles.docDetails}>{item.documentTypeId}</Text>
                    </View>
                    {image ? <View style={styles.imageContainer}>
                        <Image style={{ ...StyleSheet.absoluteFill, ...styles.docImage }} source={{ uri: item.path }} />
                    </View> :
                        <View style={styles.imageContainer}>
                            <Text style={{ fontSize: 45, backgroundColor: colors.LightGrey2, textTransform: "uppercase", color: colors.DarkGrey, flex: 1, textAlignVertical: "center", textAlign: "center" }}>{fileType}</Text>
                        </View>
                    }
                    {/* <View style={styles.imageContainer}>
                        <Image style={{ ...StyleSheet.absoluteFill, ...styles.docImage }} source={{ uri: item.path }} />
                    </View> */}
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
        height: height * 0.9,
        paddingHorizontal: width * 0.04,
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
        fontFamily: Fonts.reg,
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
        fontWeight: "bold",
        fontFamily: Fonts.bold
    },
    descContainer: {
        height: height * 0.5,
        paddingBottom: height * 0.05,
        borderBottomWidth: 1,
        borderColor: colors.LightGrey
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
        marginVertical: height * 0.03,
    },
    docDetails: {
        fontSize: width * 0.04,
        color: colors.DarkGrey,
        fontFamily: Fonts.reg,
        flex: 1,
    },
    imageContainer: {
        height: height * 0.5,
        width: "100%",
        borderWidth: 2,
        borderColor: colors.DarkGreen,
        marginTop: 10,
    },
    docImage: {
        width: "100%",
        ...StyleSheet.absoluteFill,
    },
})
