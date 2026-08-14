import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
export default function BecomeButton({
  styles,
  content,
  onPress,
  disable = false,
  styling,
}) {
  return (
    <Pressable
      disabled={disable}
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styless.pressed,
        { flex: 1 },
        styling,
      ]}
    >
      <View
        style={[
          styless.column,
          styless.paddingLg,
          styless.bordeR,
          styles,
          {
            alignItems: "center",
            backgroundColor: GlobalStyles.Primary_Green,

            justifyContent: "center",
          },
        ]}
      >
        <View
          style={[
            styless.paragraph,
            styless.bold,
            {
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignContent: "center",
            },
          ]}
        >
          <Ionicons
            style={{ alignSelf: "center" }}
            name={"lock-closed-sharp"}
            color={GlobalStyles.gold}
            size={16}
          />
          <Text style={[styless.bold, styless.smallText, styless.whiteT]}>
            Become a seller(Ba umucuruzi)
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    maxWidth: "100%",
    fontFamily: "notoSans",
  },
  container: { flex: 1, flexDirection: "column", padding: 6 },

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: 18,
    fontFamily: "Roboto-Light",
  },
  whiteText: {
    color: GlobalStyles.Primary_Grey,
  },
  yellow: {
    color: GlobalStyles.Primary_Yellow,
  },
  blackBg: {
    backgroundColor: "black",
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
  paddingLg: {
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 22,

    marginBottom: 8,
  },

  bigText: {
    fontSize: 20,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
    fontWeight: 700,
  },
  button: {
    alignSelf: "start",
    paddingHorizontal: 8,
    marginVertical: 10,
    borderRadius: 4,
  },
  blackBg: {
    backgroundColor: GlobalStyles.Black,
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
