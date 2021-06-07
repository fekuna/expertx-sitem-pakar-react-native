import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { AntDesign } from "@expo/vector-icons";
import ButtonPrimary from "../components/button-primary";
import ListActivity from "../components/list-activity";
import { getPenyakit } from "../store/actions";

const Penyakit = ({ navigation }) => {
  const dispatch = useDispatch();

  // State
  const allPenyakit = useSelector((state) => state.penyakit.allPenyakit);

  useEffect(() => {
    dispatch(getPenyakit());
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
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>Penyakit</Text>
          <ButtonPrimary
            style={{
              backgroundColor: COLORS.green,
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => navigation.navigate("Gejala")}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>VIEW GEJALA</Text>
          </ButtonPrimary>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <FlatList
          data={allPenyakit}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListActivity
              title={item.name}
              subtitle={item.createdAt}
              icon={icons.right_arrow}
              onPress={() => {
                return navigation.navigate("PenyakitDetail", item);
              }}
            />
          )}
        />
      </View>
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
        onPress={() => navigation.navigate("AddPenyakit")}
      >
        <AntDesign name="plus" size={34} color="white" />
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

export default Penyakit;
