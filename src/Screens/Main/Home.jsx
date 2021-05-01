import React, { useState, useEffect, useRef } from 'react'
import { Keyboard, StyleSheet, Text, View, Alert, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import colors from "../../Theme/Colors";
import * as Location from 'expo-location';
import { useSelector, useDispatch } from "react-redux"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons, MaterialCommunityIcons, Entypo, avatar } from "../../Constants/index";
import Fonts from '../../Theme/Fonts';
import Toast from "react-native-simple-toast";
import { setTravelData } from "../../Store/action/Location";
import Loader from "../../components/Loader";
import { startConnection } from "../../Store/action/SignalR";
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar, TouchableRipple } from 'react-native-paper';

const { width, height } = Dimensions.get("window")
const aspect_ratio = width / height;

// const latitudeDelta = 0.0922;
// const longitudeDelta = aspect_ratio * latitudeDelta;

const Home = ({ navigation }) => {

    const dispatch = useDispatch()

    const [PickUpPoint, setPickUpPoint] = useState();
    const [errorMsg, setErrorMsg] = useState(null);
    const HomePlace = { description: "Home, This is my home which is near somewhere i dont know.", geometry: { location: { lat: 24.8817609, lng: 67.0648878 } } }
    const HomeCheck = { description: "Work", geometry: { location: { lat: 24.844128, lng: 66.980173 } } }
    const [IsLoading, setIsLoading] = useState(false);
    const [SetTripObject, setSetTripObject] = useState();
    const [PickConfirmed, setPickConfirmed] = useState(null);
    const [MaxZoomLevel, setMaxZoomLevel] = useState(1)
    const [RideConfirmed, setRideConfirmed] = useState();
    const [BookingConfirmed, setBookingConfirmed] = useState();
    const [latitudeDelta, setlatitudeDelta] = useState(0.0922);
    const [longitudeDelta, setlongitudeDelta] = useState(aspect_ratio * 0.0922);
    const [from, setfrom] = useState("From")
    const [To, setTo] = useState("To")
    const [Region, setRegion] = useState({
        latitude: 24.8817609,
        longitude: 67.0648878,
        latitudeDelta: 0.04,
        longitudeDelta: 2.10,
    });

    const _map = useRef()

    const tripObject = useSelector(state => state.Location.travel)

    const originLong = tripObject?.from.details.geometry.location.lng
    const originLat = tripObject?.from.details.geometry.location.lat
    const destinationLong = tripObject?.to.details.geometry.location.lng
    const destinationLat = tripObject?.to.details.geometry.location.lat

    const userLoggedIn = useSelector(state => state.Auth.Login)
    const date = new Date();

    const setTrip = (from, to) => {
        setIsLoading(true)
        dispatch(setTravelData({ from, to }))
        setPickConfirmed(true)
        console.log("TRAVEL DATA ==============>", from, to)
        setIsLoading(false)
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

            _map.current.animateToRegion(region, 2000)
            setMaxZoomLevel(20)
            console.log(Region)

        } catch (error) {
            const errorMessage = error.message.toString()
            setMaxZoomLevel(20)
            setErrorMsg(errorMessage)
            Toast.showWithGravity(errorMessage, Toast.SHORT, Toast.BOTTOM);
        }
    }

    useEffect(() => {
        load()
        // startSignalRConnection()
    }, [])

    const startSignalRConnection = async () => {
        setIsLoading(true)
        await dispatch(startConnection(userLoggedIn.userId))
        setIsLoading(false)
    }

    const GooglePlacesInput = (props) => {
        return (
            // <GooglePlacesAutocomplete
            //     placeholder={props.placeholder}
            //     minLength={2}
            //     renderLeftButton={() => {
            //         if (props.placeholder == "From") {
            //             return <Ionicons style={styles.icon} name="car-sport" size={24} color={colors.DarkGreen} />
            //         } else {
            //             return <Entypo style={styles.icon} name="location-pin" size={24} color={colors.DarkGreen} />
            //         }
            //     }
            //     }
            //     filterReverseGeocodingByTypes={["locality"]}
            //     keyboardKeyType={"search"}
            //     fetchDetails={true}

            //     onPress={(data, details = null) => {
            //         if (props.from == true) {
            //             setRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta });
            //             setfrom(data.description)
            //             _map.current.animateToRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta }, 2000)
            //             setPickUpPoint({ details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
            //         }
            //         if (props.to == true) {
            //             if (!PickUpPoint) {
            //                 Toast.showWithGravity("Please provide Pick Up location", Toast.SHORT, Toast.BOTTOM)
            //             } else {
            //                 setTo(data.description)
            //                 _map.current.animateToRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta }, 2000)
            //                 setTrip(PickUpPoint, { details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
            //                 setSetTripObject(PickUpPoint, { details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
            //             }
            //         }
            //     }}
            //     query={{
            //         key: "AIzaSyDCSylBlVpWKjftAulQ0jvQbVCslBxxtXk",
            //         // key: 'AIzaSyA57hpVEb2LvG3MSGxXSShEQKIovSZ4yZY', Max
            //         // key: "AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM", Contel
            //         language: 'en',

            //         types: "",
            //         components: "country: pk"
            //     }}
            //     enablePoweredByContainer={false}
            //     styles={{
            //         textInputContainer: {
            //             marginTop: 0,
            //             marginBottom: 0,
            //             marginLeft: 0,
            //             marginRight: 0,
            //         },
            //         container: {
            //             marginTop: 0,
            //             marginBottom: 0,
            //             marginLeft: 0,
            //             marginRight: 0,
            //         },
            //         row: {
            //             borderBottomColor: "#ccc",
            //             borderBottomWidth: .5,
            //         },
            //         description: {
            //             fontFamily: Fonts.reg,
            //         },

            //     }}
            //     GooglePlacesSearchQuery={{
            //         rankby: "distance",
            //         components: "country: us"
            //     }}
            //     GooglePlacesDetailsQuery={{
            //         fields: ["formatted_address", "geometry"]
            //     }}
            //     renderDescription={row => row.description}
            //     currentLocation={true}
            //     currentLocationLabel="Current location"
            //     nearbyPlacesAPI="GooglePlacesSearch"
            //     predefinedPlaces={[HomePlace, HomeCheck]}
            //     debounce={200}
            //     google
            // />
            <GooglePlacesAutocomplete
                placeholder={props.placeholder}
                minLength={2}
                renderLeftButton={() => {
                    if (props.from) {
                        return <Ionicons style={styles.icon} name="car-sport" size={24} color={colors.DarkGreen} />
                    } else {
                        return <Entypo style={styles.icon} name="location-pin" size={24} color={colors.DarkGreen} />
                    }
                }}
                keyboardKeyType={"search"}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    if (props.from == true) {
                        setRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta });
                        setfrom(data.description)
                        _map.current.animateToRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta }, 2000)
                        setPickUpPoint({ details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                    }
                    if (props.to == true) {
                        if (!PickUpPoint) {
                            showMessage({ message: "Please provide pick up location.", type: "info" });
                        } else {
                            setTo(data.description)
                            _map.current.animateToRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta }, 2000)
                            setTrip(PickUpPoint, { details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                            setSetTripObject(PickUpPoint, { details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                        }
                    }
                }}
                query={{
                    // Add a "M" at the end to get the API working

                    key: "AIzaSyDCSylBlVpWKjftAulQ0jvQbVCslBxxtXk",
                    // key: 'AIzaSyA57hpVEb2LvG3MSGxXSShEQKIovSZ4yZY', Max
                    // key: "AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM", Contel
                    language: 'en',
                    country: "us",
                    types: "",
                }}
                enablePoweredByContainer={false}
                styles={{
                    textInputContainer: {
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    },
                    container: {
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    },
                    row: {
                        borderBottomColor: "#ccc",
                        borderBottomWidth: .5,
                        // width: width * 0.8,
                    },
                    description: {
                        fontFamily: Fonts.reg,
                    },

                }}
                GooglePlacesSearchQuery={{
                    rankby: "distance",
                    components: "country: us",
                    location: "new York",
                    strictbounds: true,
                }}
                GooglePlacesDetailsQuery={{
                    fields: ["formatted_address", "geometry"]
                }}
                GoogleReverseGeocodingQuery={{
                    components: "country: us",
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.mapContainer}>
                        <View style={styles.searchInputContainer}>
                            <View style={{ ...styles.iconInput, zIndex: 3 }}>
                                <GooglePlacesInput placeholder={from} from={true} />
                            </View>
                            <View style={{ ...styles.iconInput, zIndex: 2 }}>
                                <GooglePlacesInput placeholder={To} to={true} />
                            </View>
                            {SetTripObject && <View style={styles.startIconContainer}>
                                <MaterialCommunityIcons style={styles.startIcon} name="directions" size={45} color={colors.DarkGrey} />
                                <Text style={styles.startText} >Start</Text>
                            </View>}
                        </View>
                        {SetTripObject && <View style={styles.bottomMapOptions}>
                            {BookingConfirmed &&
                                <>
                                    <TouchableRipple rippleColor={colors.DarkGrey} onPress={() => {
                                        setBookingConfirmed(false)
                                        setRideConfirmed(false)
                                        setPickConfirmed(false)
                                    }}>
                                        <View style={{ justifyContent: "flex-end", flexDirection: "row", justifyContent: "center", padding: 10, width: width * 0.8, borderRadius: 5,backgroundColor: colors.Red }}>
                                            <Text style={{ fontFamily: Fonts.reg, color: "#fff", fontSize: 15, }}>Cancel</Text>
                                        </View>
                                    </TouchableRipple>
                                    <View style={styles.driverDetails}>
                                        <View style={{ width: "100%" }}>
                                            <Text style={{ textAlign: "center", ...styles.buttonText, color: colors.DarkGreen, fontSize: 13, }}>Customer Details</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
                                            <View style={{ flexDirection: 'row', alignItems: "center", flex: 1, }}>
                                                <Avatar.Image source={avatar} size={55} style={{ marginRight: 10 }} />
                                                <View>
                                                    <Text style={{ ...styles.buttonText, color: colors.DarkGreen, fontSize: 13, }}>Ahmed</Text>
                                                    <Text style={{ ...styles.buttonText, color: colors.DarkGreen, fontSize: 13, }}>Karachi Central, Malir, Karachi</Text>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: "center", height: "100%", flexDirection: "row", flex: 1, justifyContent: 'flex-end', marginLeft: 10, }}>
                                                <TouchableOpacity style={{ justifyContent: 'center', width: 40, height: 40, borderRadius: 20, }}>
                                                    <Ionicons style={{ textAlign: "center" }} name="call" size={24} color={colors.DarkGreen} />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ justifyContent: 'center', width: 40, height: 40, borderRadius: 20, }}>
                                                    <Ionicons style={{ textAlign: "center" }} name="chatbubble" size={24} color={colors.DarkGreen} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </>}
                            {RideConfirmed && !BookingConfirmed && <View style={styles.driverDetails}>
                                <View style={{ width: "100%" }}>
                                    <Text style={{ textAlign: "center", ...styles.buttonText, color: colors.DarkGreen, fontSize: 13, }}>Customer Details</Text>
                                </View>
                                <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
                                    <Avatar.Image source={avatar} size={55} style={{ marginRight: 10 }} />
                                    <View>
                                        <Text style={{ ...styles.buttonText, color: colors.DarkGreen, fontSize: 13, }}>Ahmed</Text>
                                        <Text style={{ ...styles.buttonText, color: colors.DarkGreen, fontSize: 13, }}>Karachi Central, Malir, Karachi</Text>
                                    </View>
                                </View>
                            </View>}
                            {PickConfirmed &&
                                <View style={styles.pickConfirmed}>
                                    <Text style={styles.pickConfirmedText}>Normal</Text>
                                    <Text style={styles.pickConfirmedText}>Fare: Rs 2000/-</Text>
                                </View>
                            }
                            {PickConfirmed && !RideConfirmed &&
                                <>
                                    <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { !PickConfirmed ? setPickConfirmed(true) : setRideConfirmed(true) }} style={{ ...styles.buttonLogin }}>
                                        <Text style={{ ...styles.buttonText }}>Confirm Ride</Text>
                                    </TouchableRipple>
                                </>
                            }
                            {BookingConfirmed && <View style={{ flexDirection: "row", width: width * 0.8, justifyContent: "space-between", alignItems: "center" }}>
                                <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { }} style={{ ...styles.bookNowButton, flex: 1, }}>
                                    <Text style={{ ...styles.buttonText }}>Lets Go</Text>
                                </TouchableRipple>
                            </View>}
                            {/* {PickConfirmed && <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { !PickConfirmed ? setPickConfirmed(true) : setRideConfirmed(true) }} style={{ ...styles.buttonLogin }}>
                                <Text style={{ ...styles.buttonText }}>Confirm Pick Up</Text>
                            </TouchableRipple>} */}
                            {RideConfirmed && !BookingConfirmed && <View style={{ flexDirection: "row", width: width * 0.8, justifyContent: "space-between", alignItems: "center" }}>
                                <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { setBookingConfirmed(true) }} style={{ ...styles.bookNowButton, flex: .5, }}>
                                    <Text style={{ ...styles.buttonText }}>Start Ride</Text>
                                </TouchableRipple>
                                <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { setRideConfirmed(false); setBookingConfirmed(false); setPickConfirmed(false) }} style={{ ...styles.bookNowButton, flex: .45, backgroundColor: colors.Red }}>
                                    <Text style={{ ...styles.buttonText }}>Cancel</Text>
                                </TouchableRipple>
                            </View>}
                        </View>}

                        {Region &&
                            // <MapViewComponent region={Region} trip={SetTripObject} NewRegion={NewRegion}/>
                            <MapView
                                style={styles.map}
                                initialRegion={Region}
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                                showsCompass={true}
                                maxZoomLevel={MaxZoomLevel}
                                ref={_map}
                                provider={PROVIDER_GOOGLE}
                            >
                                <Marker pinColor="#000" coordinate={{ latitude: Region.latitude, longitude: Region.longitude }} />
                                {tripObject ?
                                    <React.Fragment>
                                        <Marker pinColor="#000" coordinate={{ latitude: originLat, longitude: originLong }} />
                                        <Marker pinColor="#000" coordinate={{ latitude: destinationLat, longitude: destinationLong }} />
                                        <MapViewDirections
                                            tappable={true}
                                            mode="DRIVING"
                                            origin={{ latitude: originLat, longitude: originLong }}
                                            destination={{ latitude: destinationLat, longitude: destinationLong }}
                                            apikey="AIzaSyDCSylBlVpWKjftAulQ0jvQbVCslBxxtXk"
                                            strokeWidth={3}
                                            strokeColor={colors.DarkGreen}
                                        />
                                    </React.Fragment> :
                                    <Marker pinColor="#000" coordinate={{ latitude: Region.latitude, longitude: Region.longitude }} />
                                }
                            </MapView>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {IsLoading && <Loader />}
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
    searchInput: {
        alignSelf: "flex-start",
        fontSize: width * 0.03,
        flex: 1,
    },
    searchInputContainer: {
        width: width * 0.85,
        top: height * 0.05,
        position: "absolute",
        left: width / 10,
        minHeight: height * 0.18,
        maxHeight: height * 0.8,
        zIndex: 20,
    },
    iconInput: {
        borderRadius: 5,
        overflow: "hidden",
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
        marginTop: 10,
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
    },
    buttonText: {
        color: colors.White,
        fontSize: 18,
        textTransform: "none",
        fontFamily: Fonts.reg,
    },
    buttonsContainer: {
        flex: 1,
        paddingVertical: 10,
        marginTop: height * 0.05
    },
    buttonLogin: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        marginTop: 10,
        marginBottom: height * 0.05,
        paddingVertical: height * 0.015,
        textTransform: "none",
        backgroundColor: colors.DarkGreen,
        width: width * 0.8,
        zIndex: 10,
        borderRadius: 5,
    },
    bookNowButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        marginTop: 10,
        marginBottom: height * 0.05,
        paddingVertical: height * 0.015,
        textTransform: "none",
        backgroundColor: colors.DarkGreen,
        zIndex: 10,
        borderRadius: 5,
    },
    bottomMapOptions: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        zIndex: 10,
    },
    pickConfirmed: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.White,
        padding: height * 0.015,
        width: width * 0.8,
        zIndex: 10,
        borderRadius: 5
    },
    pickConfirmedText: {
        fontFamily: Fonts.reg,
        fontSize: 14,
    },
    driverDetails: {
        width: width * 0.8,
        backgroundColor: colors.White,
        padding: height * 0.015,
        alignItems: "center",
        marginBottom: 10,
        zIndex: 10,
        borderRadius: 5,
    },
})



