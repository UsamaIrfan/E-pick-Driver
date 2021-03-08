import React from "react";
import { Text, View, StyleSheet, Dimensions, Image, Button, TouchableOpacity , StatusBar } from "react-native";
import { Button as PaperButton } from 'react-native-paper';
import { color } from "react-native-reanimated";
import colors from "../../Theme/Colors";

const { height, width } = Dimensions.get("window")

const Home = ({ navigation }) => {
  return (
    <>
      <View style={styles.imageContainer}>
      <StatusBar backgroundColor={colors.DarkGreen} />
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1541448954141-d38884697143?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHRveW90YXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/adaptive-icon.png")}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Login")} style={styles.buttonLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SignUp")} style={styles.buttonCaptain}>
            <Text style={styles.buttonCapText}>Become A Captain</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.DarkGreen,
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
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.08
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
    paddingHorizontal: 30,
  },
  buttonLogin: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    backgroundColor: colors.DarkGreen,
    height: height * 0.06,
  },
  buttonText: {
    color: colors.White,
    fontSize: 18,
    // textTransform: "none",
  },
  buttonCaptain: {
    height: height * 0.06,
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
  },
});

export default Home;
