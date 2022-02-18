import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Scheduling from '../screens/Scheduling';
import SchedulingDetails from '../screens/SchedulingDetails';
import Confirmation from '../screens/Confirmation';
import MyCars from '../screens/MyCars';
import Splash from '../screens/Splash';
import Signin from '../screens/Signin/Signin';
import { SignupFirstStep,  SignupSecondStep } from '../screens/Signup'

const { Navigator, Screen } = createStackNavigator()

const StackRoutes = () => {

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Signin'
    >
      {/* <Screen
        name="Splash"
        component={Splash}
      /> */}

      <Screen
        name="Signin"
        component={Signin}
      />

      <Screen
        name="SignupFirstStep"
        component={SignupFirstStep}
      />

      <Screen
        name="SignupSecondStep"
        component={SignupSecondStep}
      />

      {/* No IOS "options" => pra previnir não voltar para a tela de Splash */}
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />

      <Screen
        name="CarDetails"
        component={CarDetails}
      />

      <Screen
        name="Scheduling"
        component={Scheduling}
      />

      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />

      <Screen
        name="Confirmation"
        component={Confirmation}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )

}

export default StackRoutes;
