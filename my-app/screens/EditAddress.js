import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";

export default function EditAddress() {
  const phones = [
    "+250 788 111 111",
    "+250 788 222 222",
  ];

  const emails = [
    "jean@gmail.com",
    "work@gmail.com",
  ];

  const addresses = [
    {
      label: "Home",
      address: "Kigali, Gasabo",
    },
    {
      label: "Business",
      address: "Kigali, Nyarugenge",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Phones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phone Numbers</Text>

        {phones.map((phone, index) => (
          <Pressable key={index} style={styles.row}>
            <Text style={styles.value}>{phone}</Text>

            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={GlobalStyles.Primary_Grey}
            />
          </Pressable>
        ))}

        <Pressable style={styles.addBtn}>
          <Ionicons
            name="add-circle-outline"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.addText}>Add Phone Number</Text>
        </Pressable>
      </View>

      {/* Emails */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emails</Text>

        {emails.map((email, index) => (
          <Pressable key={index} style={styles.row}>
            <Text style={styles.value}>{email}</Text>

            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={GlobalStyles.Primary_Grey}
            />
          </Pressable>
        ))}

        <Pressable style={styles.addBtn}>
          <Ionicons
            name="add-circle-outline"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.addText}>Add Email</Text>
        </Pressable>
      </View>

      {/* Addresses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Addresses</Text>

        {addresses.map((address, index) => (
          <Pressable key={index} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>
                {address.label}
              </Text>

              <Text style={styles.subValue}>
                {address.address}
              </Text>
            </View>

            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={GlobalStyles.Primary_Grey}
            />
          </Pressable>
        ))}

        <Pressable style={styles.addBtn}>
          <Ionicons
            name="add-circle-outline"
            size={18}
            color={GlobalStyles.Primary_Green}
          />
          <Text style={styles.addText}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  section: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    padding: 14,
    backgroundColor: GlobalStyles.Primary_Grey3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  value: {
    fontSize: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
  },

  subValue: {
    color: "gray",
    marginTop: 3,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
  },

  addText: {
    color: GlobalStyles.Primary_Green,
    fontWeight: "600",
  },
});