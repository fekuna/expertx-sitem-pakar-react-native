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
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES, certainty } from "../constants";

import { FontAwesome } from "@expo/vector-icons";
import { getGejala, getPenyakit } from "../store/actions";
import { SET_ERRORS } from "../store/actions/actionTypes";
import Input from "../components/input";

// Env
import { IP_ADDR } from "@env";

const AddGejalaToPenyakit = ({ navigation, route }) => {
  const { penyakitId } = route.params;
  const dispatch = useDispatch();

  //Redux State
  const allGejala = useSelector((state) => state.penyakit.allGejala);
  const backendErrors = useSelector(
    (state) => state.errors.addGejalaToPenyakit
  );

  // State
  const [gejalaId, setGejalaId] = useState(allGejala[0].gejalaId);
  const [cfp, setCfp] = useState(certainty[0].cf);

  useEffect(() => {
    dispatch(getGejala());
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
            Add Gejala To {penyakitId}
          </Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <ScrollView>
          {/* <View style={{ marginBottom: 20 }}>
            <Input
              title="CF pakar"
              placeHolder="masukan CF pakar"
              onChangeText={(text) => setCfp(text)}
            />
          </View> */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...FONTS.h3,
                textTransform: "capitalize",
                paddingBottom: 4,
                color: COLORS.primary,
              }}
            >
              CF pakar
            </Text>
            <Picker
              selectedValue={cfp}
              onValueChange={(itemValue, itemIndex) => setCfp(itemValue)}
            >
              {certainty.map((certain, idx) => {
                return (
                  <Picker.Item
                    label={`${certain.cf} - ${certain.name}`}
                    value={certain.cf}
                    key={idx}
                  />
                );
              })}
            </Picker>
          </View>
          <View>
            <Text
              style={{
                ...FONTS.h3,
                textTransform: "capitalize",
                paddingBottom: 4,
                color: COLORS.primary,
              }}
            >
              Gejala
            </Text>
            <Picker
              selectedValue={gejalaId}
              onValueChange={(itemValue, itemIndex) => setGejalaId(itemValue)}
            >
              {allGejala.map((gejala) => {
                return (
                  <Picker.Item
                    label={`${gejala.gejalaId} - ${gejala.name}`}
                    value={gejala.gejalaId}
                    key={gejala.gejalaId}
                  />
                );
              })}
            </Picker>
          </View>
        </ScrollView>
      </View>
    );
  };

  const onSubmit = async () => {
    const data = {
      penyakitId,
      gejalaId,
      cfp,
    };
    console.log(data);

    let response;
    try {
      response = await fetch(`${IP_ADDR}/api/penyakit/add/gejala`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(JSON.stringify(responseData.errors));
      }
    } catch (e) {
      const message = JSON.parse(e.message);
      console.log(message, "message");
      let errors = {};
      message.map((m) => {
        errors = {
          ...errors,
          [m.param]: m.msg,
        };
      });
      dispatch({
        type: SET_ERRORS,
        payload: {
          addGejalaToPenyakit: errors,
        },
      });
    }

    const result = await response.json();
    console.log(result, "result");
    // setGejalaId("");
    // setCfp("");
    navigation.goBack();
  };

  const showAlert = () => {
    Alert.alert(
      "Something went wrong",
      backendErrors.gejalaId,
      [
        {
          text: "Cancel",
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
  };

  {
    backendErrors ? showAlert() : null;
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

export default AddGejalaToPenyakit;
