import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import Input from "../components/input";
import { COLORS, SIZES, images, FONTS } from "../constants";
import ButtonPrimary from "../components/button-primary";

// Env
import { IP_ADDR } from "@env";

// actions
import { signin } from "../store/actions";
import { SET_ERRORS } from "../store/actions/actionTypes";

const Signin = ({ navigation }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginError = useSelector((state) => state.errors.login);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log("onsubmit clicked");
    console.log("username:", username);
    console.log("password:", password);
    dispatch(signin({ username, password }));
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    console.log(IP_ADDR);
    console.log(isAuthenticated, "didalem signin");
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [isAuthenticated]);

  const showAlert = () =>
    Alert.alert(
      "Login Error",
      loginError,
      [
        {
          text: "Cancel",
          onPress: () =>
            dispatch({
              type: SET_ERRORS,
              payload: {},
            }),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          dispatch({
            type: SET_ERRORS,
            payload: {},
          }),
      }
    );

  // Show Error when user input is invalid
  {
    loginError ? showAlert() : null;
  }

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
            leftIcon="user"
            placeHolder="input your username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        {/* INPUT USERNAME */}
        <View style={{ marginBottom: 20 }}>
          <Input
            title="password"
            leftIcon="key"
            placeHolder="input your password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View>
          {/* SIGN IN BUTTON */}
          <ButtonPrimary
            onPress={onSubmit}
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
            style={{
              paddingVertical: 10,
              borderRadius: 15,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              navigation.navigate("Signup");
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
