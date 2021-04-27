import React, { useState, useCallback, useEffect, isValidElement } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    Modal,
} from "react-native";
import colors from "../Theme/Colors"
import Fonts from "../Theme/Fonts";
// import EmptyScreen from "../../Components/UI/EmptyScreen";
// import { isDate } from "moment";

const { width, height } = Dimensions.get("window");

const ViewCart = (props) => {

    return (
        <View {...props} style={{ position: "absolute", height: height, width: width, marginBottom: 40 }}>
            <Modal
                // isVisible={isModal}
                visible={props.isModal}
                animationType="fade"
                // deviceWidth={width}
                // deviceHeight={height}
                transparent={true}
                onBackdropPress={() => setIsModal(false)}
                swipeDirection="down"
                onSwipeComplete={() => setIsModal(false)}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(49, 98, 218, 0.05)",
                    }}
                >
                    <View
                        style={{
                            width: "80%",
                            backgroundColor: "#fff",
                            position: "relative",
                            borderRadius: 3,
                            alignItems: "center",
                            padding: width * 0.04,
                        }}
                    >
                        <Text
                            style={{ fontFamily: Fonts.reg, fontSize: width * 0.04 }}
                        >
                            New Booking
                  </Text>
                        <Text
                            style={{
                                marginVertical: height * 0.02,
                                color: colors.DarkGrey,
                                fontFamily: Fonts.reg,
                                fontSize: width * 0.035,
                            }}
                        >
                            Do Want to Accept This Booking?
                  </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "90%",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => props.setModal(false)}
                                style={{
                                    flex: 1,
                                    marginHorizontal: width * 0.02,
                                    alignItems: "center",
                                    borderRadius: 3,
                                    backgroundColor: "#ccc",
                                    paddingVertical: width * 0.03,
                                    paddingHorizontal: width * 0.05,
                                }}
                            >
                                <Text style={{ color: "#fff", fontFamily: Fonts.reg }}>
                                    Reject
                      </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setModal(false);
                                }}
                                style={{
                                    flex: 1,
                                    marginHorizontal: width * 0.02,
                                    alignItems: "center",
                                    borderRadius: 3,
                                    backgroundColor: colors.DarkGreen,
                                    paddingVertical: width * 0.03,
                                    paddingHorizontal: width * 0.05,
                                }}
                            >
                                <Text style={{ color: "#fff", fontFamily: Fonts.reg }}>
                                    Accept
                      </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ViewCart;
