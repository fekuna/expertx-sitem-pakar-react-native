import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/input";
import { COLORS, SIZES, images, FONTS } from "../constants";
import ButtonPrimary from "../components/button-primary";

import { useForm, Controller } from "react-hook-form";

import { signup } from "../store/actions";

import { IP_ADDR } from "@env";

const Signup = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  // Redux State
  const backendErrors = useSelector(
    (state) =>
      state.errors.register || {
        username: "",
        email: "",
      }
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // React state
  // const [usernameError, setUsernameError] = useState(backendErrors?.username);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [isAuthenticated]);

  const onSubmit = (data) => {
    data = {
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      role: "user",
    };

    dispatch(signup(data));
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
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="username"
                  leftIcon="user"
                  placeHolder="input your username"
                  onChangeText={(text) => {
                    // if (backendErrors.username) {
                    // console.log("masokkk");
                    backendErrors.username = "";
                    // }
                    // setUsernameError("");
                    onChange(text);
                  }}
                  value={value}
                  onBlur={onBlur}
                  error={errors.username?.message || backendErrors?.username}
                />
              )}
              name="username"
              rules={{
                required: {
                  value: true,
                  message: "Username is required",
                },
                minLength: {
                  value: 4,
                  message: "Username must have at least 4 characters",
                },
              }}
              defaultValue=""
            />
          </View>
          {/* INPUT Email */}
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="email"
                  leftIcon="envelope"
                  placeHolder="input your email"
                  onChangeText={(text) => {
                    backendErrors.email = "";
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="email-address"
                  error={errors.email?.message || backendErrors?.email}
                />
              )}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                  message: "Email format is not correct",
                },
              }}
              defaultValue=""
            />
          </View>
          {/* INPUT Password */}
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="password"
                  leftIcon="key"
                  placeHolder="input your password"
                  secureTextEntry
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "password is required",
                },
                minLength: {
                  value: 6,
                  message: "password must have at least 5 characters",
                },
              }}
              defaultValue=""
            />
          </View>
          {/* INPUT confirm password */}
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="confirm password"
                  leftIcon="key"
                  placeHolder="repeat your password"
                  secureTextEntry
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                />
              )}
              name="confirmPassword"
              rules={{
                required: {
                  value: true,
                  message: "confirm password is required",
                },
                minLength: {
                  value: 6,
                  message: "confirm password must have at least 5 characters",
                },
                validate: (value) =>
                  value === password.current || "The password do not match",
              }}
              defaultValue=""
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
              onPress={handleSubmit(onSubmit)}
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
