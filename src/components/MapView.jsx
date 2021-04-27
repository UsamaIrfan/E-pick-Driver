import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView from "react-native-maps"
import { Marker } from 'react-native-maps';
import colors from "../Theme/Colors";
import { useSelector } from "react-redux"
import MapViewDirections from "react-native-maps-directions";


const { width, height } = Dimensions.get("window")
const aspect_ratio = width / height;
const latitudeDelta = 0.0922;
const longitudeDelta = aspect_ratio * latitudeDelta;

const MapViewComponent = ({ region, SetTripObject, NewRegion }) => {

    const tripObject = useSelector(state => state.Location.travel)
    console.log("MAP VIEW TRIP OBJECT =========>", tripObject)

    const originLong = tripObject?.from.details.geometry.location.lng
    const originLat = tripObject?.from.details.geometry.location.lat
    const destinationLong = tripObject?.to.details.geometry.location.lng
    const destinationLat = tripObject?.to.details.geometry.location.lat

    console.log("TO =========>", originLong, originLat)
    console.log("FROM =========>", destinationLong, destinationLat)

    const destination = {
        latitude: 25.0787805,
        longitude: 61.1935552,
    }

    const _map = useRef()

    if (NewRegion) {
        if (region.latitude != NewRegion.latitude ) {
            _map.current.animateToRegion(NewRegion, 2000)
        }
    }

    const MapViewFunc = () => (
        <MapView 
            style={styles.map} 
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            // showsTraffic={true}
            ref={_map}
        >
            {tripObject ?
                <React.Fragment>
                    <Marker pinColor="#000" coordinate={{ latitude: originLat, longitude: originLong }} />
                    <Marker pinColor="#000" coordinate={{ latitude: destinationLat, longitude: destinationLong }} />
                    <MapViewDirections
                        origin={{ latitude: originLat, longitude: originLong }}
                        destination={{ latitude: destinationLat, longitude: destinationLong }}
                        apikey="AIzaSyDCSylBlVpWKjftAulQ0jvQbVCslBxxtXk"
                        strokeWidth={3}
                        strokeColor={colors.DarkGreen}
                    />
                </React.Fragment> :
                <Marker pinColor="#000" coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            }
        </MapView>
    )

    return (
        <MapViewFunc />
    )
}

export default MapViewComponent

const styles = StyleSheet.create({
    map: {
        flex: 1,
        zIndex: -1,
    },
})
