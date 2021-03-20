import React, { useState, useEffect } from 'react'
import { Keyboard, StyleSheet, Text, View, Alert, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, } from 'react-native-maps';
import Header from "../../components/Header";
import colors from "../../Theme/Colors";
import * as Location from 'expo-location';
import { useSelector, useDispatch } from "react-redux"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons, MaterialCommunityIcons, Entypo, avatar } from "../../Constants/index";
import Fonts from '../../Theme/Fonts';
import Toast from "react-native-simple-toast";
import MapViewComponent from "../../components/MapView";
import { setTravelData } from "../../Store/action/Location";
import Loader from "../../components/Loader";
import { startConnection } from "../../Store/action/SignalR";
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar, TouchableRipple } from 'react-native-paper';
import { DynamicColorIOS } from 'react-native';

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
    const [DestinationPoint, setDestinationPoint] = useState(null);
    const [PickUpPoint, setPickUpPoint] = useState(null);
    const [Destination, setDestination] = useState({ geometry: { location: { lat: 25.1921465, long: 66.5949955 } } })
    const [errorMsg, setErrorMsg] = useState(null);
    const HomePlace = { description: "Home", geometry: { location: { lat: 33.6158004, lng: 72.8059198 } } }
    const HomeCheck = { description: "Work", geometry: { location: { lat: 25.1921465, lng: 66.5949955 } } }
    const [IsLoading, setIsLoading] = useState(false);
    const [SetTripObject, setSetTripObject] = useState();
    const [VehicleType, setVehicleType] = useState();
    const [PickConfirmed, setPickConfirmed] = useState(null);
    const [RideConfirmed, setRideConfirmed] = useState();
    const [BookingConfirmed, setBookingConfirmed] = useState();

    const userLoggedIn = useSelector(state => state.Auth.Login)
    const date = new Date();

    const setTrip = (from, to) => {
        setIsLoading(true)
        dispatch(setTravelData({ from, to }))
        setIsLoading(false)
    }

    const hubConnection = useSelector(state => state.signalR.hubConnection)
    console.log(hubConnection)


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

    const startSignalRConnection = async () => {
        setIsLoading(true)
        await dispatch(startConnection(userLoggedIn.userId))
        setIsLoading(false)
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
                        // console.log("From Data ==> ", data, "From Details ==>", details);
                        // console.log("EXisting Region ==> ", Region)
                        setRegion({ latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta });

                        // console.log("Extracted Object ==> ", {latitude: details?.geometry.location.lat, longitude: details?.geometry.location.lng, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                        setPickUpPoint({ details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                    }
                    if (props.to == true) {
                        if (!PickUpPoint) {
                            Toast.showWithGravity("Please provide Pick Up location", Toast.SHORT, Toast.BOTTOM)
                        } else {
                            setTrip(PickUpPoint, { details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                            setSetTripObject(PickUpPoint, { details: details, data: data, longitudeDelta: longitudeDelta, latitudeDelta: latitudeDelta })
                        }
                    }
                }}
                query={{
                    // Add a "M" at the end to get the API working
                    key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcp',
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
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
                        {SetTripObject && <View style={styles.bottomMapOptions}>
                            {BookingConfirmed &&
                                <>
                                    <View style={{ justifyContent: "flex-end", flexDirection: "row", width: width * 0.8 }}>
                                        <TouchableOpacity onPress={() => {
                                            setBookingConfirmed(false)
                                            setRideConfirmed(false)
                                            setPickConfirmed(false)
                                        }}>
                                            <Text style={{fontFamily: Fonts.reg, color: colors.Red, fontSize: 15,}}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
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
                                                <TouchableOpacity style={{ justifyContent: 'center',width: 40, height: 40, borderRadius: 20, }}>
                                                    <Ionicons style={{textAlign: "center"}} name="call" size={24} color={colors.DarkGreen} />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ justifyContent: 'center',width: 40, height: 40, borderRadius: 20, }}>
                                                    <Ionicons style={{textAlign: "center"}} name="chatbubble" size={24} color={colors.DarkGreen} />
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
                            {!PickConfirmed && <DropDownPicker
                                items={[
                                    { label: 'Executive', value: "Executive", },
                                    { label: 'Normal', value: 'Normal', },
                                ]}

                                // items={vehicles?.map((item, i) => {
                                //     return {
                                //         label: item.text.toString(),
                                //         value: item.value,
                                //     }
                                // })}
                                placeholder={<Text style={{ fontSize: 15, color: colors.DarkGreen, fontFamily: Fonts.bold, }}>Please Select your Ride</Text>}
                                containerStyle={{ height: 40 }}
                                style={{ zIndex: 10, borderRadius: 0, backgroundColor: colors.White, width: width * 0.8, }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                    fontFamily: Fonts.reg,
                                    color: colors.DarkGreen,
                                }}
                                dropDownStyle={{ alignSelf: "flex-start", fontFamily: Fonts.reg, backgroundColor: colors.White, fontFamily: Fonts.reg, width: width * 0.8 }}
                                onChangeItem={item => {
                                    setVehicleType(item)
                                }}
                            />}
                            {PickConfirmed && <View style={styles.pickConfirmed}>
                                <Text style={styles.pickConfirmedText}>{VehicleType.label}</Text>
                                <Text style={styles.pickConfirmedText}>Fare: Rs 2000/-</Text>
                            </View>}
                            {BookingConfirmed && <View style={{ flexDirection: "row", width: width * 0.8, justifyContent: "space-between", alignItems: "center" }}>
                                <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { }} style={{ ...styles.bookNowButton, flex: 1, }}>
                                    <Text style={{ ...styles.buttonText }}>Lets Go</Text>
                                </TouchableRipple>
                            </View>}
                            {!RideConfirmed && <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { !PickConfirmed ? setPickConfirmed(true) : setRideConfirmed(true) }} style={{ ...styles.buttonLogin }}>
                                <Text style={{ ...styles.buttonText }}>Confirm Pick Up</Text>
                            </TouchableRipple>}
                            {RideConfirmed && !BookingConfirmed && <View style={{ flexDirection: "row", width: width * 0.8, justifyContent: "space-between", alignItems: "center" }}>
                                <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { setBookingConfirmed(true) }} style={{ ...styles.bookNowButton, flex: .5, }}>
                                    <Text style={{ ...styles.buttonText }}>Start Ride</Text>
                                </TouchableRipple>
                                <TouchableRipple rippleColor={colors.DarkGrey} activeOpacity={.6} onPress={() => { setRideConfirmed(false); setBookingConfirmed(false); setPickConfirmed(false) }} style={{ ...styles.bookNowButton, flex: .45, backgroundColor: colors.Red }}>
                                    <Text style={{ ...styles.buttonText }}>Cancel</Text>
                                </TouchableRipple>
                            </View>}
                        </View>}

                        {Region && <MapViewComponent region={Region} />}
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
    },
    bottomMapOptions: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    pickConfirmed: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.White,
        padding: height * 0.015,
        width: width * 0.8,
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