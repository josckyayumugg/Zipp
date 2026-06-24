import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "How do I create an account?",
      a: "You can sign up using your email or phone number.",
    },
    {
      q: "Can I buy products in the app?",
      a: "No. The app only connects buyers and sellers. Payments are handled outside the app.",
    },
    {
      q: "How do I contact a seller?",
      a: "You can contact sellers via phone, WhatsApp, or email shown on the product page.",
    },
    {
      q: "How do I know a product is available?",
      a: "Sellers must confirm availability periodically. You can also contact them directly.",
    },
    {
      q: "How do I report a problem?",
      a: "Go to the product or seller profile and tap 'Report'.",
    },
    {
      q: "How do I delete my account?",
      a: "Go to Settings > Account > Delete Account.",
    },
  ];

  const filteredFaqs = faqs.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help Center</Text>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} />
        <TextInput
          placeholder="Search help..."
          value={search}
          onChangeText={setSearch}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </View>

      {/* QUICK CATEGORIES */}
      <View style={styles.categories}>
        {["Account", "Buying", "Selling", "Safety", "Support"].map(
          (item, i) => (
            <View key={i} style={styles.category}>
              <Text>{item}</Text>
            </View>
          ),
        )}
      </View>

      {/* FAQ LIST */}
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

      {filteredFaqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => setOpenIndex(isOpen ? null : index)}
          >
            <View style={styles.row}>
              <Text style={styles.question}>{item.q}</Text>
              <Ionicons
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={18}
              />
            </View>

            {isOpen && <Text style={styles.answer}>{item.a}</Text>}
          </Pressable>
        );
      })}

      {/* CONTACT SUPPORT */}
      <View style={styles.supportBox}>
        <Text style={styles.supportTitle}>Still need help?</Text>

        <Pressable style={styles.supportBtn}>
          <Ionicons name="chatbubble-outline" size={18} />
          <Text style={{ marginLeft: 8 }}>Contact Support</Text>
        </Pressable>

        <Pressable style={styles.supportBtn}>
          <Ionicons name="logo-whatsapp" size={18} />
          <Text style={{ marginLeft: 8 }}>WhatsApp Support</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  category: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  question: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    paddingRight: 10,
  },

  answer: {
    marginTop: 10,
    color: "#555",
  },

  supportBox: {
    marginTop: 20,
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  supportTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  supportBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 8,
  },
  image: {
   
    height: 350,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    minWidth: "100%",
    fontFamily: "notoSans",
  },

  mainTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 35,
    textAlign: "center",
  },
  PageHeaderTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 25,
    textAlign: "center",
  },
  Views: {
    marginVertical: 12,
  },
  icon: {
    marginHorizontal: 8,
  },
  smallT: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
  },
  smallMVertical: {
    marginVertical: 8,
  },
  largeMTop: {
    marginTop: 50,
  },
  smallMTop: {
    marginTop: 8,
  },
  label: {
    borderWidth: 2,
  },
  Roboto: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  bold: {
    fontFamily: "Roboto-semibold",
    fontWeight: 700,
  },
  graph: {
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rownBtn: {
    flexDirection: "row",
    alignItems: "center",

    gap: 8,
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 8,
  },
  whiteT: {
    color: "white",
  },
  greyT: {
    color: GlobalStyles.Primary_Grey,
  },
  greenT: {
    color: GlobalStyles.Primary_Green,
  },
  smallText: {
    fontSize: 10,
    fontFamily: "Roboto-Light",
  },
  whiteText: {
    color: GlobalStyles.Primary_Grey,
  },
  yellowBg: {
    backgroundColor: GlobalStyles.Primary_Yellow,
  },
  blackBg: {
    backgroundColor: GlobalStyles.Black,
  },
  cards: {
    alignSelf: "flex-end",
    flexDirection: "row",
    margin: 8,
    paddingRight: 4,

    width: "70%",
  },
  rowItem: {
    flexDirection: "column",
    width: "45%",
    paddingHorizontal: 4,
    alignItems: "flex-start",
    padding: 4,
  },
  revealImage: {
    height: 200,

    marginBottom: 16,
  },

  headerCard: {
    margin: 6,
    borderWidth: 1,

    backgroundColor: GlobalStyles.Primary_Grey,
  },
  rowView: {
    flexDirection: "row",
    width: "100%",
    gap: 2,
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  sectionImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },

  sectionText: {
    flex: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 18,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 22,

    marginBottom: 8,
  },

  bigText: {
    fontSize: 20,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
    lineHeight: 16,
  },
  button: {
    alignSelf: "start",
    paddingHorizontal: 8,
    marginVertical: 10,
    borderRadius: 4,
  },

  bordeR: {
    borderRadius: 6,
    overflow: "hidden",
  },
  paddingSm: {
    padding: 4,
  },
  paddingLg: {
    padding: 8,
  },
  button: {
    backgroundColor: GlobalStyles.Primary_Green,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
