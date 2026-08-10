import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { GlobalStyles } from "../Constants";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Category from "./Category";
export default function Categories() {
  const navigator = useNavigation();
  return (
    <View
      style={[
        {
          alignSelf: "center",
          justifyContent: "center",
          marginHorizontal: "auto",
        },
        styles.largeMTop,
      ]}
    >
      <Text
        style={[
          { textAlign: "center", color: GlobalStyles.Primary_Green },
          styles.bigText,
          styles.bold,
        ]}
      >
        Browse Categories
      </Text>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "center",
          marginHorizontal: "auto",
        }}
      >
        <Category searchQuery={"engine"} name="Engine" icon="cog-outline" />
        <Category
          name="brakes(feri)"
          searchQuery={"brakes"}
          icon="disc-outline"
        />
        <Category name="Lighting" searchQuery={"lights"} icon="bulb" />
        <Category
          name="suspension"
          icon="build-outline"
          searchQuery={"suspension"}
        />
        <Category
          name="Electrical"
          icon="logo-electron"
          searchQuery={"electricity"}
        />
        <Category
          name="Others"
          icon="car-outline"
          searchQuery={"Others"}
          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    minWidth: "100%",
    fontFamily: "notoSans",
  },

  mainTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 35,
    textAlign: "center",
  },
  PageHeaderTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 25,
  },
  Views: {
    marginVertical: 12,
  },
  icon: {
    marginHorizontal: 8,
  },
  smallT: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
  },
  smallMVertical: {
    marginVertical: 8,
  },
  largeMTop: {
    marginTop: 35,
  },
  smallMTop: {
    marginTop: 8,
  },
  label: {
    borderWidth: 2,
  },
  Roboto: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  bold: {
    fontFamily: "Roboto-semibold",
    fontWeight: 700,
  },
  graph: {
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  padding: {
    padding: 8,
  },
  paddingSm: {
    padding: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  column: {
    flexDirection: "column",
  },
  whiteT: {
    color: "white",
  },
  greyT: {
    color: GlobalStyles.Primary_Grey,
  },
  greenT: {
    color: GlobalStyles.Primary_Green,
  },
  smallText: {
    fontSize: 10,
    fontFamily: "Roboto-Light",
  },
  whiteText: {
    color: GlobalStyles.Primary_Grey,
  },
  yellow: {
    color: GlobalStyles.Secondary_Yellow,
  },
  yellowBg: {
    backgroundColor: GlobalStyles.Primary_Yellow,
  },
  blackBg: {
    backgroundColor: GlobalStyles.Black,
  },
  cards: {
    alignSelf: "flex-end",
    flexDirection: "row",
    margin: 8,
    paddingRight: 4,

    width: "70%",
  },
  rowItem: {
    flexDirection: "column",
    width: "45%",
    paddingHorizontal: 4,
    alignItems: "flex-start",
    padding: 4,
  },
  revealImage: {
    height: 200,

    marginBottom: 16,
  },

  headerCard: {
    backgroundColor: GlobalStyles.Primary_Grey,
    margin: 6,
    borderWidth: 1,
  },
  rowView: {
    flexDirection: "row",
    width: "100%",
    gap: 2,
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  sectionImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },

  sectionText: {
    flex: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 18,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 22,

    marginBottom: 8,
  },

  bigText: {
    fontSize: 22,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
    lineHeight: 16,
  },
  button: {
    alignSelf: "start",
    paddingHorizontal: 8,
    marginVertical: 10,
    borderRadius: 4,
  },

  bordeR: {
    borderRadius: 12,
    overflow: "hidden",
  },
  bordeRSmall: {
    borderRadius: 4,
    overflow: "hidden",
  },
  button: {
    backgroundColor: GlobalStyles.Primary_Green,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.7,

    transform: [{ scale: 0.97 }],
  },
  paddingLg: {
    padding: 6,
  },
});
