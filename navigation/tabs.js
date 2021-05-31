import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

import { Home, Diagnosis, Disease, Symptom, Setting, Signout } from "../screens";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      activeOpacity={.7}
      onPress={onPress}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{ width: 70, height: 70, borderRadius: 35 }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

// function MyTabBar({ navigation }) {
//   return (
//     <Button
//       title="Go somewhere"
//       onPress={() => {
//         // Navigate using the `navigation` prop that you received
//         console.log('hello')
//         // navigation.navigate('SomeScreen');
//       }}
//     />
//   );
// }

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: SIZES.height * 0.08,
        },
      }}
      // tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Diagnosis"
        component={Diagnosis}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.heart}
              resizeMode="contain"
              style={{ width: 30, height: 30, tintColor: COLORS.white }}
            />
          ),

          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
  },
});

export default Tabs;
