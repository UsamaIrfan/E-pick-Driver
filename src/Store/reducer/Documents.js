import { GET_ALL_DOCUMENTS, GET_ALL_DOCUMENT_TYPES } from "../actionTypes";

const initialState = {
  DocumentTypes: {},
  Documents: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOCUMENT_TYPES:
      return { ...state, DocumentTypes: action.documentTypes };
    case GET_ALL_DOCUMENTS:
      return {
        ...state,
        Documents: action.documents,
      };
  }
  return state;
};
