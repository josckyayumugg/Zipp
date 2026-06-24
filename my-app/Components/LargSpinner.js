import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-web";
export default function LargeSpinner() {
  return (
    <View style={{ flex: 1, justifyItems: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
    </View>
  );
}
