import React, { useRef } from "react";
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
import { updatePassword } from "../store/actions";
import Input from "../components/input";

import { SET_ERRORS } from "../store/actions/actionTypes";

const UpdatePassword = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const backendErrors = useSelector(
    (state) => state.errors.updatePassword || null
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
            Update Password
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
                  title="Password Lama"
                  placeHolder="masukkan password lama"
                  secureTextEntry
                  onChangeText={(text) => {
                    // backendErrors.oldPassword = "";
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={errors.oldPassword?.message}
                />
              )}
              name="oldPassword"
              rules={{
                required: {
                  value: true,
                  message: "Password lama harus tidak boleh kosong",
                },
              }}
              //   defaultValue={user.username}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="Password Baru"
                  placeHolder="masukan password baru anda"
                  secureTextEntry
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={errors.newPassword?.message}
                />
              )}
              name="newPassword"
              rules={{
                required: {
                  value: true,
                  message: "Kolom password baru tidak boleh kosong",
                },
                minLength: {
                  value: 6,
                  message: "Minimal password 5 huruf",
                },
              }}
              defaultValue=""
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="Ulang Password"
                  placeHolder="ulangi password baru anda"
                  secureTextEntry
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={errors.rePassword?.message}
                />
              )}
              name="rePassword"
              rules={{
                required: {
                  value: true,
                  message: "Kolom ulang password tidak boleh kosong.",
                },
                validate: (value) =>
                  value === newPassword.current || "Password tidak sama.",
              }}
              defaultValue=""
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
    const response = await dispatch(updatePassword(data));

    showAlert(response.status, response.msg)

    // console.log(response);
    navigation.goBack();
  };

  const showAlert = (title, content) =>
    Alert.alert(
      title,
      content,
      [
        {
          text: "Oke",
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

  {
    backendErrors ? showAlert("Failed", backendErrors) : null;
  }

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

export default UpdatePassword;
