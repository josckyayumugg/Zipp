import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import Button from "../Components/Button";

const REPORT_TYPES = [
  "Product Listing",
  "User/Seller",
  "Message",
  "Request",
  "Other",
];

const REPORT_REASONS = [
  "Scam or Fraud",
  "Fake Product",
  "Counterfeit Item",
  "Spam",
  "Harassment",
  "Misleading Information",
  "Prohibited Item",
  "Other",
];

export default function ReportScreen() {
  const [reportType, setReportType] = useState("Product Listing");
  const [reason, setReason] = useState("Scam or Fraud");
  const [description, setDescription] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report Content</Text>

      <Text style={styles.subtitle}>
        Help us keep the marketplace safe by reporting suspicious activity.
      </Text>

      {/* What are you reporting */}
      <View style={styles.section}>
        <Text style={styles.label}>What are you reporting?</Text>

        {REPORT_TYPES.map((item) => (
          <Pressable
            key={item}
            style={styles.optionRow}
            onPress={() => setReportType(item)}
          >
            <Text style={styles.optionText}>{item}</Text>

            <Ionicons
              name={
                reportType === item ? "radio-button-on" : "radio-button-off"
              }
              size={20}
              color={GlobalStyles.Primary_Green}
            />
          </Pressable>
        ))}
      </View>

      {/* Reason */}
      <View style={styles.section}>
        <Text style={styles.label}>Reason</Text>

        {REPORT_REASONS.map((item) => (
          <Pressable
            key={item}
            style={styles.optionRow}
            onPress={() => setReason(item)}
          >
            <Text style={styles.optionText}>{item}</Text>

            <Ionicons
              name={reason === item ? "radio-button-on" : "radio-button-off"}
              size={20}
              color={GlobalStyles.Primary_Green}
            />
          </Pressable>
        ))}
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.label}>Additional Details</Text>

        <TextInput
          multiline
          placeholder="Describe the issue..."
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
        />
      </View>

      {/* Screenshot Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>Evidence</Text>

        <Pressable style={styles.uploadBox}>
          <Ionicons
            name="cloud-upload-outline"
            size={28}
            color={GlobalStyles.Primary_Grey}
          />

          <Text style={styles.uploadText}>Upload Screenshot</Text>
        </Pressable>
      </View>

      {/* Submit */}
      <Button
        content="Submit Report"
        styles={styles.submitBtn}
        onPress={() => {
          console.log({
            reportType,
            reason,
            description,
          });
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontFamily: "Roboto-Extrabold",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    color: GlobalStyles.Primary_Grey,
    fontFamily: "Roboto-Light",
  },

  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },

  label: {
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
    fontSize: 14,
    fontFamily: "Roboto-Light",
  },

  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontFamily: "Roboto-Light",
  },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: GlobalStyles.Primary_Grey,
    borderRadius: 8,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  uploadText: {
    marginTop: 10,
    color: GlobalStyles.Primary_Grey,
    fontFamily: "Roboto-Light",
  },

  submitBtn: {
    marginTop: 10,
    height: 50,
  },
});
