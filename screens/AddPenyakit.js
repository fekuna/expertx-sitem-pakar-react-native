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

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { FontAwesome } from "@expo/vector-icons";
import ButtonPrimary from "../components/button-primary";
import ListActivity from "../components/list-activity";
import { getPenyakit } from "../store/actions";
import Input from "../components/input";

const AddPenyakit = ({ navigation }) => {
  const dispatch = useDispatch();

  // State
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [solusi, setSolusi] = useState(null);

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
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>Add Penyakit</Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            <Input
              title="id penyakit"
              placeHolder="masukan id penyakit"
              onChangeText={(text) => setId(text)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              title="name"
              placeHolder="masukan nama penyakit"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              title="solusi"
              placeHolder="masukan solusi"
              multiline={true}
              style={{ paddingBottom: 35 }}
              onChangeText={(text) => setSolusi(text)}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const onSubmit = async () => {
    const data = {
      id: id.toUpperCase(),
      name,
      solusi,
    };

    let response;
    try {
      response = await fetch("http://192.168.1.4:5000/api/penyakit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
    }

    // const result = await response.json()
    // console.log(result)
    setId("");
    setName("");
    setSolusi("");
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
        onPress={() => onSubmit()}
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

export default AddPenyakit;
