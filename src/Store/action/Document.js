import { GET_ALL_DOCUMENTS, GET_ALL_DOCUMENT_TYPES } from "../actionTypes";
import Toast from "react-native-simple-toast";
import { Api } from "../server";
import axios from "axios";

export const getAllDocumentsTypes = () => {
  return async (dispatch) => {
    await axios
      .get(`${Api}/api/get-all-document-types`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.data);
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
        if (response.data.success == true) {
          dispatch({
            type: GET_ALL_DOCUMENT_TYPES,
            documentTypes: response.data.data,
          });
          // navigation.navigate("MapMain");
          // saveDataToStorage({ ...response.data, token: token });
        }
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};


export const getAllDocuments = (userId) => {
  return async (dispatch) => {
    await axios
      .get(`${Api}/api/get-customer-documents/6d7e6a77-2d11-4cb2-a209-a13c3caf4377?languageId=1`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
        if (response.data.success == true) {
          dispatch({
            type: GET_ALL_DOCUMENTS,
            documents: response.data.data,
          });
          // navigation.navigate("MapMain");
          // saveDataToStorage({ ...response.data, token: token });
        }
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
};

export const addCustomerDocument = (userId, filename, docType, uri, docTypeId) => {
    var postData = {
        userId: userId,
        name: filename,
        type: docType,
        uri: uri,
        appFileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        documentTypeId: docTypeId
    };
    return async (dispatch) => {
        await axios
          .post(`${Api}/api/add-customer-document?languageId=1`, postData, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            console.log("Response ==>" ,response.data);
            Toast.showWithGravity(response.data.message, Toast.SHORT, Toast.TOP);
          })
          .catch((error) => {
            alert("error", error.response);
          });
      };
  };