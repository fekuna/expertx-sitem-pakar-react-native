import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { Provider, useSelector, useStore } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import {
  Signin,
  Signup,
  Penyakit,
  AddPenyakit,
  AddGejala,
  PenyakitDetail,
  AddGejalaToPenyakit,
  DiagnosisResult,
  Gejala,
  EditGejala,
  History,
  EditPenyakit,
  UpdateProfile,
  UpdatePassword,
} from "./screens";

import store from "./store/store";
import { authCheckLoginUser } from "./store/actions/usersActions";

const Stack = createStackNavigator();

export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = store.getState().auth.isAuthenticated
  const [fontloaded, setfontloaded] = useState(false);
  const fetchFonts = async () => {
    await Font.loadAsync({
      "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });
    setfontloaded(true);
  };

  useEffect(() => {
    fetchFonts();
    store.dispatch(authCheckLoginUser());
  }, [fontloaded, fetchFonts, store]);

  // store.subscribe(store.getState().auth.isAuthenticated)

  if (!fontloaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Signin"}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Penyakit" component={Penyakit} />
          <Stack.Screen name="Gejala" component={Gejala} />
          <Stack.Screen name="AddPenyakit" component={AddPenyakit} />
          <Stack.Screen name="EditPenyakit" component={EditPenyakit} />
          <Stack.Screen name="AddGejala" component={AddGejala} />
          <Stack.Screen name="EditGejala" component={EditGejala} />
          <Stack.Screen name="PenyakitDetail" component={PenyakitDetail} />
          <Stack.Screen name="DiagnosisResult" component={DiagnosisResult} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
          <Stack.Screen
            name="AddGejalaToPenyakit"
            component={AddGejalaToPenyakit}
          />

          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
