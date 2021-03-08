import { connect } from 'react-redux';
import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
// import {set_data} from './src/Store/action';
import colors from "./src/Theme/Colors";
import { Button as PaperButton } from 'react-native-paper';
import Navigator from "./src/Navigation/StackNavigator";
import { Provider } from "react-redux";
import store from "./src/Store";

const { height, width } = Dimensions.get("window")

function App() {
  return (
    <Provider store={store}>
      <Navigator /> 
    </Provider>
  );
}

// const mapStateToProps = (state) => ({
//   name: "Usama Irfan",
//   users: state.root.users
// })

// const mapDispatchToProps = (dispatch) => ({
//   set_data: () => {dispatch(set_data())}
// })

const styles = StyleSheet.create({
  imageContainer: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.DarkGreen    
  },
  container: {
    // backgroundColor: colors.DarkGreen,
    height: height,
    width: width,
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFill,
    opacity: 0.8,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogin: {
    width: width / 1.5,
    height: 50,
    backgroundColor: colors.DarkGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.White,
    fontSize: 18,
    textTransform: "none",
  },
  buttonCaptain: {
    width: width / 1.5,
    height: 50,
    backgroundColor: "transparent",
    borderColor: colors.DarkGreen,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 0,
  },
  buttonCapText: {
    color: colors.White,
    fontSize: 18,
  }
})

export default App;