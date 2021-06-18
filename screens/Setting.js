import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ButtonPrimary from "../components/button-primary";
import { COLORS, FONTS } from "../constants";

import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <ButtonPrimary
        style={{
          backgroundColor: "red",
          marginTop: 30,
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          dispatch(logoutUser());
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          Logout
        </Text>
      </ButtonPrimary>
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
