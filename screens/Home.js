import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS, FONTS, icons, images, SIZES } from "../constants";

import Card from "../components/card";
import Button from "../components/button";

const Home = ({ navigation }) => {
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
              }}
            >
              ALFAN ALMUNAWAR
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
                      2
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
                      16
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
          <Button onPress={() => console.log("asd")}>
            <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
              VIEW ALL
            </Text>
          </Button>
        </View>

        {/* DIAGNOSIS */}
        <View>
          <Card
            style={{
              flexDirection: "row",
              paddingVertical: SIZES.height * 0.012,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
                marginRight: "auto",
              }}
            >
              <Text style={{ ...FONTS.h3 }}>Batuk</Text>
              <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                02-07-2012
              </Text>
            </View>
            <View>
              <Text style={{ ...FONTS.h1, color: COLORS.gray }}>95%</Text>
            </View>
            <Image
              source={icons.right_arrow}
              style={{ width: 20, height: 20, marginLeft: 8 }}
            />
          </Card>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 130 }}>
        {renderHeader()}
        {renderUserActivities()}
      </View>
    </ScrollView>
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
