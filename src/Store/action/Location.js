import { GET_LOCATION, SET_TRAVEL_LOCATION } from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Api } from "../server";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { ActionSheetIOS } from "react-native";

export const setTravelData = (travel) => {
  return async (dispatch) => {
    console.log("TRAVEL (Reducer) ==>", travel);
    dispatch({
      type: SET_TRAVEL_LOCATION,
      travel: travel,
    });
  };
};

export const addBooking = (customerId, bookingTime, pickupLocation, pickupLocationLong, pickupLocationLat, destination, destinationLong, destinationLat) => {
  var postData = {
    customerId: customerId,
    bookingTime: "2021-03-17T07:40:20.506Z",
    pickupLocation: pickupLocation,
    pickupLocationLong: pickupLocationLong,
    pickupLocationLat: pickupLocationLat,
    destination: destination,
    destinationLong: destinationLong,
    destinationLat: destinationLat,
    rideNow: true,
  };

  return async (dispatch) => {
    await axios
      .post(`${Api}/api/add-booking?languageId=1`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};
