import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import Span from "../Components/Span";
import Button from "../Components/Button";
import { useGetSingleProduct } from "../_CustomHooks/ProductServices";
import { useRoute } from "@react-navigation/native";

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

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 24; // Width of the image container accounting for screen padding

export default function ProductPage() {
  const route = useRoute();
  const  productId  = route.params?.productId;
  const {
    isPending,
    isError,
    error,
    data: product,
  } = useGetSingleProduct(productId);

 console.log("ere",product)
  const data = {
    productImages: [1, 2, 3, 4, 5],
    About: ["Toyota", "Hilux", "2019", "AN120"],
    engine: "diesel",
    engineSize: "3.0L",
    transmission: "Automatic",
    driveType: "AWD",
    location: "Kigali/Gatsata",

    description:
      "It is a product that means that we can be the same kind of people and this is more than what we want and this will not be the same things again",
  };

  const [isViewSeller, SetIsViewSeller] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Tracks current slide index

  const images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1503602642458-232111445657",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  ];

  // Dynamically calculates which image index the user is viewing
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SLIDER_WIDTH);
    setActiveIndex(currentIndex);
  };

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
          <Text style={[styles.bigText, styles.bold]}>Toyota Front Bumper</Text>
          <View style={styles.tagRow}>
            {data.About.map((item, i) => (
              <Span
                key={i}
                content={item}
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
            ))}
          </View>
        </View>

        {/* PRICE */}
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
            300,000 Rwf
          </Text>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.sectionContainer}>
          <Text style={styles.headerTitle}>Description</Text>
          <Text style={styles.paragraph}>{data?.description}</Text>
        </View>

        {/* LOCATION */}
        <View style={[styles.sectionContainer, { marginBottom: 40 }]}>
          <Text style={styles.headerTitle}>Product Location</Text>
          <View style={styles.locationBadge}>
            <Ionicons
              name="location"
              size={16}
              color={GlobalStyles.Primary_Yellow || "#ffb300"}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.bold}>{data.location}</Text>
          </View>
        </View>

        {/* SELLER DETAILS */}
        {isViewSeller && (
          <View style={[styles.bordeR, styles.sellerCard]}>
            <Text style={styles.headerTitle}>About Seller</Text>
            <View
              style={[styles.row, { marginTop: 12, alignItems: "flex-start" }]}
            >
              <View style={styles.avatarPlaceholder}>
                <Ionicons
                  name="person"
                  size={30}
                  color={GlobalStyles.Primary_Grey}
                />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={[styles.paragraph, styles.bold]}>
                  Auto Parts Rwanda Ltd
                </Text>
                <Text style={[styles.smallT, styles.greyT]}>
                  Verified Seller
                </Text>
                <Text style={[styles.smallT, styles.greyT]}>
                  Member since Jan 2024
                </Text>
                <Text style={[styles.smallT, styles.greyT]}>
                  156 Listings Published
                </Text>
                <Text style={[styles.smallT, styles.greyT]}>
                  ⭐ 4.8 Seller Rating
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* FIXED BOTTOM CONTACT BUTTON */}
      <View style={styles.bottomStickyContainer}>
        <TouchableOpacity
          style={styles.yellowContactBtn}
          onPress={() => SetIsViewSeller((prev) => !prev)}
        >
          <Ionicons
            name={isViewSeller ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#000"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.contactBtnText}>
            {isViewSeller
              ? "Hide Seller Contact"
              : "Contact Seller / View Details"}
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
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
