import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import { getPenyakit, editPenyakit } from "../store/actions";
import Input from "../components/input";

const EditPenyakit = ({ navigation, route }) => {
  const { penyakitId, name, desc, solusi } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useDispatch();

  // Redux state
  const backendErrors = useSelector(
    (state) =>
      state.errors.editPenyakit || {
        penyakitId: "",
        name: "",
        desc: "",
        solusi: "",
      }
  );

  useEffect(() => {
    return () => {
      dispatch(getPenyakit());
    };
  }, []);

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
            Edit Penyakit - {penyakitId}
          </Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="id penyakit"
                  placeHolder="masukan id penyakit"
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                  error={
                    errors.penyakitId?.message || backendErrors?.penyakitId
                  }
                  editable={false}
                />
              )}
              name="penyakitId"
              rules={{
                required: {
                  value: true,
                  message: "Penyakit ID is required",
                },
              }}
              defaultValue={penyakitId}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="name"
                  placeHolder="masukan nama penyakit"
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                  error={errors.name?.message || backendErrors?.name}
                />
              )}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: "Penyakit name is required",
                },
              }}
              defaultValue={name}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="deskripsi"
                  placeHolder="masukan deskripsi"
                  multiline={true}
                  style={{ paddingBottom: 35 }}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                  error={errors.desc?.message || backendErrors?.desc}
                />
              )}
              name="desc"
              rules={{
                required: {
                  value: true,
                  message: "Deskripsi is required",
                },
              }}
              defaultValue={desc}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="solusi"
                  placeHolder="masukkan solusi"
                  multiline={true}
                  style={{ paddingBottom: 35 }}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                  error={errors.solusi?.message || backendErrors?.solusi}
                />
              )}
              name="solusi"
              rules={{
                required: {
                  value: true,
                  message: "Solusi is required",
                },
              }}
              defaultValue={solusi}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const onSubmit = async (data) => {
    console.log(data);

    const result = await dispatch(editPenyakit(data));
    console.log("result neh:", result);
    Alert.alert(
      result.status,
      result.msg,
      [
        {
          text: "ok",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => navigation.goBack(),
      }
    );
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
    // justifyContent: "space-between",
    // alignItems: "flex-end",
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

export default EditPenyakit;
