import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { FontAwesome } from "@expo/vector-icons";
import { getGejala, editGejala } from "../store/actions";
import Input from "../components/input";

// Env
import { IP_ADDR } from "@env";

const EditGejala = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { gejalaId, nameEdit, questionEdit } = route.params;

  const backendErrors = useSelector((state) => state.errors.editGejala || {});

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
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>Edit Gejala</Text>
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
                  title="ID gejala"
                  placeHolder="masukan id gejala"
                  onChangeText={(text) => {
                    backendErrors.gejalaId = "";
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  editable={false}
                  value={value}
                  error={errors.gejalaId?.message || backendErrors?.gejalaId}
                />
              )}
              name="gejalaId"
              rules={{
                required: {
                  value: true,
                  message: "Penyakit ID is required",
                },
              }}
              defaultValue={gejalaId}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="name"
                  placeHolder="masukan nama gejala"
                  onChangeText={(text) => {
                    backendErrors.name = "";
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={errors.name?.message || backendErrors?.name}
                />
              )}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: "Gejala name is required",
                },
              }}
              defaultValue={nameEdit}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="question"
                  placeHolder="masukan pertanyaan"
                  multiline={true}
                  style={{ paddingBottom: 35 }}
                  onChangeText={(text) => {
                    backendErrors.question = "";
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={errors.question?.message || backendErrors?.question}
                />
              )}
              name="question"
              rules={{
                required: {
                  value: true,
                  message: "Question is required",
                },
              }}
              defaultValue={questionEdit}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const onSubmit = async (data) => {
    console.log(data, "edit submitted");
    const response = await dispatch(editGejala(data));

    const result = await response.json();
    console.log(result);
    dispatch(getGejala());
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

export default EditGejala;
