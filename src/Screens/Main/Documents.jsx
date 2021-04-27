import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity, TextInput, Image, TouchableHighlight } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import Header from "../../components/Header";
import Loader from '../../components/Loader';
import { Ionicons, MaterialIcons, FontAwesome5 } from "../../Constants"
import colors from "../../Theme/Colors";
import Fonts from '../../Theme/Fonts';
import { getAllDocumentsTypes, getAllDocuments } from "../../Store/action/Document";
import { FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { showMessage } from 'react-native-flash-message';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get("window");

const Documents = ({ navigation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDocumentTypes()
        });

        return unsubscribe;
    }, [navigation]);


    const [IsLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const requestPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                showMessage({ message: "Permission Denied. Please provide access to storage.", type: "warning" })
                setModalVisible(false)
            } else {
                getDocument()
            }
        }
    }

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
                    let isImage = false
                    if (AllowedImageTypes.includes(docType[docType.length - 1])) {
                        isImage = true
                    }
                    const fileBase64 = await FileSystem.readAsStringAsync(response.uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    })
                        .then((response64) => {
                            setModalVisible(!modalVisible)
                            navigation.navigate("AddDocuments", {
                                name: response.name,
                                document: {
                                    name: response.name,
                                    type: docType[docType.length - 1],
                                    uri: response.uri,
                                },
                                doc64URI: `base64, ${response64}`,
                                isImage: isImage,
                            })
                        }).catch((error) => {
                            showMessage({ message: `Unable to Pick Document ${error.message}`, type: "warning" })
                        })
                    setModalVisible(false)
                }
            })
            .catch((error) => {
                console.log(error)
                showMessage({ message: `Unable To add Doc. ${error.message}`, type: "warning" })
            })
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 10, }} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle" size={30} color={colors.White} />
                </TouchableOpacity>
            )
        });
    }, [])

    const userLoggedIn = useSelector(state => state.Auth.Login)
    const documents = useSelector(state => state.Documents.Documents);

    const getDocumentTypes = async () => {
        await dispatch(getAllDocumentsTypes())
        await dispatch(getAllDocuments(userLoggedIn.userId))
    }


    const List = ({ item }) => {
        const fileTypeArr = item?.path?.split(".")
        const fileType = fileTypeArr?.length > 0 ? fileTypeArr[fileTypeArr.length - 1] : null
        const AllowedImageTypes = [
            "jpeg",
            "jpg",
            "png",
        ]

        return (<TouchableOpacity onPress={() => { navigation.navigate("DocInfo", { item: item, image: AllowedImageTypes.includes(fileType) ? true : false, fileType: fileType }) }} activeOpacity={0.5} style={styles.listItem}>
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
                    {AllowedImageTypes.includes(fileType)
                        ? <Image source={{ uri: item.path }} style={styles.image} />
                        : <Text style={{ textTransform: "uppercase", height: "100%", width: "100%", textAlignVertical: "center", textAlign: "center", fontFamily: Fonts.reg, fontSize: 20, color: colors.LightGrey }} >{fileType}</Text>
                    }
                </View>
            </View>
        </TouchableOpacity>
        )
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}
                    onRequestClose={() => {
                        setModalVisible(false)
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                onPress={requestPermission}
                                style={{ ...styles.openButton, backgroundColor: colors.DarkGreen, marginBottom: 10 }}
                            >
                                <Text style={{ ...styles.modalText, color: colors.White, fontSize: 14 }}>Pick Document</Text>
                            </TouchableOpacity>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: colors.LightGrey }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                {documents && <View style={styles.listContainer}>
                    <FlatList
                        data={documents}
                        renderItem={List}
                        ListFooterComponent={() => <View style={{ height: 10, backgroundColor: "transparent" }}></View>}
                        keyExtractor={(item, idx) => idx.toString()}
                    />
                </View>}
            </View>
            {IsLoading && <Loader />}
        </>
    )
}

export default Documents

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: colors.BackgroundGrey,
        height: height * 0.87
    },
    listItem: {
        backgroundColor: colors.White,
        marginTop: height * 0.01,
        borderRadius: 8,
        marginHorizontal: width * 0.01,
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: width * 0.02,
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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
        height: height * 0.09,
        borderRadius: 2,
        overflow: "hidden",
        marginVertical: 10,
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
