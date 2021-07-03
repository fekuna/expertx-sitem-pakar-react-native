import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { FontAwesome } from "@expo/vector-icons";
import { updateProfile } from "../store/actions";
import Input from "../components/input";

// Env
import { IP_ADDR } from "@env";
import { getUserById } from "../store/actions/usersActions";
import { SET_ERRORS } from "../store/actions/actionTypes";

const UpdateProfile = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  // const backendErrors = useSelector(
  //   (state) => state.errors.updateProfile || {}
  // );

  const showAlert = (title, content) =>
    Alert.alert(
      title,
      content,
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

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image
              source={icons.back_arrow}
              style={{
                width: 20,
                height: 20,
                marginLeft: 8,
                tintColor: COLORS.white,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.headerBottom}>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>
            Update Profile
          </Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    // console.log(user.username);
    return (
      <View style={styles.body}>
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="Username"
                  onChangeText={(text) => {
                    backendErrors.username = "";
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  editable={false}
                  value={value}
                  error={errors.username?.message}
                />
              )}
              name="username"
              rules={{
                required: {
                  value: true,
                  message: "username",
                },
              }}
              defaultValue={user.username}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="Nama"
                  placeHolder="masukan nama lengkap"
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={errors.name?.message}
                />
              )}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: "nama tidak boleh kosong",
                },
              }}
              defaultValue={user.name}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="Email"
                  placeHolder="masukan email"
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email?.message}
                />
              )}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email tidak boleh kosong",
                },
                pattern: {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                  message: "Email format is not correct",
                },
              }}
              defaultValue={user.email}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const onSubmit = async (data) => {
    data = {
      ...data,
      userId: user.userId,
    };
    console.log(data, "edit submitted");
    const response = await dispatch(updateProfile(data));

    showAlert(response.status, response.msg)

    dispatch(getUserById(user.userId));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderBody()}
      <RoundButton
        style={{
          position: "absolute",
          bottom: 40,
          right: 30,
        }}
        onPress={handleSubmit(onSubmit)}
      >
        <FontAwesome name="check" size={34} color="white" />
      </RoundButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  headerTop: {
    paddingTop: 10,
    marginBottom: "auto",
  },
  headerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    flex: 2,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
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

export default UpdateProfile;
