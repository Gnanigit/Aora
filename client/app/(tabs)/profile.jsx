import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>This is the Profile page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});