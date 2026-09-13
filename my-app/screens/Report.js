import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";

const REPORT_TYPES = [
  {
    label: "Product Listing",
    icon: "cube-outline",
    proof:
      "Product name/link, screenshot of the listing, and what's wrong with it.",
  },
  {
    label: "User / Seller",
    icon: "person-outline",
    proof:
      "Seller's name or profile, and any messages or evidence of the issue.",
  },
  {
    label: "Message",
    icon: "chatbubble-outline",
    proof:
      "Screenshot of the conversation, with sender name and approximate date/time.",
  },
  {
    label: "Request",
    icon: "document-text-outline",
    proof: "Request title/link and a description of the problem.",
  },
  {
    label: "Other",
    icon: "ellipsis-horizontal-circle-outline",
    proof: "A clear description of the issue and any supporting screenshots.",
  },
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
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerIconWrap}>
        <Ionicons
          name="shield-checkmark-outline"
          size={40}
          color={GlobalStyles.Primary_Green}
        />
      </View>

      <Text style={styles.title}>Report a Problem</Text>

      <Text style={styles.subtitle}>
        We take marketplace safety seriously. To report a listing, seller,
        message, or request, please reach out to us through the Contact Us page
        so our team can review it directly.
      </Text>

      {/* What you can report */}
      <View style={styles.section}>
        <Text style={styles.label}>What you can report</Text>
        <Text style={styles.helperText}>
          Let us know which category your report falls under, and include the
          proof listed below so we can act on it quickly.
        </Text>

        {REPORT_TYPES.map((item) => (
          <View key={item.label} style={styles.typeRow}>
            <View style={styles.typeIconWrap}>
              <Ionicons
                name={item.icon}
                size={20}
                color={GlobalStyles.Primary_Green}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.typeLabel}>{item.label}</Text>
              <Text style={styles.typeProof}>Include: {item.proof}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Common reasons */}
      <View style={styles.section}>
        <Text style={styles.label}>Common reasons for reporting</Text>
        <View style={styles.reasonWrap}>
          {REPORT_REASONS.map((reason) => (
            <View key={reason} style={styles.reasonChip}>
              <Text style={styles.reasonChipText}>{reason}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* What to include for proof */}
      <View style={styles.section}>
        <Text style={styles.label}>To help us investigate faster</Text>
        <View style={styles.tipRow}>
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.tipText}>
            Mention the report type and reason from the lists above.
          </Text>
        </View>
        <View style={styles.tipRow}>
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.tipText}>
            Attach screenshots as proof whenever possible.
          </Text>
        </View>
        <View style={styles.tipRow}>
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.tipText}>
            Include names, product links, or dates/times if relevant.
          </Text>
        </View>
      </View>

      <Button
        content="Go to Contact Us"
        styles={[styles.contactBtn, styles.borderR]}
        onPress={() => navigation.navigate("ContactUs")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  borderR: {
    borderRadius: 8,
  },
  headerIconWrap: {
    alignSelf: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontFamily: "Roboto-Extrabold",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    color: GlobalStyles.Primary_Grey2,
    fontFamily: "Roboto-Light",
    textAlign: "center",
    lineHeight: 20,
  },

  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
  },

  label: {
    fontSize: 16,
    fontFamily: "Roboto-semibold",
    marginBottom: 6,
  },

  helperText: {
    fontSize: 13,
    fontFamily: "Roboto-Light",
    color: GlobalStyles.Primary_Grey2,
    marginBottom: 12,
  },

  typeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  typeIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },

  typeLabel: {
    fontSize: 14,
    fontFamily: "Roboto-semibold",
  },

  typeProof: {
    fontSize: 12,
    fontFamily: "Roboto-Light",
    color: GlobalStyles.Primary_Grey2,
    marginTop: 2,
  },

  reasonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  reasonChip: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey2,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  reasonChipText: {
    fontSize: 12,
    fontFamily: "Roboto-Light",
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Roboto-Light",
    color: GlobalStyles.Primary_Grey2,
  },

  contactBtn: {
    marginTop: 10,
    height: 50,
    backgroundColor: GlobalStyles.Primary_Green,
  },
});
