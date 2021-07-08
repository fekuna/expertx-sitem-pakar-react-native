import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import Card from "./card";

const ListActivity = ({
  title,
  subtitle,
  rightText,
  icon,
  customRightContent,
  style,
  ...props
}) => {
  return (
    <Card
      style={{
        flexDirection: "row",
        paddingVertical: SIZES.height * 0.012,
        // paddingHorizontal: 35,
        alignItems: "center",
        ...style,
      }}
      {...props}
    >
      <View
        style={{
          alignItems: "flex-start",
          marginRight: "auto",
        }}
      >
        <Text style={{ ...FONTS.h4 }}>{title}</Text>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.gray,
          }}
        >
          {subtitle}
        </Text>
      </View>
      <View>
        <Text style={{ ...FONTS.h2, color: COLORS.gray }}>{rightText}</Text>
      </View>
      {customRightContent ? customRightContent : null}
      {icon ? (
        <Image source={icon} style={{ width: 20, height: 20, marginLeft: 8 }} />
      ) : null}
    </Card>
  );
};

export default ListActivity;
