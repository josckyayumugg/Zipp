import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";

import { GlobalStyles } from "../Constants";
import Header from "../Components/Header";
import InputText from "../Components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import Stats from "../Components/Stats";
import SpecialOffer from "../Components/SpecialOffer";
import Category from "../Components/Category";
import { ScrollView } from "react-native";
import Button from "../Components/Button";
import ProductCard from "../Components/ProductCard";
import SeeAll from "../Components/Seeall";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function Home() {
  const Navigation = useNavigation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const Data = [
    {
      id: 1,
      carBrand: "Toyota",
      productName: "Toyota Hilux front Bumper",
      carModal: "Hilux",
      price: "300 000 Rwf",
      location: "kigali Rwanda",
      carYear: "2019",
      productImagesLength: "5",
      productStatus: "used",
    },
    {
      id: 2,
      carBrand: "Toyota",
      productName: "Toyota Hilux front Bumper",
      carModal: "Hilux",
      price: "300 000 Rwf",
      location: "kigali Rwanda",
      carYear: "2019",
      productImagesLength: "5",
      productStatus: "used",
    },
    {
      id: 3,
      carBrand: "Toyota",
      productName: "Toyota Hilux front Bumper",
      carModal: "Hilux",
      price: "300 000 Rwf",
      location: "kigali Rwanda",
      carYear: "2019",
      productImagesLength: "5",
      productStatus: "used",
    },
    {
      id: 4,
      carBrand: "Toyota",
      productName: "Toyota Hilux front Bumper",
      carModal: "Hilux",
      price: "300 000 Rwf",
      location: "kigali Rwanda",
      carYear: "2019",
      productImagesLength: "5",
      productStatus: "used",
    },
    {
      id: 5,
      carBrand: "Toyota",
      productName: "Toyota Hilux front Bumper",
      carModal: "Hilux",
      price: "300 000 Rwf",
      location: "kigali Rwanda",
      carYear: "2019",
      productImagesLength: "5",
      productStatus: "used",
    },
    {
      id: 6,
      carBrand: "Toyota",
      productName: "Toyota Hilux front Bumper",
      carModal: "Hilux",
      price: "300 000 Rwf",
      location: "kigali Rwanda",
      carYear: "2019",
      productImagesLength: "5",
      productStatus: "used",
    },
    {
      id: 7,
      carBrand: "Toyota",
      productName: "Toyota Hilux front Bumper",
      carModal: "Hilux",
      price: "300 000 Rwf",
      location: "kigali Rwanda",
      carYear: "2019",
      productImagesLength: "5",
      productStatus: "used",
    },
  ];
  return (
    <ScrollView style={[{ padding: 6 }, styles.container]}>
      <View
        style={[styles.blackBg, { paddingVertical: 8, paddingHorizontal: 8 }]}
      >
        <View
          style={[
            styles.row,
            styles.bordeR,
            styles.smallMVertical,
            {
              borderColor: GlobalStyles.Primary_Grey,
              borderWidth: 1,
              backgroundColor: "white",
            },
          ]}
        >
          <Ionicons name="search" size={13} />

          <InputText
            placeholder={"Search parts,brands,models"}
            styles={[styles.bordeR, styles.paddingSm, { width: "100%" }]}
          />

          <Button content={"Search"} />
        </View>
      </View>
      <SpecialOffer />
      <View style={{ marginVertical: 4 }}>
        <View style={styles.row}>
          <Text style={styles.headerTitle}>Categories</Text>
          <SeeAll isImageLoaded={isImageLoaded} />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Category
            onPress
            name="Engine"
            icon="cog-outline"
            searchQuery={[
              "engine",
              "moteri",
              "moteli",
              "moteur",
              "motor",
              "imashini",
              "imoteri",
            ]}
          />
          <Category
            name="brakes(feri)"
            icon="disc-outline"
            searchQuery={[
              "feri",
              "feli",
              "fer",
              "brakes",
              "fire",
              "file",
              "fil",
            ]}
          />
          <Category
            name="Lighting"
            icon="bulb"
            searchQuery={["amatara", "ampule", "ampoule", "itara"]}
          />
          <Category
            name="suspension"
            icon="build-outline"
            searchQuery={["morotiseri"]}
          />
          <Category
            name="Electrical"
            icon="logo-electron"
            searchQuery={["electricity"]}
          />
          <Category name="Others" icon="car-outline" searchQuery={"Others"} />
        </ScrollView>
        <View style={[styles.row, styles.largeMTop]}>
          <Text style={[styles.headerTitle, { flexDirection: "row" }]}>
            <Ionicons name="trending-up-outline" size={18} /> Trending
          </Text>
          <SeeAll isImageLoaded={isImageLoaded} searchQuery={"Recents"} />
        </View>
        <FlatList
          horizontal
          data={Data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              Data={item}
              Stylesy={{ height: 240, width: 170, marginHorizontal: 4 }}
              isImageLoaded={isImageLoaded}
              setIsImageLoaded={setIsImageLoaded}
            />
          )}
        />
        <View>
          <View style={[styles.row, styles.largeMTop]}>
            <Text style={[styles.headerTitle, { flexDirection: "row" }]}>
              <Ionicons name="trending-up-outline" size={18} /> New Products
            </Text>
            <SeeAll
              isImageLoaded={isImageLoaded}
              searchQuery={"New Products"}
            />
          </View>

          <FlatList
            horizontal
            data={Data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                Data={item}
                Stylesy={{ height: 300, width: 120, marginHorizontal: 4 }}
                isImageLoaded={isImageLoaded}
                setIsImageLoaded={setIsImageLoaded}
              />
            )}
          />
        </View>
        <View>
          <View style={[styles.row, styles.largeMTop]}>
            <Text style={[styles.headerTitle, { flexDirection: "row" }]}>
              <Ionicons name="disc-outline" size={18} />
              Brakes(Feri)
            </Text>
            <SeeAll isImageLoaded={isImageLoaded} searchQuery={"brakes"} />
          </View>
          <FlatList
            horizontal
            data={Data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                Data={item}
                Stylesy={{ height: 300, width: 120, marginHorizontal: 4 }}
                isImageLoaded={isImageLoaded}
                setIsImageLoaded={setIsImageLoaded}
              />
            )}
          />
        </View>
        <View>
          <View style={[styles.row, styles.largeMTop]}>
            <Text style={[styles.headerTitle, { flexDirection: "row" }]}>
              <Ionicons name="bulb-outline" size={18} />
              Light
            </Text>
            <SeeAll isImageLoaded={isImageLoaded} searchQuery={"light"} />
          </View>
          <FlatList
            horizontal
            data={Data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                Data={item}
                Stylesy={{ height: 300, width: 120, marginHorizontal: 4 }}
                isImageLoaded={isImageLoaded}
                setIsImageLoaded={setIsImageLoaded}
              />
            )}
          />
        </View>
      </View>
      <View
        style={[
          styles.bordeR,
          styles.padding,
          { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
        ]}
      >
        <Text style={[styles.headerTitle, { flexDirection: "row" }]}>
          <Ionicons name={"bar-chart-outline"} size={18} />
          Statics
        </Text>
        <Stats yourProducts={0} requests={0} today={0} />
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
    fontSize: 24,
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
    fontSize: 16,
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