const DATA = {
    data: {
        description: "Malir, Pakistan",
        matched_substrings: [
            {
                length: 5,
                offset: 0,
            },
        ],
        place_id: "ChIJL6nvd1pSsz4REtEb-F5UTyA",
        reference: "ChIJL6nvd1pSsz4REtEb-F5UTyA",
        structured_formatting: {
            main_text: "Malir",
            main_text_matched_substrings: [
                {
                    length: 5,
                    offset: 0,
                },
            ],
            secondary_text: "Pakistan",
        },
        terms: [
            {
                offset: 0,
                value: "Malir",
            },
            {
                offset: 7,
                value: "Pakistan",
            },
        ],
        types: [
            "administrative_area_level_3",
            "political",
            "geocode",
        ],
    },
    details: {
        address_components: [
            {
                long_name: "Malir",
                short_name: "Malir",
                types: [
                    "administrative_area_level_3",
                    "political",
                ],
            },
            {
                long_name: "Karachi City",
                short_name: "Karachi City",
                types: [
                    "administrative_area_level_2",
                    "political",
                ],
            },
            {
                long_name: "Sindh",
                short_name: "Sindh",
                types: [
                    "administrative_area_level_1",
                    "political",
                ],
            },
            {
                long_name: "Pakistan",
                short_name: "PK",
                types: [
                    "country",
                    "political",
                ],
            },
        ],
        adr_address: "Malir, <span class=\"region\">Karachi City, Sindh</span>, <span class=\"country-name\">Pakistan</span>",
        formatted_address: "Malir, Karachi City, Sindh, Pakistan",
        geometry: {
            location: {
                lat: 25.0328543,
                lng: 67.3324602,
            },
            viewport: {
                northeast: {
                    lat: 25.64259175810007,
                    lng: 67.57987507092483,
                },
                southwest: {
                    lat: 24.75663746569487,
                    lng: 67.06877124229315,
                },
            },
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
        name: "Malir",
        place_id: "ChIJL6nvd1pSsz4REtEb-F5UTyA",
        reference: "ChIJL6nvd1pSsz4REtEb-F5UTyA",
        types: [
            "administrative_area_level_3",
            "political",
        ],
        url: "https://maps.google.com/?q=Malir,+Karachi+City,+Sindh,+Pakistan&ftid=0x3eb3525a77efa92f:0x204f545ef81bd112",
        utc_offset: 300,
    },
}