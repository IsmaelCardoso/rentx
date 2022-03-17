import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import CarDetails from "../screens/CarDetails";
import Scheduling from "../screens/Scheduling";
import SchedulingDetails from "../screens/SchedulingDetails";
import Confirmation from "../screens/Confirmation";
import MyCars from "../screens/MyCars";
import Splash from "../screens/Splash";
import Signin from "../screens/Signin/Signin";
import { SignupFirstStep, SignupSecondStep } from "../screens/Signup";

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />

      <Screen name="Signin" component={Signin} />

      <Screen name="SignupFirstStep" component={SignupFirstStep} />

      <Screen name="SignupSecondStep" component={SignupSecondStep} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
};

export default AuthRoutes;
