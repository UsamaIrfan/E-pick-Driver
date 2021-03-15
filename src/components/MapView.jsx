import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from "react-native-maps"
import { Marker } from 'react-native-maps';
import colors from "../Theme/Colors";

const MapViewComponent = ({ region }) => {
    return (
        <MapView style={styles.map} region={region}
        >
            <Marker pinColor="#000" coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
    )
}

export default MapViewComponent

const styles = StyleSheet.create({
    map: {
        flex: 1,
        zIndex: -1,
    },
})
