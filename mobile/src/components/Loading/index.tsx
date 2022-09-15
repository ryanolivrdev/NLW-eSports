import { ImageBackground, ActivityIndicator, View } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

import splashImg from "../../../assets/splash.png";

export function Loading() {
  return (
    <ImageBackground
      source={splashImg}
      defaultSource={splashImg}
      style={styles.container}
    >
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY} />
      </View>
    </ImageBackground>
  );
}
