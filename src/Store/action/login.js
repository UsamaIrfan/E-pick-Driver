import {
  LOGIN,
  LOGOUT,
  AUTHENTICATE,
  SIGNUP,
  GET_VEHICLES,
  GET_PROFILE,
  VERIFICATION_CODE,
  UPDATE_DRIVER_PROFILE,
} from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { Api } from "../server";
import axios from "axios";

// Demo Token Creation
const token = "1234567890";

export const LoginUser = (email, password, Token, navigation) => {
  var postData = { email: email, password: password };

  return async (dispatch) => {
    await axios
      .post(`${Api}/api/driver-login?languageId=1`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
        if (response.data.success == true) {
          dispatch({
            type: LOGIN,
            Login: response.data,
          });
          navigation.navigate("MapMain");
          saveDataToStorage({ ...response.data, token: Token });
        }
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const LogoutFunc = (userId, navigation) => {
  return async (dispatch) => {
    axios
      .post(
        `${Api}/api/driver-logout/${userId}?languageId=1`,
        {},
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((res) => {
        dispatch({ type: LOGOUT });
        AsyncStorage.removeItem("userData");
        navigation.navigate("Login");
        Toast.showWithGravity("Logged Out", Toast.SHORT, Toast.BOTTOM);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const SignUpUser = (
  email,
  password,
  firstName,
  lastName,
  phone,
  vehicleId,
  navigation
) => {
  var postData = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phone,
    vehicleId: vehicleId,
  };

  return async (dispatch) => {
    await axios
      .post(`${Api}/api/register-driver?languageId=1`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.BOTTOM);
        if (response.data.success == true) {
          dispatch({
            type: SIGNUP,
            Login: response.data,
          });
          navigation.navigate("Login");
        } else {
          // Toast.showWithGravity("Sign Up failed", Toast.SHORT, Toast.TOP);
        }
        // navigation.navigate("MapMain");
      })
      .catch((error) => {
        Toast.showWithGravity("Login failed", Toast.SHORT, Toast.TOP);
        alert("error", error.response);
      });
  };
};

export const updateProfile = (
  userId,
  first,
  last,
  middle,
  address,
  phone,
  insuranceNumber,
  postalCode,
  insuranceCompany,
  insuranceExpiry,
  license,
  licenseExpiry,
  city,
  province,
  navigation,
) => {
  var postData = {};
  return async (dispatch) => {
    console.log(`${Api}/api/update-driver-profile?languageId=1&FirstName=${first}&MiddleName=${middle}&LastName=${last}&PhoneNumber=${phone}&Address=${address}&City=${city}&Province=${province}&userId=${userId}&PostalCode=${postalCode}&DriversLicenseNumber=${license}&DriversLicenseExpiryDate=${licenseExpiry}&InsuranceCompany=${insuranceCompany}&InsuranceNumber=${insuranceNumber}&InsuranceExpiryDate=${insuranceExpiry}&VehicleId=1`)
    await axios
      .post(
        `${Api}/api/update-driver-profile?languageId=1&FirstName=${first}&MiddleName=${middle}&LastName=${last}&PhoneNumber=${phone}&Address=${address}&City=${city}&Province=${province}&userId=${userId}&PostalCode=${postalCode}&DriversLicenseNumber=${license}&DriversLicenseExpiryDate=${licenseExpiry}&InsuranceCompany=${insuranceCompany}&InsuranceNumber=${insuranceNumber}&InsuranceExpiryDate=${insuranceExpiry}&VehicleId=1`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
        if (response.data.success == true) {
          navigation.navigate("Login");
          AsyncStorage.removeItem("userData");
        }
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const getVehicles = () => {
  return async (dispatch) => {
    await axios
      .get(`${Api}/api/get-all-vehicles?pageSize=2147483647`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.data);
        dispatch({
          type: GET_VEHICLES,
          Vehicles: response.data.data,
        });
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const getUserInfo = (userId) => {
  return async (dispatch) => {
    await axios
      .get(`${Api}/api/get-driver-profile/${userId}?languageId=1`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: GET_PROFILE,
          userInfo: response.data,
        });
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const Authenticate = (resData) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      Login: resData,
    });
  };
};

export const changePassword = (userId, oldPassword, newPassword) => {
  var postData = {
    userId: userId,
    oldPassword: oldPassword,
    newPassword: newPassword,
  };

  return async (dispatch) => {
    await axios
      .post(`${Api}/api/change-password?languageId=1`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
        if (response.data.success == true) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const updateAvatar = (userId, name, type, uri) => {
  var postData = {
    userId: userId,
    name: name,
    type: type,
    uri: uri,
    appFileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    documentTypeId: 0,
  };

  return async (dispatch) => {
    await axios
      .post(`${Api}/api/add-user-avatar?languageId=1`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
        if (response.data.success == true) {
          console.log("success");
          navigation.navigate("MapMain");
        }
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const getForgetCode = (emailOrPhone, navigation) => {
  var postData = { emailOrPhone: emailOrPhone };

  return async (dispatch) => {
    await axios
      .post(`${Api}/api/get-forget-password-code?languageId=1`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          dispatch({
            type: VERIFICATION_CODE,
            code: response.data.verificationCode,
          });
          Toast.showWithGravity("Email Sent", Toast.SHORT, Toast.TOP);
          navigation.navigate("EnterForgetCode");
        }
        // navigation.navigate("MapMain");
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const forgetPasword = (emailOrPhone, newPassword, navigation) => {
  var postData = { emailOrPhone: emailOrPhone, newPassword: newPassword };

  return async (dispatch) => {
    await axios
      .post(`${Api}/api/forget-password?languageId=1`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
        if (response.data.success == true) {
          navigation.navigate("Login");
        }
        // navigation.navigate("MapMain");
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

const saveDataToStorage = async (userData) => {
  await AsyncStorage.setItem("userData", JSON.stringify(userData));
};
