import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { GlobalStyles } from "../Constants";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";
import { formatNumber } from "../Helpers";
import LargeSpinner from "./LargSpinner";

export default function ProductCardHome({
  Stylesy,
  isImageLoaded,
  setIsImageLoaded,

  data,
}) {
  const navigator = useNavigation();

  const seller = {
    directions: "Kigali/Gatsata/av2019",
  };

  const sellerId = data?.profileId;
  const {
    // data: seller,
    isPending,
    isError,
    error,
  } = useGetCurrentProfile(sellerId);

  return (
    <View
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
        <View>
          {!isImageLoaded ? (
            <ActivityIndicator
              size="small"
              style={{
                position: "absolute",
                alignSelf: "center",
              }}
            />
          ) : null}

          <Image
            onLoad={() => {
              setIsImageLoaded(true);
            }}
            source={
              data?.images?.length > 0
                ? { uri: data?.images[0] }
                : require("../assets/images/noImage.jpg")
            }
            style={[
              {
                width: "95%",
                marginHorizontal: "auto",
                height: 200,

                // iOS shadow
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 6,

                // Android shadow
                elevation: 8,

                borderRadius: 12,
              },
              styles.bordeR,
            ]}
          />
        </View>

        {data?.status ? (
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
            <Text style={styles.paragraph}>
              {data?.status ? "Active" : "Not-active"}
            </Text>
          </View>
        ) : null}

        {data?.images?.length > 0 ? (
          <View
            style={[
              {
                position: "absolute",
                top: 4,
                left: 50,
                borderRadius: 2,
                flexDirection: "row",
                gap: 2,
                backgroundColor: GlobalStyles.Primary_Grey4,
                alignContent: "center",
                color: "white",
                paddingHorizontal: 2,
              },
            ]}
          >
            <Ionicons
              name="images"
              size={10}
              color={"white"}
              style={{ alignSelf: "flex-end" }}
            />

            <Text style={{ color: "white", alignSelf: "flex-end" }}>
              {data?.images.length}
            </Text>
          </View>
        ) : null}
        {data?.name ? (
          <Text style={[styles.headerTitle, styles.bold, styles.smallMTop]}>
            {`${data?.name}`.length > 32
              ? `${data?.name}`.slice(0, 32)
              : `${data?.name}`}
          </Text>
        ) : null}
        <View
          style={[
            styles.row,
            {
              flexWrap: "wrap",
              width: "100%",
              gap: 12,
              paddingHorizontal: 4,
            },
          ]}
        >
          {data?.brand ? (
            <Text
              style={[
                styles.paragraph,
                styles.bordeRSmall,
                styles.paddingSm,

                { borderWidth: 1, marginVertical: 4, paddingHorizontal: 2 },
              ]}
            >
              {data?.brand}
            </Text>
          ) : null}
          {data?.model ? (
            <Text
              style={[
                styles.paragraph,
                styles.bordeRSmall,
                styles.paddingSm,
                { borderWidth: 1, marginVertical: 4, paddingHorizontal: 2 },
              ]}
            >
              {data?.model}
            </Text>
          ) : null}
          {data?.year ? (
            <Text
              style={[
                styles.paragraph,
                styles.bordeRSmall,
                styles.paddingSm,
                { borderWidth: 1, marginVertical: 4, paddingHorizontal: 2 },
              ]}
            >
              {data?.year}
            </Text>
          ) : null}
          {data?.more ? (
            <Text
              style={[
                styles.paragraph,
                styles.bordeRSmall,
                styles.paddingSm,
                { borderWidth: 1, marginVertical: 4, paddingHorizontal: 2 },
              ]}
            >
              {data?.more}
            </Text>
          ) : null}
        </View>

        {data?.price ? (
          <Text
            style={[
              styles.smallMVertical,
              styles.greenT,
              styles.bold,
              styles.bigText,
            ]}
          >
            {`${formatNumber(data?.price)} ${data?.currency}`}
          </Text>
        ) : null}

        {seller?.directions ? (
          <View
            style={[
              styles.smallT,
              {
                color: GlobalStyles.Primary_Green,
                flexDirection: "row",
                alignContent: "center",
              },
            ]}
          >
            <Ionicons
              name="location"
              size={20}
              style={{ alignSelf: "flex-end" }}
              color={GlobalStyles.Primary_Grey2}
            />
            <Text style={[{ alignSelf: "flex-end" }, styles.paragraph]}>
              {seller?.directions}
            </Text>
          </View>
        ) : null}
        <View
          style={[
            {
              backgroundColor: GlobalStyles.Primary_Yellow,
              width: "90%",
              alignSelf: "center",
              borderRadius: 4,
            },
            styles.smallMVertical,
            styles.paddingLg,
          ]}
        >
          <Button
            onPress={() => {
              navigator.navigate("Product", { productId: data?.id });
            }}
            content={<Text style={{ alignSelf: "center" }}>View Details</Text>}
          />
        </View>
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
    fontWeight:700,
  },
  sectionTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 22,

    marginBottom: 8,
  },

  bigText: {
    fontSize: 22,
    fontWeight: 800,
    fontFamily: "Roboto-bold",
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
