import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, TextInput, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Header from "../../components/Header";
import colors from "../../Theme/Colors";
import * as Location from 'expo-location';
import { useSelector, useDispatch } from "react-redux"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons, MaterialCommunityIcons, Entypo } from "../../Constants/index";
import Fonts from '../../Theme/Fonts';

const { width, height } = Dimensions.get("window")
const Home = () => {

    const [Region, setRegion] = useState({
        latitude: 25.1921465,
        longitude: 66.5949955,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    })
    const [location, setLocation] = useState(null);
    const [Destination, setDestination] = useState({geometry: { location: { lat: 25.1921465, long: 66.5949955 } }})
    const [errorMsg, setErrorMsg] = useState(null);
    const HomePlace = { description: "Home", geometry: { location: { lat: 25.1921465, long: 66.5949955 } } }
    const HomeCheck = { description: "Work", geometry: { location: { lat: 25.1921465, long: 66.5949955 } } }

    async function load() {
        setErrorMsg(null)
        try {
            let { status } = await Location.requestPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords


            setLocation(location)


        } catch (error) {
            const errorMessage = error.message.toString()
            setErrorMsg(errorMessage)
            Alert.alert(
                errorMessage,
                "Location Access Problem",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
        console.log("Loading..........")
    }

    useEffect(() => {
        console.log("Runnning...")
        load()
        // regionFrom(25.1921465, 66.5949955, 10)
    }, [])

    const regionFrom = (lat, lon, accuracy) => {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;

        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta: Math.max(0, latDelta),
            longitudeDelta: Math.max(0, lonDelta)
        };
    }

    const GooglePlacesInput = (props) => {
        return (
            <GooglePlacesAutocomplete
                placeholder={props.placeholder}
                minLength={2}
                keyboardKeyType={"search"}
                fetchDetails={true}

                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setDestination(data, details);
                }}
                query={{
                    key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
                    language: 'en',
                    types: "(cities)"
                }}
                enablePoweredByContainer={false}
                style={{
                    textInputContainer: {
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    }
                }}
                GooglePlacesSearchQuery={{
                    rankby: "distance",
                }}
                GooglePlacesDetailsQuery={{
                    fields: ["formatted_address", "geometry"]
                }}
                renderDescription={row => row.description}
                currentLocation={true}
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch"
                predefinedPlaces={[HomePlace, HomeCheck]}
                debounce={200}
                google
            />
        );
    };

    return (
        <React.Fragment>
            <View style={styles.mainContainer}>
                <Header name={"Pick A Ride"} />
                <View style={styles.mapContainer}>
                    <View style={styles.mapInputs}>
                        <View style={styles.searchInputContainer}>
                            <View style={{ ...styles.iconInput, zIndex: 3 }}>
                                <Ionicons style={styles.icon} name="car-sport" size={24} color={colors.DarkGreen} />
                                {/* <TextInput style={styles.searchInput} placeholder="From" /> */}
                                <GooglePlacesInput placeholder={"From"} />
                            </View>
                            <View style={{ ...styles.iconInput, top: 55, zIndex: 2 }}>
                                <Entypo style={styles.icon} name="location-pin" size={24} color={colors.DarkGreen} />
                                {/* <TextInput style={styles.searchInput} placeholder="From" /> */}
                                <GooglePlacesInput placeholder={"To"} />
                            </View>
                            <View style={styles.startIconContainer}>
                                <MaterialCommunityIcons style={styles.startIcon} name="directions" size={45} color={colors.DarkGrey} />
                                <Text style={styles.startText} >Start</Text>
                            </View>
                        </View>
                    </View>
                    <MapView style={styles.map}
                    >
                        <Marker coordinate={{latitude: Destination?.geometry.location.lat, longitude: Destination?.geometry.location.lat}} />
                    </MapView>
                </View>
            </View>
        </React.Fragment>
    )
}

export default Home

const styles = StyleSheet.create({
    mapContainer: {
        backgroundColor: colors.LightGrey2,
        flex: 1,
        position: "relative"
    },
    map: {
        flex: 1,
        zIndex: 1,
    },
    mainContainer: {
        flex: 1,
    },
    mapInputs: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        alignItems: "center",
        height: height * 0.2,
        justifyContent: "center",
        width: width,
        fontFamily: Fonts.reg,
    },
    searchInput: {
        alignSelf: "flex-start",
        fontSize: width * 0.03,
        flex: 1,
    },
    searchInputContainer: {
        width: width * 0.75,
        position: "relative",
    },
    iconInput: {
        flexDirection: "row",
        backgroundColor: colors.White,
        width: "100%",
        alignItems: "center",
        top: 0,
        marginVertical: height * 0.005,
        position: 'absolute',
    },
    icon: {
        marginHorizontal: width * 0.02,
        alignSelf: "flex-start",
        marginTop: 12,
    },
    startIconContainer: {
        position: "absolute",
        alignItems: "center",
        right: 0,
        zIndex: 4,
        right: 10,
        top: 32,
    },
    startText: {
        fontFamily: Fonts.reg,
    }
})
