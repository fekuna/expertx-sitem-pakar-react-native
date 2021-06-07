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
  const { id, name, solusi, gejala } = route.params;

  const dispatch = useDispatch();
  // redux state
  const gejalaPenyakit = useSelector(
    (state) =>
      state.penyakit.allPenyakit.find((penyakit) => penyakit.id === id).gejala
  );

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
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("AddGejalaToPenyakit", { id })}
            >
              <AntDesign name="pluscircleo" size={35} color="white" />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.headerBottom}>
          <Text
            style={{ ...FONTS.h1, color: COLORS.white, marginRight: "auto" }}
          >
            {name}
          </Text>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>{id}</Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <View style={styles.solusi}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Solusi</Text>
          <Text style={{ ...FONTS.body3 }}>{solusi}</Text>
        </View>
        <View style={styles.gejalaContainer}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
            Gejala-gejala
          </Text>
          <FlatList
            scrollEventThrottle={32}
            scrollEnabled
            data={gejalaPenyakit}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <ListActivity
                  title={item.id}
                  subtitle={item.desc}
                  rightText={item.Penyakit_Gejala.cfp}
                  customRightContent={
                    <View style={{ marginLeft: 5 }}>
                      <MaterialIcons
                        name="delete"
                        size={26}
                        color="red"
                        style={{ marginLeft: 10 }}
                        onPress={() => onDelete(item.id)}
                      />
                    </View>
                  }
                />
              );
            }}
          />
        </View>
      </View>
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
  solusi: {
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
