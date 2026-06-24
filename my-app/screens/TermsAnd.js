import { ScrollView, Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../Constants";

export default function TermsAndConditions() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>

      <Text style={styles.updated}>Last Updated: June 2026</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By creating an account or using this marketplace, you agree to comply
          with these Terms and Conditions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. User Accounts</Text>
        <Text style={styles.paragraph}>
          • Users must provide accurate information.
        </Text>
        <Text style={styles.paragraph}>
          • Users are responsible for maintaining account security.
        </Text>
        <Text style={styles.paragraph}>
          • Users are responsible for activities performed through their
          accounts.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. Listings and Requests</Text>
        <Text style={styles.paragraph}>
          • Listings must contain accurate information.
        </Text>
        <Text style={styles.paragraph}>
          • Spam, duplicate, misleading, or fraudulent listings are prohibited.
        </Text>
        <Text style={styles.paragraph}>
          • The platform may remove content that violates these rules.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. Buying and Selling</Text>
        <Text style={styles.paragraph}>
          Buyers and sellers are responsible for their own transactions.
        </Text>
        <Text style={styles.paragraph}>
          The platform does not guarantee product quality, delivery, or
          successful transactions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Prohibited Activities</Text>
        <Text style={styles.paragraph}>• Fraud or scams.</Text>
        <Text style={styles.paragraph}>
          • Selling illegal or prohibited products.
        </Text>
        <Text style={styles.paragraph}>• Harassment or abusive behavior.</Text>
        <Text style={styles.paragraph}>• Posting misleading information.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>6. Reporting Violations</Text>
        <Text style={styles.paragraph}>
          Users may report suspicious listings, scams, harassment, or violations
          through the Report feature.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>7. Privacy</Text>
        <Text style={styles.paragraph}>
          We collect and process information necessary to operate the
          marketplace and improve the user experience.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>8. Account Suspension</Text>
        <Text style={styles.paragraph}>
          We may suspend or terminate accounts that violate these Terms and
          Conditions or engage in harmful activity.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>9. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          The marketplace is provided on an "as available" basis. Users assume
          responsibility for interactions and transactions with other users.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>10. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We may update these Terms and Conditions from time to time. Continued
          use of the platform indicates acceptance of any updates.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>11. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions regarding these Terms and Conditions, please
          contact us through the Contact Us page.
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
