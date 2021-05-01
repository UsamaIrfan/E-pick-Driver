import { GET_ALL_DOCUMENTS, GET_ALL_DOCUMENT_TYPES } from "../actionTypes";
import { Api } from "../server";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

export const getAllDocumentsTypes = () => {
  return async (dispatch) => {
    await axios
      .get(`${Api}/api/get-all-document-types`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.data);
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
        console.log("DOCUMENTS API ERROR", error.message)
      });
  };
};


export const getAllDocuments = (userId) => {
  return async (dispatch, getState) => {
    const Id = getState().Auth.userId
    console.log(userId)
    await axios
      .get(`${Api}/api/get-customer-documents/${userId}?languageId=1`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
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
        console.log("GET ALL DOCS ERROR ", error.message)
        // alert("error", error.response);
      });
  };
};

export const addCustomerDocument = (userId, filename, docType, uri, docTypeId, navigation) => {
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
        if (response.data.success == true) {
          showMessage({message: "Document Uploaded.", type: "success", icon: {icon: "auto", position: "left"}})
          navigation.goBack()
        } else {
          showMessage({message: response.data.message, type: "warning", icon: {icon: "auto", position: "left"}})
        }
      })
      .catch((error) => {
        console.log("DOCUMENTS API ERROR", error.message)
      });
  };
};