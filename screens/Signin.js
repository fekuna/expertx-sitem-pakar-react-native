import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Input from "../components/input";
import { COLORS, SIZES, images, FONTS } from "../constants";
import ButtonPrimary from "../components/button-primary";

const Signin = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Image source={images.logo} style={{ width: 280, height: 280 }} />
      </View>
      <View style={[styles.body]}>
        {/* INPUT USERNAME */}
        <View style={{ marginBottom: 20 }}>
          <Input
            title="username"
            rightIcon="user"
            placeHolder="input your username"
          />
        </View>
        {/* INPUT USERNAME */}
        <View style={{ marginBottom: 20 }}>
          <Input
            title="password"
            rightIcon="key"
            placeHolder="input your password"
          />
        </View>
        <View>
          {/* SIGN IN BUTTON */}
          <ButtonPrimary
            ttonPrimary
            style={{
              paddingVertical: 10,
              borderRadius: 15,
              marginBottom: 15,
            }}
          >
            <Text
              style={{ ...FONTS.h3, color: COLORS.white, textAlign: "center" }}
            >
              Sign in
            </Text>
          </ButtonPrimary>
          {/* SIGN IN BUTTON */}
          <ButtonPrimary
            ttonPrimary
            style={{
              paddingVertical: 10,
              borderRadius: 15,
              backgroundColor: COLORS.white
            }}
          >
            <Text
              style={{ ...FONTS.h3, color: COLORS.gray, textAlign: "center" }}
            >
              Sign up
            </Text>
          </ButtonPrimary>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 2,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
});

export default Signin;
