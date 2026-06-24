import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../Constants";
import InputText from "../Components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import Picked from "../Components/Picker";
import Button from "../Components/Button";
import ProductCard from "../Components/ProductCard";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";

export default function Search() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const route = useRoute();
  const source = route.params?.source;
  const query = route.params?.query;
  const Data = [
    {
      productStatus: "used",
      productImage: "",
      productImagesLength: "",
      productName: "Toyota Hilux front Bumper",

      Brand: "Toyota",
      modal: "Hilux",
      Year: "2019",
      location: "kigali Rwanda",
      productPrice: "400 000",
    },
    {
      productStatus: "refubrshed",
      productImage: "",
      productImagesLength: "",
      productName: "Toyota lights",

      carBrand: "Toyota",
      carModal: "Hilux",
      carYear: "2019",
      location: "kigali Rwanda",
      productPrice: "400 000",
    },
    {
      productStatus: "used",
      productImage: "",
      productImagesLength: "",
      productName: "Toyota Hilux",

      carBrand: "Toyota",
      carModal: "Hilux",
      carYear: "2019",
      location: "kigali Rwanda",
      productPrice: "400 000",
    },
    {
      productStatus: "used",
      productImage: "",
      productImagesLength: "",
      productName: "Toyota Hilux",

      carBrand: "Toyota",
      carModal: "Hilux",
      carYear: "2019",
      location: "kigali Rwanda",
      productPrice: "400 000",
    },
    {
      productStatus: "used",
      productImage: "",
      productImagesLength: "",
      productName: "Toyota Hilux",

      carBrand: "Toyota",
      carModal: "Hilux",
      carYear: "2019",
      location: "kigali Rwanda",
      productPrice: "400 000",
    },
    {
      productStatus: "used",
      productImage: "",
      productImagesLength: "",
      productName: "Toyota Hilux",

      carBrand: "Toyota",
      carModal: "Hilux",
      carYear: "2019",
      location: "kigali Rwanda",
      productPrice: "400 000",
    },
  ];
  return (
    <ScrollView style={{ padding: 4 }}>
      <View
        style={[
          styles.row,
          styles.bordeR,
          styles.smallMVertical,
          { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
        ]}
      >
        <Ionicons name="search" size={20} />

        <InputText
          placeholder={"Search parts,brands,models"}
          styles={[styles.bordeR, styles.paddingSm, { width: "100%" }]}
        />

        <Button content={"Search"} />
      </View>
      <View style={styles.row}>
        <Text style={styles.paragraph}>
          {Array.isArray(query) ? query[0] : query}
        </Text>

        <Picked options={["Oldest", "New"]} />
      </View>
      <View style={styles.smallMVertical}>
        <View style={[{ flexWrap: "wrap" }, styles.row]}>
          {Data.map((item, i) => (
            <ProductCard
              Data={item}
              key={i}
              Stylesy={{ width: "32%" }}
              isImageLoaded={isImageLoaded}
              setIsImageLoaded={setIsImageLoaded}
            />
          ))}
        </View>
      </View>
    </ScrollView>
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
  rowBtn: {
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
    color: GlobalStyles.Primary_Yellow,
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
    fontSize: 20,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 20,
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
