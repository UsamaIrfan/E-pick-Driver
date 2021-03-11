import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import Header from "../../components/Header";
import { Ionicons , MaterialCommunityIcons } from "../../Constants"
import colors from "../../Theme/Colors";

const { width, height } = Dimensions.get("window");

const Notification = ({ navigation }) => {

    const DATA = [
        {
            name: "Lorem, ipsum.",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, porro. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores nulla, non odio tempore nemo molestiae enim eaque odit velit eligendi nobis omnis ad, ratione itaque vel accusantium corporis perferendis officia fuga? Dignissimos aliquid, provident alias sint odio quos laudantium vero excepturi ratione veritatis aspernatur quas, minima incidunt, consequuntur neque expedita tempore illo dolorem. Facere impedit dicta sint harum? Ipsam dolores blanditiis inventore? Fugiat dicta facere atque dolore quae, unde harum nam quo, aliquam alias fuga ratione accusamus. Et iure distinctio cupiditate accusamus laudantium cum debitis quam quo quibusdam quasi soluta cumque tenetur veniam dolores velit eveniet, sequi dolorum, iusto similique.",
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
            <Header name={"Reports"} icon={
                <MaterialCommunityIcons name="file-alert" size={24} color={colors.White} />
            } />
            <ScrollView style={styles.listContainer}>
                {DATA.map((item, i) => (
                    <TouchableOpacity onPress={() => navigation.navigate("DocInfo", { item })} activeOpacity={0.5} key={i} style={styles.listItem}>
                        <Ionicons style={{ marginRight: width * 0.02, }} name="document-text-sharp" size={40} color={colors.LightGrey} />
                        <Text style={{ fontSize: width * 0.04, fontFamily: Fonts.reg }}>{item.name}</Text>
                    </TouchableOpacity>
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
        backgroundColor: colors.White,
        marginTop: height * 0.02,
        borderColor: colors.DarkGrey,
        borderWidth: 0.5,
        marginHorizontal: width * 0.01,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.02,
        flexDirection: 'row',
        alignItems: "center"
    }
})
