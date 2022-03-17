import React from "react";
import LottieView from "lottie-react-native";

import loadingCar from "../../assets/loading_car_animated.json";

import { Container } from "./LoadAnimated.styles";

const LoadAnimated = () => {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
};

export default LoadAnimated;
