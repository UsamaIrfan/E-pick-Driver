import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, TextInput , Image } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import Header from "../../components/Header";
import Loader from '../../components/Loader';
import { Ionicons, MaterialIcons, FontAwesome5 } from "../../Constants"
import colors from "../../Theme/Colors";
import Fonts from '../../Theme/Fonts';
import { getAllDocumentsTypes, getAllDocuments } from "../../Store/action/Document";

const { width, height } = Dimensions.get("window");

const Documents = ({ navigation }) => {

    const [IsLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDocumentTypes()
        });

        return unsubscribe;
    }, [navigation]);

    const userLoggedIn = useSelector(state => state.Auth.Login)
    const documents = useSelector(state => state.Documents.Documents);

    const getDocumentTypes = async () => {
        setIsLoading(true)
        await dispatch(getAllDocumentsTypes())
        await dispatch(getAllDocuments(userLoggedIn.userId))
        setIsLoading(false)
    }



    const DATA = [
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores nulla, non odio tempore nemo molestiae enim eaque odit velit eligendi nobis omnis ad, ratione itaque vel accusantium corporis perferendis officia fuga? Dignissimos aliquid, provident alias sint odio quos laudantium vero excepturi ratione veritatis aspernatur quas, minima incidunt, consequuntur neque expedita tempore illo dolorem. Facere impedit dicta sint harum? Ipsam dolores blanditiis inventore? Fugiat dicta facere atque dolore quae, unde harum nam quo, aliquam alias fuga ratione accusamus. Et iure distinctio cupiditate accusamus laudantium cum debitis quam quo quibusdam quasi soluta cumque tenetur veniam dolores velit eveniet, sequi dolorum, iusto similique.",
            read: true
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores nulla, non odio tempore nemo molestiae enim eaque odit velit eligendi nobis omnis ad, ratione itaque vel accusantium corporis perferendis officia fuga? Dignissimos aliquid, provident alias sint odio quos laudantium vero excepturi ratione veritatis aspernatur quas, minima incidunt, consequuntur neque expedita tempore illo dolorem. Facere impedit dicta sint harum? Ipsam dolores blanditiis inventore? Fugiat dicta facere atque dolore quae, unde harum nam quo, aliquam alias fuga ratione accusamus. Et iure distinctio cupiditate accusamus laudantium cum debitis quam quo quibusdam quasi soluta cumque tenetur veniam dolores velit eveniet, sequi dolorum, iusto similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores nulla, non odio tempore nemo molestiae enim eaque odit velit eligendi nobis omnis ad, ratione itaque vel accusantium corporis perferendis officia fuga? Dignissimos aliquid, provident alias sint odio quos laudantium vero excepturi ratione veritatis aspernatur quas, minima incidunt, consequuntur neque expedita tempore illo dolorem. Facere impedit dicta sint harum? Ipsam dolores blanditiis inventore? Fugiat dicta facere atque dolore quae, unde harum nam quo, aliquam alias fuga ratione accusamus. Et iure distinctio cupiditate accusamus laudantium cum debitis quam quo quibusdam quasi soluta cumque tenetur veniam dolores velit eveniet, sequi dolorum, iusto similique.",
            read: true
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro. ewerwrerwerwerwererwerr asdad asd as da ",
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro.",
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro.",
        },
    ]

    const DocHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.5} style={styles.headerLeft}>
                <MaterialIcons name="menu" size={30} color={colors.White} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddDocument")}>
                    <Ionicons name="add-circle" size={30} color={colors.White} />
                </TouchableOpacity>
            </View>
        </View>
    )

    const List = ({ item }) => (
        <TouchableOpacity onPress={() => { }} activeOpacity={0.5} style={styles.listItem}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Text style={styles.inputLabel}>Name </Text>
                    <TextInput editable={false} maxLength={20} defaultValue={`${item.name}`} style={styles.docName} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Text style={styles.inputLabel}>Document Type </Text>
                    <TextInput editable={false} maxLength={20} defaultValue={`${item.documentTypeId}`} style={styles.docName} />
                </View>
            </View>
            <View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item.path}} style={styles.image} />
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View>
            <Header name={"Documents"} icon={
                <Ionicons name="document-text-sharp" size={24} color={colors.White} />
            } />
            <DocHeader />
            <ScrollView style={styles.listContainer}>
                {documents && documents.map((item, i) => (
                    <List item={item} key={i} />
                ))}
            </ScrollView>
            {IsLoading && <Loader />}
        </View>
    )
}

export default Documents

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: colors.BackgroundGrey,
        height: height * 0.9
    },
    listItem: {
        backgroundColor: colors.White,
        marginTop: height * 0.01,
        borderColor: colors.DarkGrey,
        borderWidth: 0.5,
        marginHorizontal: width * 0.01,
        flexDirection: 'row',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
        justifyContent: "space-between"
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
        justifyContent: "flex-end",
        alignItems: "center"
    },
    docName: {
        color: colors.DarkGreen,
    },
    inputLabel: {
        color: colors.DarkGreen,
        fontFamily: Fonts.bold,
    },
    image: {
        width: "100%",
        height: "100%",
        ...StyleSheet.absoluteFill,
    },
    imageContainer: {
        backgroundColor: colors.LightGrey2,
        width: width * 0.15,
        height: height * 0.08
    },
})
