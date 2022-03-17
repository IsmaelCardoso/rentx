import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import HomeSVG from "../assets/home.svg";
import CarSVG from "../assets/car.svg";
import PeopleSVG from "../assets/people.svg";

import AppStackRoutes from "./app.stack.routes";
import MyCars from "../screens/MyCars";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

const AppTabRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="HomeTab"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG width={24} height={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSVG width={24} height={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSVG width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export default AppTabRoutes;
