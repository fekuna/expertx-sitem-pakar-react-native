import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, FONTS } from "../constants";
import { FontAwesome5 } from "@expo/vector-icons";

const Input = ({ title, leftIcon, placeHolder, style, error, ...props }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        {leftIcon ? (
          <FontAwesome5
            name={leftIcon}
            size={24}
            color={COLORS.gray}
            style={[styles.leftIcon]}
          />
        ) : null}
        <TextInput
          placeholder={placeHolder}
          style={[styles.input, style]}
          {...props}
        />
      </View>
      {!!error ? (
        <View>
          <Text style={{ ...FONTS.body5, color: COLORS.red }}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  title: {
    ...FONTS.h3,
    textTransform: "capitalize",
    paddingBottom: 4,
    color: COLORS.primary,
  },
  input: {
    paddingVertical: 15,
    // paddingHorizontal: 30,
    // borderBottomWidth: 2,
    // borderBottomColor: COLORS.primary,
    flex: 1,
  },
  leftIcon: {
    marginRight: 10,
  },
  leftIcon: {},
});
