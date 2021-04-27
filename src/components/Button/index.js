import React, { useRef, useEffect, useState } from "react";
import { Alert, Animated, Button, TouchableOpacity, View, Modal, Text, } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";

const PanicButton = (props) => {
  const dispatcher = useDispatch();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);
  // const panic = useSelector((state) => state.Panic.PanicState);
  const [panic, setpanic] = useState(false)
  let buttonTimeout = null;

  const checkPanicStatus = () => {
    setModalVisible(!modalVisible);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(async ({ finished }) => {
      if(buttonTimeout != null) {
        clearTimeout(buttonTimeout);
      }
      if (panic) {
        buttonTimeout = setTimeout(() => {
          fadeOut();
        }, 200);
      } else {
        return null;
      }
    });
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start((obj) => {
      if(buttonTimeout != null) {
        clearTimeout(buttonTimeout);
      }
      buttonTimeout = setTimeout(() => {
        fadeIn();
      }, 200);
    });
  };

  return (
    <>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalTitileView}>
            <Text style={styles.titleTxt}>SOS!</Text>
            <FontAwesome
              name="close"
              size={24}
              color={COLORS.white}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <View style={styles.modalVeiw}>
            <View>
              <Text style={{ fontSize: 15 }}>
                Are you sure you want to initiate an SOS mode?
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                paddingTop: 20,
              }}
            >
              <View>
                <Button
                  color={COLORS.primary}
                  title={"Yes"}
                  onPress={() => checkPanicStatus()}
                />
              </View>
              <View style={{ marginLeft: 5 }}>
                <Button
                  color={COLORS.red}
                  title={"No"}
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal> */}
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          fadeIn()
          setpanic(!panic)
        }}
      >
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              backgroundColor: !panic ?"#be171c" :fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [ "#ff0000","#be171c"],
              }),
              borderRadius: 20,
            },
          ]}
        >
          <Animated.View
            style={[
              {
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
              },
              {
                backgroundColor: !panic ?"#a00a0d" : fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["#e60000", "#a00a0d"],
                }),
                borderRadius: 20,
              },
            ]}
          >
            <Animated.View
              style={[
                { height: 20, width: 20, alignItems:'center', justifyContent:'center' },
                {
                  backgroundColor: !panic ?"#870405" : fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [ "#cc0000","#870405"],
                  }),
                  borderRadius: 20,
                },
              ]}
            >

            </Animated.View>
          </Animated.View>

          <Animated.Text
            style={[
              styles.fadingText,
              {
                color:  !panic ?"rgb(255, 255, 255)" : fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["rgb(179, 179, 179)","rgb(255, 255, 255)"],
                }),
              },
            ]}
          >
            SOS
        </Animated.Text>
        {/* <Text style={styles.fadingText} >SOS</Text> */}
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

export default PanicButton;