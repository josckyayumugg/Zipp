import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { useDeleteProduct } from "../_CustomHooks/ProductServices";

export default function ConfirmDeleteProduct({
  setIsDeleteVisible,
  isDeleteVisible,
  item,
  onConfirm,
  productId,
}) {
  const closeModal = () => setIsDeleteVisible(false);

  return (
    <Modal
      visible={isDeleteVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      {/* Background Dimming Overlay */}
      <Pressable style={styles.overlay} onPress={closeModal}>
        {/* Modal Container Body */}
        <View
          style={[
            styles.modalCard,
            { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
          ]}
        >
          {/* Status/Warning Icon Layout Section */}
          <View style={styles.alertIconWrapper}>
            <Ionicons
              name="trash-outline"
              size={32}
              color={GlobalStyles.Primary_Yellow}
            />
          </View>

          {/* Core Typography Block using your exact design patterns */}
          <Text style={[styles.mainTitle, { marginBottom: 8 }]}>
            Delete Product
          </Text>

          <Text style={[styles.paragraph, styles.centerText]}>
            Are you sure you want to delete your Product
            <Text style={styles.bold}>"{item}"</Text>? This action cannot be
            undone.
          </Text>

          {/* Action Row Grid utilizing your layout classes */}
          <View style={[styles.row, styles.actionContainer]}>
            {/* Cancel Button */}
            <Button
              onPress={closeModal}
              styles={[
                styles.bordeR,
                styles.paddingLg,
                styles.flexButton,
                { backgroundColor: GlobalStyles.Primary_Grey3 || "#E0E0E0" },
              ]}
              content={
                <Text style={[styles.Roboto, styles.bold, styles.centerText]}>
                  Cancel
                </Text>
              }
            />

            {/* Confirm Delete Button */}
            <Button
              onPress={() => {
                if (onConfirm) onConfirm();
                closeModal();
              }}
              styles={[
                styles.bordeR,
                styles.paddingLg,
                styles.flexButton,
                { backgroundColor: GlobalStyles.Black },
              ]}
              content={
                <Text
                  style={[
                    styles.bold,
                    styles.whiteT,
                    styles.centerText,
                    styles.paragraph,
                  ]}
                >
                  Delete
                </Text>
              }
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 340,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  alertIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFDF0", // Soft background to highlight the main yellow icon
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  actionContainer: {
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  flexButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  centerText: {
    textAlign: "center",
  },

  // Mimicked Typography & Layout settings explicitly copied from your parent component style matrix
  mainTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 22,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
    color: "#555555",
  },
  bold: {
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
  },
  Roboto: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  whiteT: {
    color: "white",
  },
  bordeR: {
    borderRadius: 6,
    overflow: "hidden",
  },
  paddingLg: {
    padding: 8,
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
    fontSize: 24,
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
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: 24,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 20,
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
