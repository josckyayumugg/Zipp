import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import Span from "../Components/Span";
import Button from "../Components/Button";
import { useGetSingleProductDeal } from "../_CustomHooks/ProductServices";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../Constants";
import LoadingPaging from "../Components/LoadingPaging";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 24; // Width of the image container accounting for screen padding

export default function DealPage() {
  const route = useRoute();
  const navigator = useNavigation();

  const dealId = route.params?.dealId;

  const {
    isPending: isPendingDeal,
    isError: isErrorDeal,
    data: dataDeal,
  } = useGetSingleProductDeal(dealId);

  // Tracks current slide index
  const [activeIndex, setActiveIndex] = useState(null);

  // Dynamically calculates which image index the user is viewing
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SLIDER_WIDTH);
    setActiveIndex(currentIndex);
  };

  if (isPendingDeal) {
    return <LoadingPaging />;
  }

  const images = dataDeal?.images || [];

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <ScrollView style={{ flexDirection: "column", padding: 12 }}>
        {/* IMAGE SLIDER CONTAINER */}
        <View style={styles.sliderContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false} // Hidden native bars since we use dots
            onScroll={handleScroll}
            scrollEventThrottle={16} // Standard frame rate throttle for fluid updates
          >
            {images.map((img, index) => (
              <TouchableOpacity key={index} activeOpacity={0.9}>
                <Image source={{ uri: img }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* DYNAMIC DOTS INDICATOR */}
          <View style={styles.paginationDotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* TITLE & TAGS */}
        <View style={styles.sectionContainer}>
          {dataDeal?.name && (
            <Text style={[styles.bigText, styles.bold]}>{dataDeal?.name}</Text>
          )}
          <View style={styles.tagRow}>
            {dataDeal?.brand && (
              <Span
                content={dataDeal?.brand}
                styles={[
                  styles.bordeR,
                  styles.paddingSm,
                  styles.smallT,
                  {
                    borderWidth: 1,
                    borderColor: GlobalStyles.Primary_Grey,
                    paddingHorizontal: 8,
                  },
                ]}
              />
            )}
            {dataDeal?.model && (
              <Span
                content={dataDeal?.model}
                styles={[
                  styles.bordeR,
                  styles.paddingSm,
                  styles.smallT,
                  {
                    borderWidth: 1,
                    borderColor: GlobalStyles.Primary_Grey,
                    paddingHorizontal: 8,
                  },
                ]}
              />
            )}
            {dataDeal?.year && (
              <Span
                content={dataDeal?.year}
                styles={[
                  styles.bordeR,
                  styles.paddingSm,
                  styles.smallT,
                  {
                    borderWidth: 1,
                    borderColor: GlobalStyles.Primary_Grey,
                    paddingHorizontal: 8,
                  },
                ]}
              />
            )}
            {dataDeal?.more && (
              <Span
                content={dataDeal?.more}
                styles={[
                  styles.bordeR,
                  styles.paddingSm,
                  styles.smallT,
                  {
                    borderWidth: 1,
                    borderColor: GlobalStyles.Primary_Grey,
                    paddingHorizontal: 8,
                  },
                ]}
              />
            )}
          </View>
        </View>

        {/* PRICE */}
        {dataDeal?.budget && (
          <View style={styles.sectionContainer}>
            <Text style={styles.headerTitle}>Budget</Text>
            <Text
              style={[
                styles.priceText,
                styles.bordeR,
                {
                  backgroundColor: GlobalStyles.Primary_Green2 || "#e1f5fe",
                  color: GlobalStyles.Primary_Green || "#007ecc",
                },
              ]}
            >
              {dataDeal?.budget}Kigali
            </Text>
          </View>
        )}

        {/* DESCRIPTION */}
        <View style={styles.sectionContainer}>
          {dataDeal?.description && (
            <Text style={styles.headerTitle}>Details</Text>
          )}
          <Text style={styles.paragraph}>{dataDeal?.description}</Text>
        </View>
        {dataDeal?.price ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.headerTitle}>Price</Text>
            <Text
              style={[styles.priceText, { color: GlobalStyles.Primary_Green }]}
            >
              {`${dataDeal?.price}(${dataDeal?.currency ? dataDeal?.currency : "RWF"})`}
            </Text>
          </View>
        ) : null}
      </ScrollView>

      {/* FIXED BOTTOM CONTACT BUTTON */}
      <View style={styles.bottomStickyContainer}>
        <TouchableOpacity
          style={styles.yellowContactBtn}
          // onPress={() => SetIsViewSeller((prev) => !prev)}
          onPress={() =>
            navigator.navigate("DealsContacts", {
              dealId: dataDeal?.id,
            })
          }
        >
          <Ionicons
            name={"eye-outline"}
            size={20}
            color="#000"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.contactBtnText}>
            {"Contact Seller / View Details"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#e9ecef",
  },
  image: {
    width: SLIDER_WIDTH,
    height: 300,
    resizeMode: "cover",
  },
  paginationDotsContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 20, // Expands active dot beautifully to look clean and premium
    backgroundColor: "white",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  sectionContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  priceText: {
    fontSize: 18,
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  sellerCard: {
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#e9ecef",
    backgroundColor: "white",
    marginBottom: 100,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f1f3f5",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomStickyContainer: {
    bottom: 0,
    left: 0,
    right: 0,

    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  yellowContactBtn: {
    backgroundColor: GlobalStyles.Primary_Yellow || "#ffc107",
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  contactBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto-semibold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallT: {
    fontFamily: "Roboto-regular",
    fontSize: 13,
    lineHeight: 18,
  },
  bold: {
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
  },
  greyT: {
    color: "#6c757d",
  },
  headerTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 6,
  },
  bigText: {
    fontSize: 22,
    fontFamily: "Roboto-Light",
    color: "#212529",
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 15,
    lineHeight: 22,
    color: "#343a40",
  },
  bordeR: {
    borderRadius: 6,
    overflow: "hidden",
  },
  paddingSm: {
    padding: 4,
  },
});
