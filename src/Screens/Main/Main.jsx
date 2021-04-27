import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomTabNavigator from "../../Navigation/BottomTabNavigator"; 
import DrawerNavigation from "../../Navigation/DrawerNavigator";
import BookingModal from "../../components/BookingModal";
const Main = () => {
    const [BookModal, setBookModal] = useState(false);
    return (
        <>
        <DrawerNavigation />
        <BookingModal isModal={BookModal} setModal={setBookModal} />
        </>
    )
}

export default Main

const styles = StyleSheet.create({})
