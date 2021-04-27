import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height:40,
    width:40,
    borderRadius:20    
  },
  fadingText: {
    fontSize: width* 0.035,
    textAlign: 'center',
    fontFamily:Fonts.bold,
    color:colors.White,
    position:'absolute'
  },
  buttonRow: {
    flexDirection: 'row',
  },
  btn: {
    position: 'absolute',
    backgroundColor: 'green',
  },
  modal: {
    flex: 1,
    backgroundColor: colors.DarkGray,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitileView: {
    width: '90%',
    backgroundColor: colors.DarkGreen,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    borderTopLeftRadius:3,
    borderTopRightRadius:3
  },
  titleTxt: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: colors.White,
  },
  modalVeiw: {
    width: '90%',
    backgroundColor: "#fff",
    padding:15,
    borderBottomLeftRadius:3,
    borderBottomRightRadius:3
  },
  iconView: {
    alignItems: "center",
    justifyContent: "center",
  },
  txt:{
    fontSize:width* 0.028,
    fontFamily:Fonts.reg
  }
});

export default styles;
