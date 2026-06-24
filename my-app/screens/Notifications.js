import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";


export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      title: "Reservation Confirmed",
      message: "Your Toyota bumper has been reserved for 30 minutes.",
      icon: "time-outline",
      time: "2 min ago",
      unread: true,
    },
    {
      id: "2",
      title: "New Message",
      message: "Auto Parts Rwanda replied to your inquiry.",
      icon: "chatbubble-outline",
      time: "10 min ago",
      unread: true,
    },
    {
      id: "3",
      title: "Price Updated",
      message: "Toyota Hilux Headlight dropped from 120,000 to 95,000 RWF.",
      icon: "pricetag-outline",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: "4",
      title: "Product Approved",
      message: "Your listing is now visible to buyers.",
      icon: "checkmark-circle-outline",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.notification,
              item.unread && styles.unreadNotification,
            ]}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={GlobalStyles.Primary_Yellow}
            />

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            {item.unread && <View style={styles.dot} />}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  notification: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  unreadNotification: {
    backgroundColor: "#fff9e8",
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  message: {
    marginTop: 4,
    color: "#666",
  },

  time: {
    marginTop: 6,
    fontSize: 12,
    color: "#999",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f4b400",
    marginTop: 6,
  },
});
