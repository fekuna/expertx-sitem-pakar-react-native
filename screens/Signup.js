import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { useDispatch } from "react-redux";
import Input from "../components/input";
import { COLORS, SIZES, images, FONTS } from "../constants";
import ButtonPrimary from "../components/button-primary";

import { signup } from "../store/actions";

const Signup = ({ navigation }) => {
  //State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (password !== confirmPassword) {
      return Alert.alert(
        "Something went wrong!",
        "Password didn't match, please check"
      );
    }

    const data = {
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password,
      role: "user",
    };

    dispatch(signup(data));

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    console.log(data);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Image source={images.logo} style={{ width: 280, height: 280 }} />
      </View>
      <View style={[styles.body]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* INPUT USERNAME */}
          <View style={{ marginBottom: 20 }}>
            <Input
              title="username"
              rightIcon="user"
              placeHolder="input your username"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </View>
          {/* INPUT Email */}
          <View style={{ marginBottom: 20 }}>
            <Input
              title="email"
              rightIcon="envelope"
              placeHolder="input your email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          {/* INPUT Password */}
          <View style={{ marginBottom: 20 }}>
            <Input
              title="password"
              rightIcon="key"
              placeHolder="input your password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          {/* INPUT confirm password */}
          <View style={{ marginBottom: 20 }}>
            <Input
              title="confirm password"
              rightIcon="key"
              placeHolder="input your confirmation password"
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
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
              onPress={() => onSubmit()}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  textAlign: "center",
                }}
              >
                Sign up
              </Text>
            </ButtonPrimary>
            {/* SIGN IN BUTTON */}
            <ButtonPrimary
              ttonPrimary
              style={{
                paddingVertical: 10,
                borderRadius: 15,
                marginBottom: 15,
                backgroundColor: COLORS.white,
              }}
              onPress={() => {
                navigation.navigate("Signin");
              }}
            >
              <Text
                style={{ ...FONTS.h3, color: COLORS.gray, textAlign: "center" }}
              >
                Sign in
              </Text>
            </ButtonPrimary>
          </View>
        </ScrollView>
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
    // paddingVertical: SIZES.padding,
    paddingTop: SIZES.padding,
  },
});

export default Signup;
