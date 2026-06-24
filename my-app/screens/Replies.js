import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import Span from "../Components/Span";

export default function ViewReplies ({ route, navigation }) {
  // Fallback test variables if context route params aren't passed yet
  const requestName = route?.params?.productName || "Suzuki right door";

  const placeholderOffers = [
    {
      id: "1",
      shopName: "Alcatraz Auto Parts Ltd",
      location: "Gatsata, Kigali",
      price: "320,000 Rwf",
      condition: "Used - Genuine OEM",
      phone: "+250788123456",
      notes: "We have it in silver color. Clean condition, no deep scratches.",
    },
    {
      id: "2",
      shopName: "Nyabugogo Spare Hub",
      location: "Nyabugogo",
      price: "380,000 Rwf",
      condition: "Brand New",
      phone: "+250788654321",
      notes:
        "Aftermarket import from Dubai. Comes with a 1-month installation check guarantee.",
    },
  ];

  return (
    <View style={styles.screenWrapper}>
      {/* Active Context Bar */}
      <View style={styles.topAlertBar}>
        <Text style={styles.contextSubText}>Replies for:</Text>
        <Text style={styles.contextTitleText}>{requestName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {placeholderOffers.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            {/* Header info strip inside offer card layout */}
            <View style={styles.rowBtn}>
              <View style={{ flex: 1 }}>
                <Text style={styles.shopNameText}>{offer.shopName}</Text>
                <View style={[styles.row, { gap: 4, marginTop: 2 }]}>
                  <Ionicons
                    name="location"
                    size={14}
                    color={GlobalStyles.Primary_Grey}
                  />
                  <Text style={styles.locationText}>{offer.location}</Text>
                </View>
              </View>
              <Span
                content={offer.condition}
                styles={[styles.bordeR, styles.conditionBadge]}
              />
            </View>

            {/* Middle body section detailing comments */}
            <Text style={styles.notesText}>"{offer.notes}"</Text>

            {/* Pricing Summary and Contact Row Actions Layout */}
            <View style={[styles.rowBtn, styles.borderTopSection]}>
              <View>
                <Text style={styles.priceLabel}>Offered Price</Text>
                <Text style={styles.priceValue}>{offer.price}</Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.callButton,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={() =>
                  Alert.alert("Calling...", `Dialing ${offer.phone}`)
                }
              >
                <Ionicons name="call" size={16} color="black" />
                <Text style={styles.callButtonText}>Contact Seller</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topAlertBar: {
    backgroundColor: GlobalStyles.Black || "#1A1A1A",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.Primary_Grey,
  },
  contextSubText: {
    color: GlobalStyles.Primary_Green || "#4CAF50",
    fontSize: 12,
    fontFamily: "Roboto-regular",
    textTransform: "uppercase",
  },
  contextTitleText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
    marginTop: 2,
  },
  scrollContent: {
    padding: 12,
    gap: 12,
  },
  offerCard: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  shopNameText: {
    fontSize: 16,
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
    color: "#222",
  },
  locationText: {
    fontSize: 13,
    color: "#666",
  },
  conditionBadge: {
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 11,
  },
  notesText: {
    fontFamily: "Roboto-Light",
    fontSize: 14,
    color: "#444",
    marginVertical: 12,
    fontStyle: "italic",
    lineHeight: 18,
  },
  borderTopSection: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 10,
    marginTop: 4,
  },
  priceLabel: {
    fontSize: 11,
    color: "#777",
    textTransform: "uppercase",
  },
  priceValue: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
    fontWeight: "700",
    color: GlobalStyles.Primary_Green || "green",
  },
  callButton: {
    backgroundColor: GlobalStyles.Primary_Yellow,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
  },
  callButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 14,
  },
  bordeR: { borderRadius: 6 },
});
