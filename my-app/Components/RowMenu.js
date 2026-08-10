import React, { useState } from "react";
import Button from "./Button";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ConfirmDeleteProduct from "./confirmDeleteProduct";
import { useDeleteProduct } from "../_CustomHooks/ProductServices";
import { queryClient } from "../App";
import Toast from "react-native-toast-message";

export default function RowMenu({ styles, productId, item }) {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const navigation = useNavigation();

  //deleting product
  const { isError, error, isPending, mutate } = useDeleteProduct();
  function onConfirm() {
    mutate(productId, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Delete👋",
          text2: "Your product was  deleted well ",
          position: "top", // or "bottom"
          visibilityTime: 3000,
        });
        queryClient.invalidateQueries("getMyAllProducts");
      },
    });
  }
  return (
    <View style={[{ flexDirection: "row", gap: 4, width: "100%" }]}>
      <Button
        onPress={() => {
          navigation.navigate("Tabs", {
            screen: "Upload",
            params: { productId: productId },
          });
        }}
        styles={[{ borderWidth: 1, height: 25 }, styled.bordeR]}
        content={<Text style={styled.paragraph}>Edit</Text>}
      />

      <Button
        onPress={() => {
          setIsDeleteVisible((prev) => !prev);
        }}
        styles={[{ borderWidth: 1, height: 25 }, styled.bordeR]}
        content={<Text style={styled.paragraph}>delete</Text>}
      />
      {isDeleteVisible && (
        <ConfirmDeleteProduct
          id={productId}
          item={item}
          setIsDeleteVisible={setIsDeleteVisible}
          isDeleteVisible={isDeleteVisible}
          onConfirm={onConfirm}
        />
      )}
    </View>
  );
}
const styled = StyleSheet.create({
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
    fontFamily: "Roboto-Light",
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
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
