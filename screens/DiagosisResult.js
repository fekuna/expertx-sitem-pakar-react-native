import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListActivity from "../components/list-activity";

import { COLORS, FONTS, icons, SIZES } from "../constants";
import { getHistoryUser } from "../store/actions";

const DiagnosisResult = ({ navigation, route }) => {
  console.log(route.params, "aowdkoakdoawkd");

  const { maxResult, result } = route.params;

  const dispatch = useDispatch();
  const diagnosisResult = useSelector(
    (state) => state.penyakit.latestDiagnosis || null
  );
  const userId = useSelector((state) => state.auth.user.userId);

  useEffect(() => {
    return () => {
      dispatch(getHistoryUser({ id: userId }));
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
              fontSize: 85,
              fontFamily: "Roboto-Bold",
            }}
          >
            {(maxResult.cfcombine * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.headerBottom}>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>
            {maxResult.name}
          </Text>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>
            {maxResult.penyakitId}
          </Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
            Deskripsi
          </Text>
          <Text style={{ ...FONTS.body3 }}>
            {maxResult.desc}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
            Solusi & Saran
          </Text>
          <Text style={{ ...FONTS.body3 }}>{maxResult.solusi}</Text>
        </View>
        <View>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
            Kemungkinan Lain
          </Text>
          <FlatList
            scrollEventThrottle={32}
            scrollEnabled
            data={result}
            keyExtractor={(item) => item.penyakitId}
            renderItem={({ item }) => {
              return (
                <ListActivity
                  title={item.name}
                  rightText={(item.cfcombine * 100).toFixed(2) + "%"}
                />
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderBody()}
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
  section: {
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
