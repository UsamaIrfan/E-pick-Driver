import { GET_LOCATION , SET_TRAVEL_LOCATION } from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Api } from "../server";
import axios from "axios";
import { ActionSheetIOS } from "react-native";

export const setTravelData = (travel) => {
    return async (dispatch) => {
        console.log("TRAVEL (Reducer) ==>" ,travel)
        dispatch({
            type: SET_TRAVEL_LOCATION,
            travel: travel,
        })
    };
  };