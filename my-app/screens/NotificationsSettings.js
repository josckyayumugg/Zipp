import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";

export default function NotificationsSettings() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const [newMessages, setNewMessages] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [savedSearchAlerts, setSavedSearchAlerts] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const NotificationItem = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
  }) => (
    <View style={styles.item}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color={GlobalStyles.Primary_Green} />

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.title}>{title}</Text>

          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <Text style={styles.section}>Notification Methods</Text>

      <NotificationItem
        icon="phone-portrait-outline"
        title="Push Notifications"
        subtitle="Receive notifications on your device"
        value={pushNotifications}
        onValueChange={setPushNotifications}
      />

      <NotificationItem
        icon="mail-outline"
        title="Email Notifications"
        subtitle="Receive updates by email"
        value={emailNotifications}
        onValueChange={setEmailNotifications}
      />

      <NotificationItem
        icon="chatbubble-outline"
        title="SMS Notifications"
        subtitle="Receive text message alerts"
        value={smsNotifications}
        onValueChange={setSmsNotifications}
      />

      <Text style={styles.section}>Marketplace Activity</Text>

      <NotificationItem
        icon="chatbox-ellipses-outline"
        title="New Messages"
        subtitle="When buyers or sellers contact you"
        value={newMessages}
        onValueChange={setNewMessages}
      />

      <NotificationItem
        icon="people-outline"
        title="New Followers"
        subtitle="When someone follows your profile"
        value={newFollowers}
        onValueChange={setNewFollowers}
      />

      <NotificationItem
        icon="cube-outline"
        title="Product Updates"
        subtitle="Updates on your listed products"
        value={productUpdates}
        onValueChange={setProductUpdates}
      />

      <NotificationItem
        icon="search-outline"
        title="Saved Search Alerts"
        subtitle="New products matching saved searches"
        value={savedSearchAlerts}
        onValueChange={setSavedSearchAlerts}
      />

      <Text style={styles.section}>Marketing</Text>

      <NotificationItem
        icon="pricetag-outline"
        title="Promotions & Offers"
        subtitle="Special offers and announcements"
        value={promotions}
        onValueChange={setPromotions}
      />

      <Text style={styles.section}>Security</Text>

      <NotificationItem
        icon="shield-checkmark-outline"
        title="Security Alerts"
        subtitle="Password changes and account activity"
        value={securityAlerts}
        onValueChange={setSecurityAlerts}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  section: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
  },

  subtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});
