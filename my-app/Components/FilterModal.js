import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import { SafeAreaView } from "react-native";

export default function ProductFilterModal({
  visible,
  setIsFilterOpen,
  onApply,
  // selectedCategory,
  // selectedCondition,
  // setSelectedCategory,
  // setSelectedCondition,
  // setBrand,
  // setModel,
  // setYear,
  // brand,
  // model,
  // year,
  setIsTempFilter,
  isTempFilter,
  setAppliedFilter,
  setShouldSearch,
  setHasSearched,
}) {
  // State definitions for your filter metrics

  const categories = [
    { name: "Body Parts(umubiri)", state: "body" },
    { name: "Lights(amatara)", state: "lights" },
    { name: "Engines(moteri)", state: "engine" },
    { name: "Brakes(feri)", state: "brakes" },
    { name: "Suspension", state: "suspension" },
    { name: "Electrical(umuriro)", state: "electricity" },
    { name: "others(ibindi)", state: "others" },
  ];
  const conditions = [
    { name: "New(Nshashya)", state: "new" },
    { name: "Used(okaziyo)", state: "used" },
    { name: "Refurbished(yasanwe)", state: "refurbished" },
  ];

  const handleClearAll = () => {
    setIsTempFilter({
      brand: "",
      model: "",
      year: "",
      category: "",
      condition: "",
      search: "",
    });
  };

  const handleApply = () => {
    console.log(isTempFilter);
    setIsFilterOpen(false);
    setAppliedFilter(isTempFilter);
    setShouldSearch(true);
    setHasSearched(true);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      style={{ marginTop: 10 }}
      onRequestClose={() => {
        setIsFilterOpen(false);
      }}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={[styles.container, modalStyles.modalContent]}>
          {/* Header Section */}
          <View style={[styles.row, modalStyles.headerBorder]}>
            <Text style={styles.sectionTitle}>Filter Products</Text>
            <Pressable
              onPress={() => {
                setIsFilterOpen(false);
              }}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Ionicons name="close" size={24} color={GlobalStyles.Black} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: 12 }}
          >
            {/* 1. Category / Component Type Options */}
            <Text style={[styles.paragraph, styles.bold, styles.smallMTop]}>
              Component Type
            </Text>
            <View
              style={[
                styles.row,
                { flexWrap: "wrap", justifyContent: "flex-start", gap: 8 },
                styles.smallMVertical,
              ]}
            >
              {categories.map((category) => {
                const isSelected = isTempFilter.category === category.state;
                return (
                  <Pressable
                    key={category.state}
                    onPress={() =>
                      setIsTempFilter((prev) => ({
                        ...prev,
                        category: category.state,
                      }))
                    }
                    style={[
                      styles.padding,
                      styles.bordeR,
                      {
                        borderWidth: 1,
                        borderColor: isSelected
                          ? GlobalStyles.Primary_Yellow
                          : GlobalStyles.Primary_Grey,
                        backgroundColor: isSelected
                          ? GlobalStyles.Primary_Yellow
                          : "transparent",
                      },
                    ]}
                  >
                    <Text style={[styles.smallT, isSelected && styles.bold]}>
                      {category.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* 2. Condition Badges */}
            <Text style={[styles.paragraph, styles.bold, styles.smallMTop]}>
              Condition Status
            </Text>
            <View
              style={[
                styles.row,
                { flexWrap: "wrap", justifyContent: "flex-start", gap: 8 },
                styles.smallMVertical,
              ]}
            >
              {conditions.map((condition) => {
                const isSelected = isTempFilter.condition === condition.state;
                return (
                  <Pressable
                    key={condition.state}
                    onPress={() =>
                      setIsTempFilter((prev) => ({
                        ...prev,
                        condition: condition.state,
                      }))
                    }
                    style={[
                      styles.padding,
                      styles.bordeR,
                      {
                        borderWidth: 1,
                        borderColor: isSelected
                          ? GlobalStyles.Primary_Yellow
                          : GlobalStyles.Primary_Grey,
                        backgroundColor: isSelected
                          ? GlobalStyles.Primary_Yellow
                          : "transparent",
                      },
                    ]}
                  >
                    <Text style={[styles.smallT, isSelected && styles.bold]}>
                      {condition.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* 3. Text Specifications Group */}
            <Text
              style={[
                styles.paragraph,
                styles.bold,
                { marginTop: 16, marginBottom: 4 },
              ]}
            >
              Vehicle Requirements
            </Text>

            <Text
              style={[
                styles.smallT,
                { color: GlobalStyles.Primary_Grey2, marginTop: 6 },
              ]}
            >
              Brand
            </Text>
            <TextInput
              style={[
                modalStyles.inputField,
                styles.bordeR,
                styles.smallMVertical,
              ]}
              placeholder="e.g., Toyota, Honda"
              placeholderTextColor="#999"
              value={isTempFilter.brand}
              onChangeText={(value) =>
                setIsTempFilter((prev) => ({
                  ...prev,
                  brand: value,
                }))
              }
            />

            <Text
              style={[
                styles.smallT,
                { color: GlobalStyles.Primary_Grey2, marginTop: 6 },
              ]}
            >
              Model
            </Text>
            <TextInput
              style={[
                modalStyles.inputField,
                styles.bordeR,
                styles.smallMVertical,
              ]}
              placeholder="e.g., Corolla, Civic"
              placeholderTextColor="#999"
              value={isTempFilter.model}
              onChangeText={(value) =>
                setIsTempFilter((prev) => ({
                  ...prev,
                  model: value,
                }))
              }
            />

            <Text
              style={[
                styles.smallT,
                { color: GlobalStyles.Primary_Grey2, marginTop: 6 },
              ]}
            >
              Year
            </Text>
            <TextInput
              style={[
                modalStyles.inputField,
                styles.bordeR,
                styles.smallMVertical,
              ]}
              placeholder="e.g., 2022"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={4}
              value={isTempFilter.year}
              onChangeText={(value) =>
                setIsTempFilter((prev) => ({
                  ...prev,
                  year: value,
                }))
              }
            />
          </ScrollView>

          {/* Action Footer Buttons */}
          <View style={[styles.row, modalStyles.footerContainer]}>
            <Pressable
              onPress={handleClearAll}
              style={[
                modalStyles.actionButton,
                modalStyles.clearButton,
                styles.bordeR,
              ]}
            >
              <Text
                style={[
                  styles.smallT,
                  styles.bold,
                  { color: GlobalStyles.Black },
                ]}
              >
                Clear All
              </Text>
            </Pressable>

            <Pressable
              onPress={handleApply}
              style={[modalStyles.actionButton, styles.button, styles.bordeR]}
            >
              <Text
                style={[
                  styles.smallT,
                  styles.bold,
                  styles.whiteT,
                  { textAlign: "center" },
                ]}
              >
                Apply Filters
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Layout sheet specifically managing overlay positions alongside your inherited core styles
const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 12,
    justifyContent: "between",
    width: "100%",
  },
  inputField: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Roboto-regular",
    fontSize: 14,
    backgroundColor: "#FAFAFA",
    width: "100%",
  },
  footerContainer: {
    gap: 12,
    marginTop: 16,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    backgroundColor: "transparent",
  },
});

// Appended core global styles definition compatibility match
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  smallT: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
  },
  smallMVertical: {
    marginVertical: 8,
  },
  smallMTop: {
    marginTop: 8,
  },
  bold: {
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
  },
  padding: {
    padding: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
  },
  whiteT: {
    color: "white",
  },
  sectionTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 22,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  bordeR: {
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    backgroundColor: GlobalStyles.Primary_Green,
  },
  pressed: {
    opacity: 0.7,
  },
});
