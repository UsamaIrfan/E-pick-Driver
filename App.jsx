import { connect } from 'react-redux';
import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import colors from "./src/Theme/Colors";
import Navigator from "./src/NewNavigation/StackNavigator";
import { Provider } from "react-redux";
import store from "./src/Store";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import FlashMessage from "react-native-flash-message";
import { StatusBar } from 'react-native';

const { height, width } = Dimensions.get("window")

function App() {
  let [fontsLoaded] = useFonts({
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Italic": require("./assets/fonts/Lato-Italic.ttf"),
    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-BoldItalic": require("./assets/fonts/Lato-BoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={colors.DarkGreen} dark={true} />
        <Navigator />
        <FlashMessage />
      </Provider>
    );
  }
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