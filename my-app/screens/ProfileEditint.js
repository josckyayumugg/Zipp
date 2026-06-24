import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Components/Button";
import { GlobalStyles } from "../Constants";

export default function EditProfile() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={50} color={GlobalStyles.Primary_Grey} />
        </View>

        <Button content="Change Photo" styles={[styles.changePhotoBtn]} />
      </View>

      {/* Personal Information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput placeholder="Jean Claude" style={styles.input} />

        <Text style={styles.label}>Location</Text>
        <TextInput placeholder="Kigali, Rwanda" style={styles.input} />
        <Text style={styles.label}>street Names</Text>
        <TextInput placeholder="KG 774 Street" style={styles.input} />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Tell buyers and sellers about yourself..."
          style={[styles.input, styles.bioInput]}
        />
      </View>

      {/* Contact Information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          keyboardType="email-address"
          placeholder="example@email.com"
          style={styles.input}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="+250..."
          style={styles.input}
        />
      </View>

      {/* Account Type */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Type</Text>

        <View style={styles.roleBox}>
          <Text>Buyer & Seller</Text>
        </View>
      </View>

      <Button content="Save Changes" styles={styles.saveBtn} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 40,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: GlobalStyles.Primary_Grey3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  changePhotoBtn: {
    height: 40,
    borderRadius: 8,
  },

  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Roboto-semibold",
    marginBottom: 12,
  },

  label: {
    marginBottom: 6,
    fontFamily: "Roboto-semibold",
  },

  input: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontFamily: "Roboto-Light",
  },

  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },

  roleBox: {
    padding: 12,
    backgroundColor: GlobalStyles.Primary_Grey3,
    borderRadius: 8,
  },

  saveBtn: {
    marginTop: 10,
    height: 50,
    borderRadius: 10,
  },
});
