import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/loader.gif")}
        style={styles.loader}
        resizeMode="contain"
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#009C82",
    marginBottom: 20,
  },
  loader: {
    width: 300,
    height: 300,
  },
});
