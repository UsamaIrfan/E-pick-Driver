import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from "react-native-maps"
import { Marker } from 'react-native-maps';
import colors from "../Theme/Colors";
import MapViewDirections from "react-native-maps-directions";

const MapViewComponent = ({ region }) => {


    const destination = {
        latitude: 25.0787805,
        longitude: 61.1935552,
    }

    return (
        <MapView style={styles.map} region={region}
        >
            <Marker pinColor="#000" coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            {/* <MapViewDirections
                origin={{ latitude: region.latitude, longitude: region.longitude }}
                destination={destination}
                apikey="AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM"
                strokeWidth={3}
                strokeColor={colors.DarkGreen}
            /> */}
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
