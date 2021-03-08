import { DefaultTheme } from "react-native-paper";

import colors from "./src/Theme/Colors";
import {DefaultTheme} from "react-native-paper";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    }
};

export default theme;