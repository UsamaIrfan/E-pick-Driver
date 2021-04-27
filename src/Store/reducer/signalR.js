import { START_CONNECTION, STOP_CONNECTION } from "../actionTypes";
const initialState = {
  hubConnection: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_CONNECTION:
      return {
        ...state,
        hubConnection: action.hubConnection,
      };
    case STOP_CONNECTION:
      return {
        ...state,
        hubConnection: action.hubConnection,
      };
  }
  return state;
};
