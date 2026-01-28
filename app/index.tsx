import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
const carloan = require("@/assets/images/car-loan.png");

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/input");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={carloan} style={styles.carlogo} />
      <Text style={styles.appname}>Smart Auto Loan</Text>
      <Text style={styles.appnameaa}>วางแผนออกรถฉบับมือโปร</Text>
      <ActivityIndicator
        size="large"
        color="#FFFFFF"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#576A8F",
  },
  carlogo: {
    width: 200,
    height: 200,
  },
  appname: {
    fontFamily: "Kanit_700Bold",
    fontSize: 30,
    color: "#FFFFFF",
  },
  appnameaa: {
    fontFamily: "Kanit_500Medium",
    fontSize: 14,
    color: "#CDCDCD",
  },
});
