import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import InputText from "./TextInput";
import Picked from "./Picker";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import Span from "./Span";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import { useEditRequest } from "../_CustomHooks/RequestServices";
import { queryClient } from "../App";

export default function EditRequestModal({
  item: product,

  isEditModalVisible,
  setIsEditModalVisible,
}) {
  //getProduct

  const { isPending, isError, error, mutate } = useEditRequest(product.id);
  // const item=request with the item Id the edit  and the data got will be the default value
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,

      description: product.description,
      modal: product.modal,
      brand: product.modal,
      more: product.more,
      year: product.year,
      budget: product.budget,
    },
  });

  //filling he form


  function submitHandler(data) {
   ;
    mutate(
      { id: product.id, ...data },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success 👋",
            text2: "Request Edit was successful!",
            position: "top", // or "bottom"
            visibilityTime: 3000,
          });
          reset({
            name: "",
            description: "",

            brand: "",
            modal: "",
            year: "",
            more: "",
            budget: "",
            currency: "",
          });
          queryClient.invalidateQueries({
            queryKey: ["AllMyRequests"],
          });
          setIsEditModalVisible(false);
        },
      },
    );
  }

  return (
    <Modal
      visible={isEditModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsEditModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#fff" }}
      >
        <View style={[styles.overlay]}>
          <View style={[styles.modal, { paddingVertical: 20 }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",

                elevation: 999,
              }}
            >
              {/* <Button
                  styles={{ alignSelf: "flex-end" }}
                  content={
                    <Span
                      styles={[
                        {
                          backgroundColor: GlobalStyles.Primary_Yellow,
                        },
                        styles.bordeR,
                        styles.paddingLg,
                      ]}
                      content={
                        <Ionicons name={"close"} size={40} color={"black"} />
                      }
                    />
                  }
                  onPress={() => {
                    setIsVisible(false);
                  }}
                /> */}
            </View>

            <View>
              <Text style={[styles.sectionTitle, styles.smallMVertical]}>
                Edit Request
              </Text>
              <View style={styles.smallMTop}>
                <Text style={[styles.paragraph, styles.smallMVertical]}>
                  Title?
                </Text>

                <Controller
                  control={control}
                  rules={{
                    maxLength: 50,
                    required: "Title is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"eg:Transmission"}
                      onBlur={onBlur}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      value={value}
                      onChange={onChange}
                      styled={[
                        {
                          borderColor: GlobalStyles.Primary_Grey,
                          borderWidth: 1,
                        },
                        styles.paddingLg,
                      ]}
                    />
                  )}
                  name="name"
                />
                {errors.title && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {errors.title.message}
                  </Text>
                )}
              </View>
              <View style={styles.smallMTop}>
                <Text style={[styles.paragraph, styles.smallMVertical]}>
                  Descriptions
                </Text>

                <Controller
                  control={control}
                  rules={{
                    maxLength: 50,
                    required: "Description is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={
                        "Looking for a Toyota rav4  gear Transmission"
                      }
                      onBlur={onBlur}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      value={value}
                      onChange={onChange}
                      styled={[
                        {
                          borderColor: GlobalStyles.Primary_Grey,
                          borderWidth: 1,
                          height: 60,
                        },
                        styles.paddingLg,
                      ]}
                    />
                  )}
                  name="description"
                />
                {errors.description && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {errors.description.message}
                  </Text>
                )}
              </View>
              <View
                style={[
                  {
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: 18,

                    marginTop: 10,
                  },
                ]}
              >
                <View style={[styles.rowBtn, { width: "100%" }]}>
                  <View style={{ width: "32%" }}>
                    <Text style={[styles.smallT]}>Brand(optional)</Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 50,
                        required: "Brand  is required",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"Toyota"}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          styled={{
                            borderWidth: 1,
                            borderColor: GlobalStyles.Primary_Grey,
                          }}
                        />
                      )}
                      name="brand"
                    />
                    {errors.brand && (
                      <Text style={{ color: "red", marginBottom: 10 }}>
                        {errors.brand.message}
                      </Text>
                    )}
                  </View>

                  <View style={{ width: "32%" }}>
                    <Text style={[styles.smallT]}>Modal(optional)</Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 50,
                        required: "modal is required",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"Rav4"}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          styled={{
                            borderWidth: 1,
                            borderColor: GlobalStyles.Primary_Grey,
                          }}
                        />
                      )}
                      name="modal"
                    />
                    {errors.modal && (
                      <Text style={{ color: "red", marginBottom: 10 }}>
                        {errors.modal.message}
                      </Text>
                    )}
                  </View>
                  <View style={{ width: "48%" }}>
                    <Text style={[styles.smallT]}>Year (Optional)</Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 50,
                        required: "Year is required",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"2019"}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          styled={{
                            borderWidth: 1,
                            borderColor: GlobalStyles.Primary_Grey,
                          }}
                        />
                      )}
                      name="year"
                    />
                    {errors.year && (
                      <Text style={{ color: "red", marginBottom: 10 }}>
                        {errors.year.message}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={[styles.rowBtn, { width: "100%" }]}>
                  <View style={{ width: "48%" }}>
                    <Text style={[styles.smallT]}>
                      More Specification(optional)
                    </Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 50,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"hybrid"}
                          onChange={onChange}
                          value={value}
                          onBlur={onBlur}
                          styled={{
                            borderWidth: 1,
                            borderColor: GlobalStyles.Primary_Grey,
                          }}
                        />
                      )}
                      name="more"
                    />
                  </View>
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={[styles.smallT]}>Budget (RWF) (Optional)</Text>

                  <Controller
                    control={control}
                    rules={{
                      maxLength: 50,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputText
                        placeholder={"300,0000RWF"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        styled={{
                          borderWidth: 1,
                          borderColor: GlobalStyles.Primary_Grey,
                        }}
                      />
                    )}
                    name="budget"
                  />
                </View>
              </View>
              <View style={{ height: 85 }}>
                <Button
                  content={isPending ? "...Editing Request" : "Edit request"}
                  onPress={handleSubmit(submitHandler)}
                  styles={[
                    {
                      backgroundColor: GlobalStyles.Primary_Yellow,
                      height: 35,
                      marginTop: 20,
                    },
                    styles.paddingLg,
                    styles.whiteT,

                    styles.bordeR,
                  ]}
                />
                <Button
                  styles={[
                    styles.bordeR,
                    {
                      borderColor: GlobalStyles.Primary_Grey,
                      borderWidth: 1,
                      height: 30,
                      marginTop: 20,
                    },
                  ]}
                  content={<Text>close</Text>}
                  onPress={() => {
                    setIsEditModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
  button: {
    marginTop: 16,

    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
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
    marginVertical: 4,
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
    gap: 8,
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
