import { GET_LOCATION, SET_TRAVEL_LOCATION , GET_DRIVER_BOOKINGS } from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Api } from "../server";
import axios from "axios";
import {showMessage} from "react-native-flash-message";

export const setTravelData = (travel) => {
  return async (dispatch) => {
    // console.log("TRAVEL (Reducer) ==>", travel);
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
        showMessage({ message: "Booking Inserted.", type: "success" })
      })
      .catch((error) => {
        showMessage({ message: "Unable to Insert booking..", type: "info" })
        alert("error", error.response);
      });
  };
};


export const getDriverBookings = (userId) => {
  return async (dispatch) => {
    console.log(userId)
    await axios
      .get(
        `${Api}/api/get-driver-bookings/${userId}?languageId=1?bookingStatus=0`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data.bookings);
        if (response.data.success == true) {
          dispatch({
            type: GET_DRIVER_BOOKINGS,
            bookings: response.data.bookings,
          });
        }
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

