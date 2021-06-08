import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS, FONTS, icons, images, SIZES } from "../constants";

import Card from "../components/card";
import ButtonPrimary from "../components/button-primary";
import ListActivity from "../components/list-activity";
import { useSelector, useDispatch } from "react-redux";
import { getPenyakit, getAllUsers, getHistoryUser } from "../store/actions";

const Home = ({ navigation }) => {
  const username = useSelector((state) => state.auth.user.username);
  const userId = useSelector((state) => state.auth.user.userId);
  const allPenyakitLength = useSelector(
    (state) => state.penyakit.allPenyakit.length
  );
  const allUsersLength = useSelector((state) => state.auth.allUsers.length);
  const userHistories = useSelector((state) => state.auth.historyDiagnosis);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(userId)
    dispatch(getPenyakit());
    dispatch(getAllUsers());
    dispatch(getHistoryUser({ id: userId }));
  }, [userId]);

  const renderHeader = () => {
    return (
      <View
        style={{ width: "100%", height: SIZES.height * 0.4, ...styles.shadow }}
      >
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={{ flex: 1, alignItems: "center" }}
        >
          {/* Header Bar */}
          <View
            style={{
              marginTop: SIZES.padding * 2,
              width: "100%",
              alignItems: "flex-end",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => console.log("notification pressed")}
            >
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </View>

          {/* Greetings */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Hello,</Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h1,
                marginTop: SIZES.base,
                textTransform: "capitalize",
              }}
            >
              {username}
            </Text>
          </View>

          {/* INFORMATION */}
          <View
            style={{
              position: "absolute",
              bottom: "-10%",
              justifyContent: "center",
              zIndex: 999,
            }}
          >
            <ScrollView
              contentContainerStyle={{ marginTop: SIZES.base }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {/* USERS */}
              <Card
                style={{
                  width: 180,
                  marginLeft: 0,
                  marginRight: SIZES.radius,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome5
                      name="users"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.secondary,
                      }}
                    >
                      USERS
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        color: COLORS.gray,
                        ...FONTS.h1,
                      }}
                    >
                      {allUsersLength}
                    </Text>
                  </View>
                </View>
              </Card>

              {/* PENYAKIT */}
              <Card
                style={{
                  width: 180,
                  marginLeft: 0,
                  marginRight: SIZES.radius,
                }}
                onPress={() => navigation.navigate("Penyakit")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome5 name="viruses" size={24} color={COLORS.red} />
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.red,
                      }}
                    >
                      PENYAKIT
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        color: COLORS.gray,
                        ...FONTS.h1,
                      }}
                    >
                      {allPenyakitLength}
                    </Text>
                  </View>
                </View>
              </Card>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderUserActivities = () => {
    return (
      <View
        style={{
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: SIZES.padding,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>Diagnosis User</Text>
          <ButtonPrimary onPress={() => navigation.navigate("History")}>
            <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
              VIEW ALL
            </Text>
          </ButtonPrimary>
        </View>

        {/* DIAGNOSIS */}
        <View style={{ flex: 3 }}>
          <FlatList
            data={userHistories.slice(0, 5)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListActivity
                title={item.penyakitName}
                subtitle={item.createdAt}
                rightText={`${(item.hasil * 100).toFixed(2)}%`}
              />
            )}
          />
        </View>
      </View>
    );
  };

  return (
    // <ScrollView>
    <View style={{ flex: 1, paddingBottom: 10 }}>
      {renderHeader()}
      {renderUserActivities()}
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default Home;
