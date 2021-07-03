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
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { getGejala, addGejala } from "../store/actions";
import Input from "../components/input";

// Env
import { IP_ADDR } from "@env";

const AddGejala = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const backendErrors = useSelector((state) => state.errors.addGejala || {});

  const dispatch = useDispatch();

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
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>Tambah Gejala</Text>
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
              defaultValue=""
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="nama"
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
              defaultValue=""
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title="pertanyaan"
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
              defaultValue=""
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const onSubmit = async (data) => {
    console.log(data);

    const response = await dispatch(addGejala(data));
    console.log("response", response);

    // const data = {
    //   id: id.toUpperCase(),
    //   name,
    //   question,
    // };

    // let response;
    // try {
    //   response = await fetch(`${IP_ADDR}/api/gejala/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    // const result = await response.json()
    // setId("");
    // setName("");
    // setQuestion("");
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

export default AddGejala;
