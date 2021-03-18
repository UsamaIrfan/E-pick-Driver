import { GET_DRIVER_BOOKINGS, GET_LOCATION, SET_TRAVEL_LOCATION } from "../actionTypes";

const initialState = {
  location: {},
  travel: {},
  bookings: [{
    driverName: null,
    clientName: "",
    vehicleName: "",
    bookingTime: "",
    pickupLocation: "",
    destination: "",
    status: "Pending"
  },]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return { ...state, location: action.location };
    case SET_TRAVEL_LOCATION:
      return {
        ...state, 
        travel: action.travel,
      }
      case GET_DRIVER_BOOKINGS: 
      return {
        ...state,
        bookings: action.bookings,
      }
  }
  return state;
};
