import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import { useNavigation } from "@react-navigation/native";
import { useLogout } from "../_CustomHooks/Authentication";
import Button from "../Components/Button";

export default function SettingsPage() {
  const navigation = useNavigation();
  const { mutate, isError, isPending } = useLogout();

  function LogoutHandler() {
    mutate(undefined, {
      onSuccess: () => {
        console.log("succeded");
        navigation.navigate("login");
      },
    });
  }

  const SettingItem = ({ icon, title, subtitle, onPress }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        onPress();
      }}
    >
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color={GlobalStyles.Primary_Green} />

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{title}</Text>

          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={GlobalStyles.Primary_Grey}
      />
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <Text style={styles.section}>Account</Text>

      <SettingItem
        icon="person-outline"
        title="Edit Profile"
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      />

      <SettingItem
        icon="mail-outline"
        title="Email Address & Phone Number"
        subtitle="user@email.com"
        onPress={() => {
          navigation.navigate("EditAddress");
        }}
      />

      <SettingItem
        icon="lock-closed-outline"
        title="Change Password"
        onPress={() => {
          navigation.navigate("ChangePassword");
        }}
      />

      <Text style={styles.section}>Preferences</Text>

      <SettingItem
        icon="notifications-outline"
        title="Notifications"
        onPress={() => {
          navigation.navigate("NotificationsSettings");
        }}
      />

      <Text style={styles.section}>Support</Text>

      <SettingItem
        icon="help-circle-outline"
        title="Help Center"
        onPress={() => {
          navigation.navigate("Help");
        }}
      />

      <SettingItem
        icon="chatbox-ellipses-outline"
        title="Contact Us"
        onPress={() => {
          navigation.navigate("ContactUs");
        }}
      />

      <SettingItem
        icon="flag-outline"
        title="Report a Problem"
        onPress={() => {
          navigation.navigate("Report");
        }}
      />

      <Text style={styles.section}>Legal</Text>

      <SettingItem
        icon="document-text-outline"
        title="Terms & Conditions"
        onPress={() => {
          navigation.navigate("TermsAndConditions");
        }}
      />

      <SettingItem
        icon="shield-checkmark-outline"
        title="Privacy Policy"
        onPress={() => {
          navigation.navigate("Privacy");
        }}
      />

      <Button
        styles={styles.logout}
        onPress={() => {
          console.log("logout pressed");
          LogoutHandler();
        }}
        content={
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="log-out-outline" size={22} />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        }
      />
      <Text style={styles.version}>App Version 1.0.0</Text>
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

  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },

  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  version: {
    textAlign: "center",
    marginVertical: 20,
    color: "#999",
  },
});
