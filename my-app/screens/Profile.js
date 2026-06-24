import { View, Text, StyleSheet, ScrollView } from "react-native";
import Span from "../Components/Span";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import ProfileCard from "../Components/ProfileCard";
import Button from "../Components/Button";
import { useState } from "react";
import VerificationRow from "../Components/VerficaionRow";
import NoProductsProfile from "../Components/NoProductsProfile";
import ProfileOverView from "../Components/ProfileOverView";
import ProfileSelling from "../Components/ProfileSelling";
import ProfileBuying from "../Components/ProfileBuying";
export default function Profile() {
  const [isFilter, setIsFilter] = useState("overview");
  const data = { Listings: 0, sold: 0, rating: 4.8 };
  return (
    <ScrollView style={styles.paddingLg}>
      <View style={[styles.blackBg, styles.bordeR]}>
        <View
          style={[
            styles.row,
            styles.smallMVertical,
            styles.paddingSm,
            { gap: 10 },
          ]}
        >
          <Text
            style={{
              width: 50,
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              flexDirection: "column",
              height: 50,
              borderRadius: 1000,
              backgroundColor: GlobalStyles.Primary_Grey,
              borderColor: "white",
              borderWidth: 1,
            }}
          ></Text>
          <View>
            <Text style={[styles.bigText, styles.whiteT]}>Jean claude</Text>
            <View style={styles.row}>
              <Ionicons name="location" size={12} color={"white"} />
              <Text style={styles.whiteT}>Kigali,Rwanda</Text>
            </View>
            <Span
              content={"Buyer&Seller"}
              styles={[
                { backgroundColor: GlobalStyles.Primary_Yellow },
                styles.bordeR,
                styles.smallMVertical,
                styles.paddingSm,
              ]}
            />
          </View>
        </View>
        <View
          style={[
            styles.rowBtn,
            styles.smallMVertical,
            { paddingHorizontal: 10 },
          ]}
        >
          <ProfileCard data={data.Listings} label={"Products"} />
          <ProfileCard data={data.sold} label={"Requests"} />
          <ProfileCard
            data={data.rating}
            label={
              <Text>
                <Ionicons name="star" color={GlobalStyles.Primary_Grey} />{" "}
                Ratings
              </Text>
            }
          />
        </View>
      </View>
      <View
        style={[
          { backgroundColor: GlobalStyles.Primary_Grey3 },
          styles.row,
          styles.smallMVertical,
          styles.bordeR,
          styles.smallMTop,
          styles.paddingLg,
        ]}
      >
        <Button
          content={"Overview"}
          styles={[
            isFilter === "overview" && { backgroundColor: "white" },
            { height: 35 },
            styles.bordeR,
          ]}
          onPress={() => {
            setIsFilter("overview");
          }}
        />
        <Button
          content={"Selling"}
          styles={[
            isFilter === "selling" && { backgroundColor: "white" },
            { height: 35 },
            styles.bordeR,
          ]}
          onPress={() => {
            setIsFilter("selling");
          }}
        />
        <Button
          content={"Buying"}
          styles={[
            isFilter === "buying" && { backgroundColor: "white" },
            { height: 35 },
            styles.bordeR,
          ]}
          onPress={() => {
            setIsFilter("buying");
          }}
        />
      </View>
      {isFilter === "overview" && <ProfileOverView />}
      {isFilter === "selling" && <ProfileSelling />}
      {isFilter === "buying" && <ProfileBuying />}
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
    marginTop: 12,
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
  },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 8,
  },
  whiteT: {
    color: "white",
    fontFamily: "Roboto-Light",
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
    borderRadius: 6,
    overflow: "hidden",
  },
  paddingSm: {
    padding: 4,
  },
  paddingLg: {
    padding: 8,
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
