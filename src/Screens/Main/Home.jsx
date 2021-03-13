import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, TextInput, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, } from 'react-native-maps';
import Header from "../../components/Header";
import colors from "../../Theme/Colors";
import * as Location from 'expo-location';
import { useSelector, useDispatch } from "react-redux"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons, MaterialCommunityIcons, Entypo } from "../../Constants/index";
import Fonts from '../../Theme/Fonts';
import Toast from "react-native-simple-toast";
import MapViewComponent from "../../components/MapView";
import { setTravelData } from "../../Store/action/Location";

const { width, height } = Dimensions.get("window")
const aspect_ratio = width / height;

const latitudeDelta = 0.0922;
const longitudeDelta = aspect_ratio * latitudeDelta;

const Home = ({ navigation }) => {

    const dispatch = useDispatch()

    const [Region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [DestinationPoint, setDestinationPoint] = useState(null)
    const [PickUpPoint, setPickUpPoint] = useState(null)
    const [location, setLocation] = useState(null);
    const [Destination, setDestination] = useState({ geometry: { location: { lat: 25.1921465, long: 66.5949955 } } })
    const [errorMsg, setErrorMsg] = useState(null);
    const HomePlace = { description: "Home", geometry: { location: { lat: 33.6158004, lng: 72.8059198 } } }
    const HomeCheck = { description: "Work", geometry: { location: { lat: 25.1921465, lng: 66.5949955 } } }

    const setTrip = (from, To) => {
        if (from && To) {
            dispatch(setTravelData({
                pickUp: from,
                destination: To,
            }))
        } else {
            Toast.showWithGravity(`Please enter Destination/Pickup locations.`, Toast.SHORT, Toast.BOTTOM)
        }
    }

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

            const region = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            }

            setRegion(region)
            console.log(Region)

            Toast.showWithGravity(`${latitude} ${longitude}`, Toast.SHORT, Toast.BOTTOM);



        } catch (error) {
            const errorMessage = error.message.toString()
            setErrorMsg(errorMessage)
            // Alert.alert(
            //     errorMessage,
            //     "Location Access Problem",
            //     [
            //         { text: "OK", onPress: () => console.log("OK Pressed") }
            //     ],
            //     { cancelable: false }
            // );
            Toast.showWithGravity(errorMessage, Toast.SHORT, Toast.BOTTOM);
        }
    }

    useEffect(() => {
        load()
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
                    if (props.from == true) {
                        console.log("From Data ==> ", data, "From Details ==>", details);
                        // console.log("EXisting Region ==> ", Region)
                        setRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta });
                        // console.log("Extracted Object ==> ", {latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                        setPickUpPoint({ data: data, details: details })
                    }
                    if (props.to == true) {
                        setDestinationPoint({ data: data, details: details });
                        // console.log("To Data ==> ",data, "To Details ==>",details);
                        setTrip(PickUpPoint, DestinationPoint)
                    }
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
                    },
                    zIndex: 100
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
                    <View style={styles.searchInputContainer}>
                        <View style={{ ...styles.iconInput, zIndex: 3 }}>
                            <Ionicons style={styles.icon} name="car-sport" size={24} color={colors.DarkGreen} />
                            {/* <TextInput style={styles.searchInput} placeholder="From" /> */}
                            <GooglePlacesInput placeholder={"From"} from={true} />
                        </View>
                        <View style={{ ...styles.iconInput, zIndex: 2 }}>
                            <Entypo style={styles.icon} name="location-pin" size={24} color={colors.DarkGreen} />
                            {/* <TextInput style={styles.searchInput} placeholder="From" /> */}
                            <GooglePlacesInput placeholder={"To"} to={true} />
                        </View>
                        <View style={styles.startIconContainer}>
                            <MaterialCommunityIcons style={styles.startIcon} name="directions" size={45} color={colors.DarkGrey} />
                            <Text style={styles.startText} >Start</Text>
                        </View>
                    </View>
                    {Region && <MapViewComponent region={Region} />}
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
    // mapInputs: {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     zIndex: 2,
    //     height: height,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: width,
    //     fontFamily: Fonts.reg,
    // },
    searchInput: {
        alignSelf: "flex-start",
        fontSize: width * 0.03,
        flex: 1,
    },
    searchInputContainer: {
        width: width * 0.8,
        top: height * 0.05,
        position: "absolute",
        left: width / 10,
        minHeight: height * 0.18,
        maxHeight: height * 0.8,
    },
    iconInput: {
        flexDirection: "row",
        backgroundColor: colors.White,
        width: "100%",
        alignItems: "center",
        zIndex: 1000,
        marginVertical: height * 0.005,
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
