import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ButtonPrimary from "../components/button-primary";
import { COLORS, FONTS, SIZES } from "../constants";

import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const ButtonSetting = ({ title, styles, onPress, ...props }) => {
    return (
      <ButtonPrimary
        style={{
          backgroundColor: "green",
          marginTop: 15,
          paddingVertical: 15,
          ...styles,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: COLORS.white,
            textAlign: "center",
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>
      </ButtonPrimary>
    );
  };
  return (
    <View style={styles.container}>
      <ButtonSetting
        title="Update Profile"
        styles={{
          width: SIZES.width * 0.5,
        }}
        onPress={() => {
          navigation.navigate("UpdateProfile");
        }}
      />
      <ButtonSetting
        title="Change Password"
        styles={{
          width: SIZES.width * 0.5,
        }}
        onPress={() => {
          navigation.navigate("UpdatePassword")
        }}
      />
      <ButtonSetting
        title="Logout"
        styles={{
          width: SIZES.width * 0.5,
          backgroundColor: "red",
        }}
        onPress={() => {
          dispatch(logoutUser());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default Home;
