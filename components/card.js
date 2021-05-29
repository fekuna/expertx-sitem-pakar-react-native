import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";

const card = ({style, children, ...props}) => {
  return (
    <TouchableOpacity style={[styles.card, style]} activeOpacity={.95} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
});

export default card;
