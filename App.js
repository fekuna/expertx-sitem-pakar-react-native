import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { Signin } from './screens'

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Signin"}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}