import { ScrollView, Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../Constants";

export default function PrivacyPolicy() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>

      <Text style={styles.updated}>
        Last Updated: June 2026
      </Text>

      <View style={styles.section}>
        <Text style={styles.heading}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy explains how we collect, use, store, and
          protect your information when you use our marketplace platform.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. Information We Collect</Text>

        <Text style={styles.paragraph}>
          • Name and profile information.
        </Text>

        <Text style={styles.paragraph}>
          • Email addresses and phone numbers.
        </Text>

        <Text style={styles.paragraph}>
          • Product listings and requests.
        </Text>

        <Text style={styles.paragraph}>
          • Messages sent through the platform.
        </Text>

        <Text style={styles.paragraph}>
          • Device and usage information.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. How We Use Your Information</Text>

        <Text style={styles.paragraph}>
          • To create and manage your account.
        </Text>

        <Text style={styles.paragraph}>
          • To enable communication between buyers and sellers.
        </Text>

        <Text style={styles.paragraph}>
          • To improve platform performance and security.
        </Text>

        <Text style={styles.paragraph}>
          • To respond to support requests and reports.
        </Text>

        <Text style={styles.paragraph}>
          • To send important account notifications.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. Sharing Information</Text>

        <Text style={styles.paragraph}>
          We do not sell your personal information.
        </Text>

        <Text style={styles.paragraph}>
          Information may be shared only when necessary to:
        </Text>

        <Text style={styles.paragraph}>
          • Provide platform services.
        </Text>

        <Text style={styles.paragraph}>
          • Comply with legal obligations.
        </Text>

        <Text style={styles.paragraph}>
          • Protect users and platform security.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Account Information</Text>

        <Text style={styles.paragraph}>
          Users may update profile information, contact details, and
          account settings at any time through the app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>6. Data Security</Text>

        <Text style={styles.paragraph}>
          We use reasonable security measures to protect user information
          from unauthorized access, misuse, or disclosure.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>7. User Content</Text>

        <Text style={styles.paragraph}>
          Information included in listings, requests, and public profiles
          may be visible to other users of the platform.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>8. Notifications</Text>

        <Text style={styles.paragraph}>
          We may send account, security, transaction, and support-related
          notifications. Users can manage notification preferences through
          the Settings page.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>9. Account Deletion</Text>

        <Text style={styles.paragraph}>
          Users may request account deletion through their account
          settings. Certain information may be retained where required by
          law or for security purposes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>10. Changes to This Policy</Text>

        <Text style={styles.paragraph}>
          We may update this Privacy Policy from time to time. Continued
          use of the platform after updates indicates acceptance of the
          revised policy.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>11. Contact Us</Text>

        <Text style={styles.paragraph}>
          If you have questions about this Privacy Policy or how your
          information is handled, please contact us through the Contact Us
          page in the application.
        </Text>
      </View>
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

  updated: {
    color: GlobalStyles.Primary_Grey,
    marginBottom: 20,
    fontFamily: "Roboto-Light",
  },

  section: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
  },

  heading: {
    fontSize: 17,
    fontFamily: "Roboto-semibold",
    marginBottom: 8,
  },

  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Roboto-Light",
  },
});