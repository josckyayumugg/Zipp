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
import Toast from "react-native-toast-message";
import { supabase } from "../_lib/supabase";
import { useForm, Controller } from "react-hook-form";
import { useCreateRequest } from "../_CustomHooks/RequestServices";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";

import LoadingPaging from "./LoadingPaging";
import { queryClient } from "../App";
export default function NewRequestModal({
  isCreateModalOpen,
  setIsCreateModalOpen,
  setRequestType,
  user,
}) {
  console.log("kigali new request modal");
  //get User

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",

      brand: "",
      modal: "",
      year: "",
      more: "",
      budget: "",
      currency: "RWF",
    },
  });

  //About creating a request

  const { isPending, isError, error, mutate } = useCreateRequest();
  function submitHandler(data) {
    console.log({ Data1: data });
    mutate(
      { ...data, createdBy: user?.id },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success 👋",
            text2: "Request was created successfully!",
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
            currency: "RWF",
          });
          queryClient.invalidateQueries({
            queryKey: ["AllMyRequests"],
          });
          setIsCreateModalOpen(false);
          setRequestType("myRequest");
        },
      },
    );
  }

  return (
    <Modal
      visible={isCreateModalOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsCreateModalOpen(false)}
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
                Post New Request
              </Text>
              <View style={styles.smallMTop}>
                <Text style={[styles.paragraph, styles.smallMVertical]}>
                  Title (what are you looking for)?
                </Text>

                <Controller
                  control={control}
                  rules={{
                    maxLength: 50,
                    required: "name is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"Rav4 Transmission"}
                      onBlur={onBlur}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      value={value}
                      maxLength={30}
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
                {errors.name && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {errors.name.message}
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
                    maxLength: 300,
                    required: "Description is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={
                        "Dukeneye Transimission ya Rav4 ya okaziyo cyangwa nshyashya"
                      }
                      onBlur={onBlur}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      value={value}
                      maxLength={200}
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
                    <Text style={[styles.smallT]}>Brand</Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 25,
                        required: "Brand  is required",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"Toyota"}
                          onChange={onChange}
                          onBlur={onBlur}
                          maxLength={20}
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
                    <Text style={[styles.smallT]}>Modal</Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 25,
                        required: "modal is required",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"Rav4"}
                          onChange={onChange}
                          value={value}
                          maxLength={25}
                          onBlur={onBlur}
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
                    <Text style={[styles.smallT]}>Year</Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 25,
                        required: "Year is required",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"2019"}
                          onChange={onChange}
                          value={value}
                          maxLength={15}
                          onBlur={onBlur}
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
                        maxLength: 30,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"hybrid"}
                          onChange={onChange}
                          value={value}
                          maxLength={30}
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
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <Text style={[styles.smallT]}>Budget(optional) </Text>

                    <Controller
                      control={control}
                      rules={{
                        maxLength: 50,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputText
                          placeholder={"300,0000"}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          keyBoardType={"numeric"}
                          keyBoard
                          maxLength={30}
                          styled={{
                            borderWidth: 1,
                            borderColor: GlobalStyles.Primary_Grey,
                          }}
                        />
                      )}
                      name="budget"
                    />
                  </View>
                  <View style={{ alignSelf: "end" }}>
                    <Controller
                      control={control}
                      name="currency"
                      render={({ field: { onChange, value } }) => (
                        <Picked
                          selectedValue={value}
                          width={80}
                          options={[
                            { label: "RWF 🇷🇼", value: "RWF" },
                            { label: "USD 🇺🇸", value: "USD" },
                            { label: "EUR 🇪🇺", value: "EUR" },
                            { label: "GBP 🇬🇧", value: "GBP" },
                          ]}
                          onValueChange={onChange}
                        />
                      )}
                    />
                  </View>
                </View>
              </View>
              <View>
                {isError && (
                  <Text style={[{ color: "red" }, styles.paragraph]}>
                    {error.message}
                  </Text>
                )}
              </View>
              <View style={{ height: 85 }}>
                <Button
                  disable={isPending}
                  content={isPending ? "...creating request" : "Post request"}
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
                    setIsCreateModalOpen(false);
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
