import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hook/auth";

import AppTabRoutes from "./app.tab.routes";
import AuthRoutes from "./auth.routes";
import LoadAnimated from "../components/LoadAnimated";

const Routes = () => {
  const { user, loading } = useAuth();

  return loading ? (
    <LoadAnimated />
  ) : (
    <NavigationContainer>
      {user.token ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
export default Routes;
