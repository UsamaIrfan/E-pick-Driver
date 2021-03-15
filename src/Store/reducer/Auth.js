import {
  LOGIN,
  AUTHENTICATE,
  LOGOUT,
  SIGNUP,
  GET_VEHICLES,
  GET_PROFILE,
  VERIFICATION_CODE,
} from "../actionTypes";

const initialState = {
  Login: {
    role: null,
    success: true,
    userId: null,
    userName: null,
  },
  Vehicles: {},
  userInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        Login: action.Login,
      };
    case AUTHENTICATE:
      return {
        ...state,
        Login: action.Login,
      };
    case LOGOUT:
      return {
        ...state,
        Login: {
          role: null,
          success: null,
          userId: null,
          userName: null,
        },
        userInfo: {},
      };
    case SIGNUP:
      return {
        ...state,
        Login: action.Login,
      };
    case VERIFICATION_CODE:
      return {
        ...state,
        userInfo: { ...state.userInfo, verificationCode: action.code },
      };
    case GET_VEHICLES:
      return {
        ...state,
        Vehicles: action.Vehicles,
      };
    case GET_PROFILE:
      return {
        ...state,
        userInfo: action.userInfo,
      };
  }
  return state;
};
