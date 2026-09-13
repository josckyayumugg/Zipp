import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import { formatPhone } from "../Helpers";

export default function ContactUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <Text style={styles.subtitle}>
        Need help? Contact us through any of the platforms below.
      </Text>

      {/* SUPPORT INFORMATION */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Support Information</Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="mail-outline"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.infoText}>ksmartingauto@gmail.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="logo-instagram"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.infoText}>Ksmartingauto</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="logo-whatsapp"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.infoText}>(+250) 780 136 214 / 784 450 897</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="logo-facebook"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.infoText}>Ksmartingauto</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="logo-youtube"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.infoText}>Ksmartingauto</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call" size={18} color={GlobalStyles.Primary_Green} />
          <Text style={styles.infoText}>(+250) 780 136 214 / 784 450 897</Text>
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

      {/* SELLER GUIDELINES */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Seller Guidelines</Text>

        <Text style={styles.languageTitle}>English</Text>

        <View style={styles.ruleRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.ruleText}>
            Sellers can add prices to requests posted by buyers.
          </Text>
        </View>

        <View style={styles.ruleRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.ruleText}>
            Sellers can create and publish products in the system.
          </Text>
        </View>

        <View style={styles.ruleRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.ruleText}>
            Only garages can add deals in the Deals section.
          </Text>
        </View>

        <Text style={styles.languageTitle}>Kinyarwanda</Text>

        <View style={styles.ruleRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.ruleText}>
            Abagurisha bashobora kongera ibiciro ku byo abaguzi basabye.
          </Text>
        </View>

        <View style={styles.ruleRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.ruleText}>
            Abagurisha bashobora gushyira ibicuruzwa byabo muri sisitemu.
          </Text>
        </View>

        <View style={styles.ruleRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.ruleText}>
            Amagaraji nabacuruzi ni bo bonyine bashobora kongeraho deals(diru)
            mu gice cya Deals.
          </Text>
        </View>
      </View>

      {/* CHANGE ACCOUNT TYPE */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Changing Your Account Type</Text>

        <Text style={styles.paragraph}>English</Text>

        <Text style={styles.descriptionText}>
          If you want to change your account type or who you are registered as
          in the system, please contact us using the support contacts above.
        </Text>

        <Text style={styles.paragraph}>Kinyarwanda</Text>

        <Text style={styles.descriptionText}>
          Niba ushaka guhindura ubwoko bwa konti yawe cyangwa ibyo
          wiyandikishijeho muri sisitemu, hamagara ubuyobozi ukoresheje nimero
          cyangwa aderesi byatanzwe haruguru.
        </Text>
      </View>

      <Text style={styles.connectText}>
        Connect with us through all our platforms
      </Text>
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
    fontSize: 18,
    fontFamily: "Roboto-semibold",
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },

  infoText: {
    fontFamily: "Roboto-Light",
    flex: 1,
  },

  languageTitle: {
    fontSize: 15,
    fontFamily: "Roboto-semibold",
    marginTop: 6,
    marginBottom: 10,
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },

  ruleText: {
    flex: 1,
    fontFamily: "Roboto-Light",
    fontSize: 14,
    lineHeight: 21,
  },

  paragraph: {
    fontFamily: "Roboto-semibold",
    marginTop: 6,
    marginBottom: 6,
  },

  descriptionText: {
    fontFamily: "Roboto-Light",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 10,
  },

  connectText: {
    fontFamily: "Roboto-semibold",
    textAlign: "center",
    color: GlobalStyles.Primary_Green,
    marginTop: 4,
    marginBottom: 20,
  },
});
