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
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import RoundButton from "../components/round-button";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import ButtonPrimary from "../components/button-primary";
import ListActivity from "../components/list-activity";
import { getGejala } from "../store/actions";

// Env
import { IP_ADDR } from "@env";

const Gejala = ({ navigation }) => {
  const dispatch = useDispatch();

  // State
  const allGejala = useSelector((state) => state.penyakit.allGejala);
  const userRole = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    dispatch(getGejala());
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
                onPress={() => navigation.navigate("AddGejala")}
              >
                <AntDesign name="pluscircleo" size={35} color="white" />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <View style={styles.headerBottom}>
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>Gejala</Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <FlatList
          data={allGejala}
          keyExtractor={(item) => item.gejalaId}
          renderItem={({ item }) => (
            <ListActivity
              title={item.name}
              subtitle={item.createdAt}
              // icon={userRole === "user" ? icons.right_arrow : null}
              customRightContent={
                userRole === "admin" && (
                  <View style={{ flexDirection: "row", padding: 8 }}>
                    <MaterialIcons
                      name="edit"
                      size={24}
                      color="green"
                      onPress={() =>
                        navigation.navigate("EditGejala", {
                          gejalaId: item.gejalaId,
                          nameEdit: item.name,
                          questionEdit: item.question,
                        })
                      }
                    />
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="red"
                      style={{ marginLeft: 10 }}
                      onPress={() => onDelete(item.gejalaId)}
                    />
                  </View>
                )
              }
            />
          )}
        />
      </View>
    );
  };

  // Button actions
  const onDelete = async (gejalaId) => {
    let response;
    try {
      response = await fetch(`${IP_ADDR}/api/gejala/${gejalaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }

    dispatch(getGejala());
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
    flexDirection: "row",
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

export default Gejala;
