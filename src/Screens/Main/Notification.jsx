import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from "../../Constants"
import colors from "../../Theme/Colors";
import Collapsible from "../../components/Collapsible";

const { width, height } = Dimensions.get("window");

const Notification = () => {

    const DATA = [
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro.",
            read: true
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro.",
            read: true
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro. ewerwrerwerwerwererwerr asdad asd as da ",
            read: true
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro.",
            read: false
        },
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro.",
            read: false
        },
    ]

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

    return (
        <View>
            <ScrollView style={styles.listContainer}>
                {DATA.map((item, i) => (
                    <Collapsible item={item} key={i} />
                ))}
            </ScrollView>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: colors.BackgroundGrey,
        height: height * 0.81
    },
    listItem: {
        flexDirection: "row",
    },
    list: {
        paddingHorizontal: width * 0.02,
        backgroundColor: colors.White,

    }
})
