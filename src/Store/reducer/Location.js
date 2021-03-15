import { GET_LOCATION, SET_TRAVEL_LOCATION } from "../actionTypes";

const initialState = {
  location: {},
  travel: {},
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
  }
  return state;
};
