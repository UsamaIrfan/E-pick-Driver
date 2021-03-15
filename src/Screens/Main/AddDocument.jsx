import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import Header from "../../components/Header";
import { Ionicons, MaterialIcons, FontAwesome5 } from "../../Constants"
import colors from "../../Theme/Colors";
import Fonts from '../../Theme/Fonts';
import { useSelector } from "react-redux";
import * as DocumentPicker from 'expo-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from "react-native-simple-toast";
import {addCustomerDocument} from "../../Store/action/Document";
import Loader from '../../components/Loader';

const { width, height } = Dimensions.get("window");

const Documents = ({ navigation }) => {

    const [Document, setDocument] = useState(null)
    const [DocTypeName, setDocTypeName] = useState(null)
    const [DocType, setDocType] = useState(null)
    const [IsLoading, setIsLoading] = useState(false)

    const docTypes = useSelector(state => state.Documents.DocumentTypes);
    const userId = useSelector(state => state.Auth.Login.userId)

    // const ListItem = ({ item }) => {
    //     return (
    //         <View style={styles.list}>
    //             <View style={styles.listItem}>
    //                 <Text>{item.name}</Text>
    //                 <MaterialIcons name="delete" size={24} color={colors.White} />
    //             </View>
    //             <View>
    //                 <Text>{item.description}</Text>
    //             </View>
    //             <View>
    //                 <TouchableOpacity activeOpacity={0.8}>
    //                     <Text>Read More.</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     )
    // }

    const getDocument = async () => {
        await DocumentPicker.getDocumentAsync()
            .then((response) => {
                setDocument(response)
            })
            .catch((error) => {
                console.log(error)
                Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
            })
    }

    const submitHandler = async () => {
        if (Document?.type == "success") {
            setIsLoading(true)
            await addCustomerDocument(userId ,Document.name, DocTypeName, Document.uri, DocType)
            setIsLoading(false)
        }
    }

    const DocHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} activeOpacity={0.5} style={styles.headerLeft}>
                <MaterialIcons name="menu" size={30} color={colors.White} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{ backgroundColor: colors.BackgroundGrey }}>
            <Header name={"Add Document"} icon={
                <Ionicons name="document-text-sharp" size={24} color={colors.White} />
            } />
            <DocHeader />
            <ScrollView style={styles.listContainer}>
                {Document?.type == "success" &&
                    <View>
                        <View style={styles.labelInput}>
                            <Text style={styles.inputTitle}>Name</Text>
                            <TextInput style={styles.docDetails} defaultValue={Document.name} editable={false} onChangeText={(text) => { }} />
                        </View>
                        <View style={styles.labelInput}>
                            <Text style={styles.inputTitle}>Size</Text>
                            <TextInput style={styles.docDetails} defaultValue={Document.size.toString()} editable={false} onChangeText={(text) => { }} />
                        </View>
                        {docTypes && <DropDownPicker
                            // items={[
                            //     { label: 'UK', value: 'uk', },
                            //     { label: 'France', value: 'france', },
                            // ]}

                            items={docTypes.map((item, i) => {
                                return {
                                    label: item.name,
                                    value: item.id,
                                }
                            })}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: colors.BackgroundGrey, }}
                            placeholder="Select Document Type"
                            // itemStyle={{
                            //     justifyContent: 'flex-start'
                            // }}
                            dropDownStyle={{ backgroundColor: colors.BackgroundGrey, fontFamily: Fonts.reg }}
                            onChangeItem={item => {
                                // setDocTypeName("Someting")                                
                                setDocType(parseInt(item.value));
                                setDocTypeName(item.label)
                                console.log(item)
                            }}
                        />}
                        <View style={styles.imageContainer}>
                            <Image style={{ ...StyleSheet.absoluteFill, ...styles.docImage }} source={{ uri: Document.uri }} />
                        </View>
                    </View>
                }
                <View style={{ ...styles.labelInput, borderBottomWidth: null }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={getDocument}>
                        <Ionicons name="add-circle" size={50} color={colors.DarkGreen} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.6} onPress={submitHandler} style={{ ...styles.buttonSave }}>
                        <Text style={{ ...styles.buttonText }}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {IsLoading && <Loader />}
        </View>
    )
}

export default Documents

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: colors.BackgroundGrey,
        height: height * 0.9,
        paddingHorizontal: width * 0.06,
    },
    listItem: {
        backgroundColor: colors.White,
        marginTop: height * 0.02,
        borderColor: colors.DarkGrey,
        borderWidth: 0.5,
        marginHorizontal: width * 0.01,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.02,
        flexDirection: 'row',
        alignItems: "center"
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
    docDetails: {
        fontSize: width * 0.04,
        color: colors.DarkGrey,
        fontFamily: Fonts.reg,
        flex: 1,
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
    imageContainer: {
        height: height * 0.4,
        width: "100%",
        borderWidth: 2,
        borderColor: colors.DarkGreen,
        marginTop: 10,
    },
    docImage: {
        width: "100%",
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
