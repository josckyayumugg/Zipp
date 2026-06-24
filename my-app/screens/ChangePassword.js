import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    // Supabase password update here

    Alert.alert("Success", "Password changed successfully");
  };

  const PasswordField = ({
    label,
    value,
    onChangeText,
    secureTextEntry,
    toggleVisibility,
  }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          placeholder={label}
        />

        <Pressable onPress={toggleVisibility}>
          <Ionicons
            name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
            size={22}
            color="#888"
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>

      <PasswordField
        label="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={!showCurrent}
        toggleVisibility={() => setShowCurrent(!showCurrent)}
      />

      <PasswordField
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={!showNew}
        toggleVisibility={() => setShowNew(!showNew)}
      />

      <PasswordField
        label="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirm}
        toggleVisibility={() => setShowConfirm(!showConfirm)}
      />

      <Text style={styles.note}>
        Password must be at least 8 characters long.
      </Text>

      <Pressable style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    height: 50,
  },

  note: {
    marginTop: 10,
    color: "#666",
    fontSize: 13,
  },

  button: {
    marginTop: 30,
    backgroundColor: GlobalStyles.Primary_Green,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
