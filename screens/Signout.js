import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Signout = () => {
  return (
    <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        // navigation.navigate("SomeScreen");
        console.log('hello')
      }}
    />
  );
};

export default Signout;

const styles = StyleSheet.create({});
