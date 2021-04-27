import * as signalR from "@microsoft/signalr";
import { Api } from "../server";
import axios from "axios";
import store from "../../Store";
import { START_CONNECTION, STOP_CONNECTION } from "../actionTypes";
import { showMessage } from "react-native-flash-message";

export const startConnection = (userId) => {
  // Starts the SignalR connection
  return async (dispatch, getState) => {
    // console.log(store.getState().Auth);
    const hubCon = store.getState().signalR.hubConnection;
    const user = store.getState().Auth.Login;
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://192.168.18.30/Websocket/ffb39c2c-4c98-4981-9c1c-c2e2a95b6838`)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    const start = async () => {
      try {
        hubConnection.on("newBookingReceived", (message) => {
          console.log("New Booking Recieved ==>", message);
        });

        await hubConnection.start();
        console.log("connected");
        dispatch({
          type: START_CONNECTION,
          hubConnection: hubConnection,
        });
        hubConnection.onclose((error) => {
        showMessage({message: "SignalR Connection Dropped", type: "warning"})
        console.assert(hubConnection.state === signalR.HubConnectionState.Disconnected);
        });
      } catch (err) {
        //console.log(err);
      }
    };

    if (hubCon === null) {
      start();
    }
  };
};

// export const startConnection = (userId) => {
//     console.log(store.getState)
//     return async (dispatch) => {
//         // const connection = await signalR.hubConnection(Api + "websocket/"+ userId)
//         // connection.logging = true;
//     }
// }
