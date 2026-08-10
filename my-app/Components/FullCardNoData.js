import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import Span from "./Span";
import { formatNumber, getTimeRemaining } from "../Helpers";
import NoProductsProfile from "./NoProductsProfile";
import { queryClient } from "../App";
import { ActivityIndicator } from "react-native";

export default function FullWidthNoData({
  item,
  dataLength,
  isLoading,
  setIsVisible,
  isPending,
}) {
  const navigator = useNavigation();
  console.log(20, dataLength);
  const { hours, minutes } = getTimeRemaining(item?.createdAt);
  const numericAmount = formatNumber(item?.price);
  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={["#442d14", "#302d0a", "#000000"]}
        locations={[0, 0.25, 0.6]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.cardGradient}
      >
        {/* 1. BRAND NAME & STORY INDEX (LEFT-ALIGNED) */}
        <View
          style={{
            height: 80,
            flexDirection: "column",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-bold",
              color: GlobalStyles.Primary_Yellow,
              marginHorizontal: "auto",
            }}
          >
            !! No Deals Available
          </Text>
          <Button
            content={
              isPending ? <ActivityIndicator size={"small"} /> : "Try again"
            }
            onPress={() => {
              queryClient.invalidateQueries({
                queryKey: ["allDeals"],
              });
            }}
            styles={{
              borderRadius: GlobalStyles.Primary_Yellow,
              borderWidth: 1,
              backgroundColor: GlobalStyles.Primary_Yellow,
              color: "white",
              padding: 4,

              borderRadius: 4,
            }}
          />
          <Button
            content={
              isLoading ? <ActivityIndicator size={"small"} /> : "+Add deal"
            }
            onPress={() => {
              setIsVisible(true);
            }}
            styles={{
              borderRadius: GlobalStyles.Primary_Yellow,
              borderWidth: 1,
              backgroundColor: GlobalStyles.Primary_Yellow,
              color: "white",
              padding: 4,

              borderRadius: 4,
              alignSelf: "flex-end",
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    width: "100%",

    alignSelf: "center",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: GlobalStyles.Primary_Yellow,
    overflow: "hidden",
    marginVertical: 4,
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    padding: 18,
    alignItems: "flex-start", // All items strictly aligned to the LEFT (start)
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 12,
  },
  sectionT: {
    color: GlobalStyles.Primary_Yellow,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontStyle: "italic",
  },
  indexText: {
    color: "#8E8E93",
    fontSize: 12,
    fontFamily: "Roboto-Light",
    fontWeight: "600",
  },
  imageContainer: {
    width: "55%",
    height: 100,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
    fontFamily: "Roboto-bold",
    marginBottom: 8,
  },
  timeBadge: {
    backgroundColor: "rgba(255, 102, 0, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 14,
    borderWidth: 0.8,
    borderColor: "rgba(255, 102, 0, 0.4)",
  },
  timeText: {
    color: GlobalStyles.Primary_Yellow,
    fontSize: 12,
    fontFamily: "Roboto-semibold",
    fontWeight: "600",
    textAlign: "left",
  },

  /* Bottom Row: Price + Right Nav Controls */
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  priceText: {
    color: GlobalStyles.Primary_Yellow,
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "Roboto-bold",
    textAlign: "left",
  },
  navControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Space between prev & next buttons
  },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255, 102, 0, 0.15)",
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  navArrowText: {
    color: GlobalStyles.Primary_Yellow,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -2,
  },
});
