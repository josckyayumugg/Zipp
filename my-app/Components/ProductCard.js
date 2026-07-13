import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { GlobalStyles } from "../Constants";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({
  Data,
  Stylesy,
  isImageLoaded,
  setIsImageLoaded,
}) {
  const Navigotor = useNavigation();
  return (
    <Pressable
      onPress={() => {
        Navigotor.navigate("Product");
      }}
      style={[
        Stylesy,
        {
          borderColor: GlobalStyles.Primary_Grey,
          borderWidth: 1,
          padding: 4,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          position: "relative",
          // Android shadow
          elevation: 8,
         
        },
        styles.bordeR,
        styles.smallMVertical,
      ]}
    >
      <View style={[styles.bordeR, { paddingTop: 4 }]}>
        {!isImageLoaded && (
          <ActivityIndicator size="small" style={{ alignSelf: "center" }} />
        )}

        <Image
          source={require("../assets/images/cardoor.jpg")}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          style={{
            width: "100%",

            height: 80,
          }}
        />
        {Data.productStatus && (
          <View
            style={[
              {
                backgroundColor: GlobalStyles.Primary_Yellow,
                padding: 2,
                flexDirection: "column",
                alignSelf: "flex-start",
                position: "absolute",
                top: 0,
                left: 1,
                flexDirection: "row",
                textAlign: "center",

                alignSelf: "flex-start",
                justifyContent: "flex-start",
              },
              styles.bordeR,
            ]}
          >
            <Text>{Data.productStatus} </Text>
          </View>
        )}
        {Data.productImagesLength && (
          <Text
            style={[
              {
                position: "absolute",
                top: 65,
                left: 0,
                borderRadius: 2,
              
                backgroundColor: GlobalStyles.Primary_Grey4,
                alignContent: "center",
                color: "white",
                paddingHorizontal:2,
              },
            ]}
          >
            <Ionicons name="images" size={10} color={"white"} />{" "}
            {Data.productImagesLength}
          </Text>
        )}
        <Text style={[styles.paragraph, styles.bold, styles.smallMTop]}>
          {Data.productName}
        </Text>
        <View style={[styles.row, { flexWrap: "wrap" }, styles.smallMVertical]}>
          <Text
            style={[
              styles.smallT,
              styles.bordeR,
              styles.paddingSm,
              { borderWidth: 1 },
            ]}
          >
            {Data.carBrand && Data.carBrand}
          </Text>
          <Text
            style={[
              styles.smallT,
              styles.bordeR,
              styles.paddingSm,
              { borderWidth: 1 },
            ]}
          >
            {Data.carModal && Data.carModal}
          </Text>
          <Text
            style={[
              styles.smallT,
              styles.bordeR,
              styles.paddingSm,
              { borderWidth: 1 },
            ]}
          >
            {Data.carYear && Data.carYear}
          </Text>
        </View>
        {Data.price && (
          <Text
            style={[
              styles.smallMVertical,
              styles.headerTitle,
              styles.greenT,
              styles.bold,
            ]}
          >
            {Data.price}
            {Data?.currency}
          </Text>
        )}
        <Text
          style={[
            styles.row,
            styles.smallT,
            { color: GlobalStyles.Primary_Green },
          ]}
        >
          <Ionicons
            name="location"
            size={13}
            color={GlobalStyles.Primary_Grey2}
          />
          {Data.location}
        </Text>
      </View>
    </Pressable>
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
    textAlign: "center",
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
    marginTop: 50,
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

    backgroundColor: GlobalStyles.Primary_Grey,
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
});
