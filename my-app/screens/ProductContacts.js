import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";

export default function ProductContacts({ route, navigation }) {
  // Grab product data from route params or fallback to default seller details
  const { product } = route.params || {};

  const productTitle = product?.title || "Toyota Front Bumper";
  const productPrice = product?.price || "300 000 Rwf";
  const productLocation = product?.location || "Kigali/Gatsata";

  const sellerInfo = {
    name: "Auto Parts Rwanda Ltd",
    rating: "4.8",
    listings: 156,
    memberSince: "January 2024",
    phone: "+250 788 123 456",
    email: "sales@autoparts.rw",
    website: "www.autoparts.rw",
    hours: "Mon - Sat, 8AM - 6PM",
  };

  const handleCall = () => {
    Linking.openURL(`tel:${sellerInfo.phone.replace(/\s+/g, "")}`).catch(() => {
      Alert.alert("Error", "Unable to open phone dialer");
    });
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${sellerInfo.email}`).catch(() => {
      Alert.alert("Error", "Unable to open email client");
    });
  };

  const handleWebsite = () => {
    const url = sellerInfo.website.startsWith("http")
      ? sellerInfo.website
      : `https://${sellerInfo.website}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable to open browser");
    });
  };

  const handleWhatsApp = () => {
    const formattedPhone = sellerInfo.phone.replace(/\+/g, "").replace(/\s+/g, "");
    Linking.openURL(`https://wa.me/${formattedPhone}`).catch(() => {
      Alert.alert("Error", "Unable to open WhatsApp");
    });
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${productLocation}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`).catch(() => {
      Alert.alert("Error", "Unable to open maps");
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Product Context Banner */}
      <View style={styles.productBanner}>
        <View style={styles.productBannerIcon}>
          <Ionicons name="cart-outline" size={24} color={GlobalStyles.Primary_Yellow} />
        </View>
        <View style={styles.productBannerTextContainer}>
          <Text style={styles.productBannerLabel}>Inquiring about</Text>
          <Text style={styles.productBannerTitle}>{productTitle}</Text>
          <Text style={styles.productBannerPrice}>{productPrice}</Text>
        </View>
      </View>

      {/* Seller Header Card */}
      <View style={styles.card}>
        <View style={styles.sellerHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color={GlobalStyles.Primary_Grey} />
          </View>
          <View style={styles.sellerHeaderText}>
            <Text style={styles.sellerName}>{sellerInfo.name}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="white" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
              <Text style={styles.ratingText}>⭐ {sellerInfo.rating}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sellerStatsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statVal}>{sellerInfo.listings}</Text>
            <Text style={styles.statLbl}>Listings</Text>
          </View>
          <View style={styles.statColDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statVal}>{sellerInfo.memberSince.split(" ")[1]}</Text>
            <Text style={styles.statLbl}>Joined</Text>
          </View>
        </View>
      </View>

      {/* Product Location Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Product Location & Address</Text>
        <View style={styles.infoRow}>
          <View style={[styles.infoIconContainer, { backgroundColor: GlobalStyles.Primary_Yellow2 }]}>
            <Ionicons name="location" size={20} color={GlobalStyles.Secondary_Yellow} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{productLocation}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.directionsBtn} onPress={handleDirections}>
          <Ionicons name="map-outline" size={16} color="black" />
          <Text style={styles.directionsBtnText}>Get Directions on Map</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Details Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Seller Contact Information</Text>
        
        <TouchableOpacity style={styles.infoRow} onPress={handleCall}>
          <View style={[styles.infoIconContainer, { backgroundColor: '#e8f5e9' }]}>
            <Ionicons name="call" size={20} color={GlobalStyles.Primary_Green} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={[styles.infoValue, styles.linkText]}>{sellerInfo.phone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow} onPress={handleEmail}>
          <View style={[styles.infoIconContainer, { backgroundColor: '#e3f2fd' }]}>
            <Ionicons name="mail" size={20} color="#1976d2" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={[styles.infoValue, styles.linkText]}>{sellerInfo.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow} onPress={handleWebsite}>
          <View style={[styles.infoIconContainer, { backgroundColor: '#f3e5f5' }]}>
            <Ionicons name="globe" size={20} color="#7b1fa2" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Website</Text>
            <Text style={[styles.infoValue, styles.linkText]}>{sellerInfo.website}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        <View style={styles.infoRow}>
          <View style={[styles.infoIconContainer, { backgroundColor: '#fff8e1' }]}>
            <Ionicons name="time" size={20} color="#ffb300" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Available Hours</Text>
            <Text style={styles.infoValue}>{sellerInfo.hours}</Text>
          </View>
        </View>
      </View>

      {/* Quick Action Buttons */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: GlobalStyles.Primary_Green }]} onPress={handleCall}>
          <Ionicons name="call-outline" size={20} color="white" />
          <Text style={styles.actionButtonText}>Call Seller</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#25D366" }]} onPress={handleWhatsApp}>
          <Ionicons name="logo-whatsapp" size={20} color="white" />
          <Text style={styles.actionButtonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  productBanner: {
    flexDirection: "row",
    backgroundColor: "#1F1F22",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 16,
  },
  productBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f6cf0c1a",
    justifyContent: "center",
    alignItems: "center",
  },
  productBannerTextContainer: {
    flex: 1,
  },
  productBannerLabel: {
    fontFamily: "Roboto-Light",
    fontSize: 12,
    color: "#aaa",
    textTransform: "uppercase",
  },
  productBannerTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 16,
    color: "white",
    marginTop: 2,
  },
  productBannerPrice: {
    fontFamily: "Roboto-bold",
    fontSize: 15,
    color: GlobalStyles.Primary_Yellow,
    marginTop: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sellerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  sellerHeaderText: {
    flex: 1,
  },
  sellerName: {
    fontFamily: "Roboto-bold",
    fontSize: 18,
    color: "#222",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#2e7d32",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  verifiedText: {
    fontFamily: "Roboto-regular",
    fontSize: 11,
    color: "white",
  },
  ratingText: {
    fontFamily: "Roboto-semibold",
    fontSize: 12,
    color: "#666",
  },
  sellerStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  statCol: {
    alignItems: "center",
  },
  statVal: {
    fontFamily: "Roboto-bold",
    fontSize: 16,
    color: "#333",
  },
  statLbl: {
    fontFamily: "Roboto-Light",
    fontSize: 11,
    color: "#777",
    marginTop: 2,
  },
  statColDivider: {
    width: 1,
    backgroundColor: "#eee",
  },
  sectionTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 16,
    color: "#111",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#fafafa",
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: "Roboto-Light",
    fontSize: 11,
    color: "#888",
  },
  infoValue: {
    fontFamily: "Roboto-semibold",
    fontSize: 14,
    color: "#333",
    marginTop: 2,
  },
  linkText: {
    color: "#1976d2",
  },
  directionsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.Primary_Yellow,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  directionsBtnText: {
    fontFamily: "Roboto-semibold",
    fontSize: 14,
    color: "black",
  },
  quickActionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  actionButtonText: {
    fontFamily: "Roboto-bold",
    fontSize: 15,
    color: "white",
  },
});
