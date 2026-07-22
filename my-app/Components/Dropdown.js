import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function AppDropdown({
  label,
  placeholder = "Select an option",
  value,
  setValue,
  items,
  setItems,
  error,
  zIndex = 1000, // Crucial for dropdown rendering order
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.container, styles.zIndex, { zIndex }]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
        style={[styles.dropdown, error ? styles.dropdownError : null]}
        dropDownContainerStyle={[styles.dropdownContainer]}
        listMode="SCROLLVIEW" // Change to "MODAL" if inside a heavy ScrollView or Modal
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    minHeight: 50,
  },
  dropdownError: {
    borderColor: "#ff4d4f",
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 4,
  },
});
