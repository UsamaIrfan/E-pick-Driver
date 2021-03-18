import React, { useState, useEffect } from 'react'
import { Modal, Alert, Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import Header from "../../components/Header";
import { Ionicons, MaterialIcons, FontAwesome5 } from "../../Constants"
import colors from "../../Theme/Colors";
import Fonts from '../../Theme/Fonts';
import { useDispatch, useSelector } from "react-redux";
import * as DocumentPicker from 'expo-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from "react-native-simple-toast";
import { addCustomerDocument } from "../../Store/action/Document";
import Loader from '../../components/Loader';
import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get("window");

const Documents = ({ navigation }) => {

    const [Document, setDocument] = useState(null)
    const [DocType, setDocType] = useState(null)
    const [IsLoading, setIsLoading] = useState(false)
    const [DocName, setDocName] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [IsImage, setIsImage] = useState(false)
    const [Doc64URI, setDoc64URI] = useState();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const dispatch = useDispatch()

    const docTypes = useSelector(state => state.Documents.DocumentTypes);
    const userId = useSelector(state => state.Auth.Login.userId)

    const convertStringToBinary = (str) => str.split("").map(l => l.charCodeAt(0).toString(2)).join(" ");

    const AllowedImageTypes = [
        "jpeg",
        "jpg",
        "png",
    ]

    const getDocument = async () => {

        await DocumentPicker.getDocumentAsync()
            .then(async (response) => {
                if (response.type == "success") {
                    console.log(response)
                    const docType = response.name.split(".")
                    const fileBase64 = await FileSystem.readAsStringAsync(response.uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    })
                        .then((response64) => {
                            setDocument({
                                name: response.name,
                                type: docType[docType.length - 1],
                                uri: response.uri,
                            })
                            setDoc64URI(`base64, ${response64}`)
                            setDocName(response.name)
                        }).catch((error) => {
                            Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
                        })
                    setModalVisible(false)
                    if (AllowedImageTypes.includes(docType[docType.length - 1])) {
                        setIsImage(true)
                    } else {
                        setIsImage(false)
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
            })

    }

    const submitHandler = async () => {
        if (!Document?.cancelled && DocName != "" && DocType && Doc64URI) {
            const binaryURI = convertStringToBinary(Document.uri)
            setIsLoading(true)
            // console.log(binaryURI)
            // console.log(`base64,${base64.encode(binaryURI)}`)
            console.log(userId, DocName, Document.type, Doc64URI, DocType)
            await dispatch(addCustomerDocument(userId, DocName, Document.type, Doc64URI, DocType))
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={getDocument}
                            style={{ ...styles.openButton, backgroundColor: colors.LightGrey2, marginBottom: 10 }}
                        >
                            <Text style={{ ...styles.modalText, color: colors.White, fontSize: 14 }}>Pick Document</Text>
                        </TouchableOpacity>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: colors.DarkGreen }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Header name={"Add Document"} icon={
                <Ionicons name="document-text-sharp" size={24} color={colors.White} />
            } />
            <DocHeader />
            <ScrollView style={styles.listContainer}>
                {console.log("Doc==>", Document)}
                {Document &&
                    <View>
                        <View style={styles.labelInput}>
                            <Text style={styles.inputTitle}>Name</Text>
                            <TextInput style={styles.docDetails} defaultValue={DocName} editable={false} onChangeText={() => { }} />
                        </View>
                        <View style={styles.labelInput}>
                            <Text style={styles.inputTitle}>File Type</Text>
                            <TextInput style={styles.docDetails} defaultValue={Document?.type} editable={false} onChangeText={(text) => { }} />
                        </View>
                        {Document.height && <View style={styles.labelInput}>
                            <Text style={styles.inputTitle}>Size</Text>
                            <TextInput style={styles.docDetails} defaultValue={`${Document?.height.toString()} x ${Document?.width.toString()}`} editable={false} onChangeText={(text) => { }} />
                        </View>}
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
                                // setDocTypeName(item.label)
                                // console.log(item)
                            }}
                        />}
                        {IsImage && <View style={styles.imageContainer}>
                            <Image style={{ ...StyleSheet.absoluteFill, ...styles.docImage }} source={{ uri: Document?.uri }} />
                        </View>}
                    </View>
                }
                <View style={{ ...styles.labelInput, borderBottomWidth: null }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
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
        height: height * 0.3,
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
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
    },
    modalView: {
        backgroundColor: colors.White,
        borderRadius: 0,
        padding: 35,
        width: width,
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontFamily: Fonts.reg,
    },
})
