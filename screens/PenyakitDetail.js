import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
  LogBox,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ButtonPrimary from "../components/button-primary";
import ListActivity from "../components/list-activity";
import { getPenyakit, getGejala } from "../store/actions";
import Input from "../components/input";

// Env
import { IP_ADDR } from "@env";

const PenyakitDetail = ({ navigation, route }) => {
  const { penyakitId, name, solusi, desc } = route.params;

  const dispatch = useDispatch();
  // redux state
  const gejalaPenyakit = useSelector(
    (state) =>
      state.penyakit.allPenyakit.find(
        (penyakit) => penyakit.penyakitId === penyakitId
      ).gejala
  );
  const userRole = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    dispatch(getPenyakit());
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ marginRight: "auto" }}>
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
          <View>
            {userRole === "admin" && (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("AddGejalaToPenyakit", { penyakitId })
                }
              >
                <AntDesign name="pluscircleo" size={35} color="white" />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <View style={styles.headerBottom}>
          <Text
            style={{ ...FONTS.h1, color: COLORS.white, marginRight: "auto" }}
          >
            {name}
          </Text>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>{penyakitId}</Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        {/* <ScrollView style={{ flex: 1 }} nestedScrollEnabled> */}
        <View style={styles.section}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Deskripsi</Text>
          <Text style={{ ...FONTS.body3 }}>{desc}</Text>
        </View>
        <View style={styles.section}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Solusi</Text>
          <Text style={{ ...FONTS.body3 }}>{solusi}</Text>
        </View>
        <View style={styles.gejalaContainer}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
            Gejala-gejala
          </Text>
          {gejalaPenyakit.length ? (
            renderGejala()
          ) : (
            <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
              Gejala belum ditambah, silahkan tambahkan beberapa.
            </Text>
          )}
        </View>
        {/* </ScrollView> */}
      </View>
    );
  };

  const renderGejala = () => {
    return (
      <FlatList
        scrollEventThrottle={32}
        scrollEnabled
        data={gejalaPenyakit}
        keyExtractor={(item) => item.gejalaId}
        renderItem={({ item }) => {
          return (
            <ListActivity
              title={item.name}
              subtitle={item.desc}
              rightText={item.Penyakit_Gejala.cfp}
              customRightContent={
                userRole === "admin" && (
                  <View style={{ marginLeft: 5 }}>
                    <MaterialIcons
                      name="delete"
                      size={26}
                      color="red"
                      style={{ marginLeft: 10 }}
                      onPress={() => onDelete(item.id)}
                    />
                  </View>
                )
              }
            />
          );
        }}
      />
    );
  };

  // Button actions
  const onDelete = async (gejalaId) => {
    let response;
    try {
      response = await fetch(`${IP_ADDR}/api/penyakit/remove/gejala`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ penyakitId: id, gejalaId }),
      });
    } catch (e) {
      console.log(e);
    }

    dispatch(getPenyakit());
  };

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
    flexDirection: "row",
  },
  headerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    // flex: 1,
  },
  gejalaContainer: {
    flex: 1,
    // height: '100%'
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

export default PenyakitDetail;
