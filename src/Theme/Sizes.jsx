
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const P30 = height * 0.05;
const P20 = height * 0.04;
const P5 = height * 0.005;
const P24 = height * 0.035;


// Percentage Formula x - (( y / 100) * x )

const HeightPer = (Percentage) => {
    return height - (( Percentage / 100) * height )  
}
const WidthPer = (Percentage) => {
    return width - (( Percentage / 100) * width )  
}

export { width, height, HeightPer, WidthPer, P30, P5, P24,P20 }

