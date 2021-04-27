import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";


const Colors = {
  DarkGrey : "#515151",
  DarkGreen : "#36547D",
  BackgroundGrey : "#e6e6e6",
  LightGray3: "#D6D7D7",
  LightGrey : "#98989B",
  LightGrey2 : "#C3C3CE",
  White : "#ffffff",
  Red : "#BE171C",
  gradientArray: ['#456ba1', '#3d5f8f', '#36547D',]
}

const NavigationTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      text: Colors.White,
      primary: Colors.DarkGreen,
      background: Colors.BackgroundGrey,
      card: Colors.DarkGreen,
      Header: Colors.DarkGrey,
    },
  };
  

  const PaperTheme = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: Colors.DarkGreen,
      accent: "transparent",
      underlineColor: "transparent",
    },
  };


  export { NavigationTheme, PaperTheme }
  export default Colors