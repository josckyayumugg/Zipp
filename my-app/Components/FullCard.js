import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import Span from "./Span";
import { formatNumber, getTimeRemaining } from "../Helpers";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function FullWidthStoryCard({
  item,
  handleNext,
  handlePrev,
  dataLength,
  setIsCreateDealOpen,
}) {
  console.log("kigali", item);
  const navigator = useNavigation();

  const { hours, minutes } = getTimeRemaining(item?.created_at);
  const numericAmount = formatNumber(item?.price);
  return (
    <Pressable
      onPress={() => {
        navigator.navigate("Deal", { dealId: item?.id });
      }}
    >
      <View style={styles.outerContainer}>
        <LinearGradient
          colors={["#442d14", "black", "#000000"]}
          locations={[0, 0.25, 0.6]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.cardGradient, { borderRadius: 8 }]}
        >
          {/* 1. BRAND NAME & STORY INDEX (LEFT-ALIGNED) */}
          <View style={styles.headerRow}>
            <View
              style={{
                flexDirection: "row",

                left: 0,
                top: 0,
              }}
            >
              <Ionicons name="time" color={"yellow"} size={20} />
              <Text style={styles.sectionT}>24 hrs deals</Text>
            </View>
            <Button
              onPress={() => {
                setIsCreateDealOpen(true);
              }}
              styles={{ alignSelf: "flex-end" }}
              content={
                <Ionicons
                  name={"add"}
                  color={GlobalStyles.Primary_Yellow}
                  size={30}
                />
              }
            />
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={
                  item?.images?.length > 0
                    ? { uri: item.images[0] }
                    : require("../assets/images/noImage.jpg")
                }
                style={[styles.productImage]}
              />
            </View>
            <View style={{ flexDirection: "column", width: "50%" }}>
              {item.description ? (
                <Text
                  style={[
                    styles.productTitle,

                    {
                      width: "100%",
                      alignSelf: "start",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      textAlign: "center",
                      fontFamily: "Roboto-italic",
                      fontSize: 14,
                    },
                  ]}
                >
                  "
                  {`${item?.description}`.length > 200
                    ? `${item?.description}`.slice(0, 200)
                    : `${item?.description}`}
                  "
                </Text>
              ) : null}
            </View>
          </View>

          {/* 3. PRODUCT NAME */}
          <View>
            {item?.name ? (
              <Text
                style={[
                  styles.bigText,
                  {
                    color: GlobalStyles.Primary_Yellow,
                    marginBottom: 4,
                    fontWeight: 600,
                    fontFamily: "Roboto-regular",
                  },
                ]}
              >
                {`${item?.name}`.length > 25
                  ? `${item?.name}`.slice(0, 25)
                  : `${item?.name}`}
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: 5,
                flexWrap: "wrap",
                flexDirection: "row",

                gap: 10,
              }}
            >
              {item?.brand ? (
                <Span
                  styles={[
                    {
                      shadowColor: "grey",
                      shadowOffset: 1,
                      borderColor: GlobalStyles.Primary_Grey5,
                      borderWidth: 1,
                      paddingHorizontal: 2,
                      borderRadius: 4,
                      backgroundColor: "white",
                    },
                  ]}
                  content={
                    <Text
                      style={{
                        color: "black",
                      }}
                    >
                      {item?.brand}
                    </Text>
                  }
                />
              ) : null}
              {item?.model ? (
                <Span
                  styles={[
                    {
                      shadowColor: "grey",
                      shadowOffset: 1,
                      borderColor: GlobalStyles.Primary_Grey5,
                      borderWidth: 1,
                      paddingHorizontal: 2,
                      borderRadius: 4,
                      backgroundColor: "white",
                    },
                  ]}
                  content={
                    <Text
                      style={{
                        color: "black",
                      }}
                    >
                      {item?.model}
                    </Text>
                  }
                />
              ) : null}

              {item?.year ? (
                <Span
                  styles={[
                    {
                      shadowColor: "grey",
                      shadowOffset: 1,
                      borderColor: GlobalStyles.Primary_Grey5,
                      borderWidth: 1,
                      paddingHorizontal: 2,
                      borderRadius: 4,
                      backgroundColor: "white",
                    },
                  ]}
                  content={
                    <Text
                      style={{
                        color: "black",
                      }}
                    >
                      {item?.year}
                    </Text>
                  }
                />
              ) : null}
              {item?.more ? (
                <Span
                  styles={[
                    {
                      shadowColor: "grey",
                      shadowOffset: 1,
                      borderColor: GlobalStyles.Primary_Grey5,
                      borderWidth: 1,
                      paddingHorizontal: 2,
                      borderRadius: 4,
                      backgroundColor: "white",
                    },
                  ]}
                  content={
                    <Text
                      style={{
                        color: "black",
                      }}
                    >
                      {item?.more}
                    </Text>
                  }
                />
              ) : null}
            </View>
          </View>
          {/* 4. HOURS REMAINING BADGE */}

          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>
              ⏱ {hours}:{minutes} hrs remaining
            </Text>
          </View>

          {/* 5. PRICE & NAVIGATION BUTTONS ROW */}
          <View style={styles.bottomRow}>
            {item?.price ? (
              <Text
                style={styles.priceText}
              >{`${numericAmount} ${item?.currency}`}</Text>
            ) : null}

            {/* Forward & Backward Buttons in the remaining space on the Right */}
            <View style={[styles.navControls]}>
              <TouchableOpacity
                style={styles.navButton}
                activeOpacity={0.7}
                onPress={handlePrev}
              >
                <Text style={styles.navArrowText}>‹</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navButton}
                activeOpacity={0.7}
                onPress={handleNext}
              >
                <Text style={styles.navArrowText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    width: "100%",
    alignSelf: "center",
    borderRadius: 4,
    paddingHorizontal: 2,
    overflow: "hidden",

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
  bigText: {
    fontSize: 20,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
    height: 120,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    overflow: "hidden",

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
  },
  timeBadge: {
    backgroundColor: "rgba(255, 102, 0, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,

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
    color: GlobalStyles.Primary_Green,
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
