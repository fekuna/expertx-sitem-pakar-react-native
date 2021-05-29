import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const button = ({ style, children, ...props }) => {
  return (
    // <LinearGradient colors={[COLORS.primary, COLORS.secondary]}>
      <TouchableOpacity
        style={[styles.button, style]}
        activeOpacity={0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 5,
    padding: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary
  },
});

export default button;
