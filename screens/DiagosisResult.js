import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { COLORS, FONTS, icons, SIZES } from "../constants";
import { getHistoryUser } from "../store/actions";

const DiagnosisResult = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const diagnosisResult = useSelector(
    (state) => state.penyakit.latestDiagnosis
  );

  useEffect(() => {
    return () => {
      dispatch(getHistoryUser());
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 100,
              fontFamily: "Roboto-Bold",
            }}
          >
            {(diagnosisResult.cfcombine * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.headerBottom}>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>
            {diagnosisResult.name}
          </Text>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>
            {diagnosisResult.penyakitId}
          </Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <View style={styles.solusi}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
            Solusi & Saran
          </Text>
          <Text style={{ ...FONTS.body3 }}>{diagnosisResult.solusi}</Text>
        </View>
        {/* <View style={styles.gejalaContainer}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
            Gejala-gejala
          </Text>
        </View> */}
      </View>
    );
  };

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderBody()}
      {/* <RoundButton
        style={{
          position: "absolute",
          bottom: 40,
          right: 30,
        }}
        onPress={() => onSubmit()}
      >
        <AntDesign name="plus" size={34} color="white" />
      </RoundButton> */}
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
  solusi: {
    marginBottom: 20,
  },
  gejalaContainer: {
    flex: 1,
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

export default DiagnosisResult;
