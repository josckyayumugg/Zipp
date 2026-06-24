import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import Button from "../Components/Button";

const CATEGORIES = [
  "General Inquiry",
  "Account Issue",
  "Verification Issue",
  "Bug Report",
  "Feature Request",
  "Other",
];

export default function ContactUs() {
  const [selectedCategory, setSelectedCategory] = useState("General Inquiry");

  const [message, setMessage] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <Text style={styles.subtitle}>
        Need help? Send us a message and our team will get back to you.
      </Text>

      {/* Category */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Category</Text>

        {CATEGORIES.map((item) => (
          <Pressable
            key={item}
            style={styles.optionRow}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={styles.optionText}>{item}</Text>

            <Ionicons
              name={
                selectedCategory === item
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={GlobalStyles.Primary_Green}
            />
          </Pressable>
        ))}
      </View>

      {/* Message */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Message</Text>

        <TextInput
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder="Describe your issue or question..."
          style={styles.textArea}
        />
      </View>

      {/* Attachment */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Attachment</Text>

        <Pressable style={styles.uploadBox}>
          <Ionicons
            name="cloud-upload-outline"
            size={28}
            color={GlobalStyles.Primary_Grey}
          />

          <Text style={styles.uploadText}>Upload Screenshot (Optional)</Text>
        </Pressable>
      </View>

      {/* Support Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Support Information</Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="mail-outline"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.infoText}>support@yourapp.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.infoText}>Response within 24-48 hours</Text>
        </View>
      </View>

      <Button
        content="Send Message"
        styles={styles.submitBtn}
        onPress={() => {
          console.log({
            category: selectedCategory,
            message,
          });
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontFamily: "Roboto-Extrabold",
    marginBottom: 8,
  },

  subtitle: {
    color: GlobalStyles.Primary_Grey,
    marginBottom: 20,
    fontFamily: "Roboto-Light",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: "Roboto-semibold",
    marginBottom: 10,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionText: {
    fontFamily: "Roboto-Light",
  },

  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: GlobalStyles.Primary_Grey,
    borderRadius: 8,
    paddingVertical: 30,
    alignItems: "center",
  },

  uploadText: {
    marginTop: 10,
    color: GlobalStyles.Primary_Grey,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },

  infoText: {
    fontFamily: "Roboto-Light",
  },

  submitBtn: {
    height: 50,
  },
});
