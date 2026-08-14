import React, { useState } from "react";

import { SafeAreaView } from "react-native";
import { Modal } from "react-native";

import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";

import { GlobalStyles } from "../Constants";
import { supabase } from "../_lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import InputText from "../Components/TextInput";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import LoadingPaging from "../Components/LoadingPaging";
import AppDropdown from "../Components/Dropdown";
import { queryClient } from "../App";
import {
  useCreateProduct,
  useEditProductDeal,
  useGetSingleProduct,
  useGetSingleProductDeal,
} from "../_CustomHooks/ProductServices";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { Pressable } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useEditProduct } from "../_CustomHooks/ProductServices";
import { containsContactInfo } from "../Helpers";

import {
  useGetCurrentProfile,
  useGetCurrentUser,
} from "../_CustomHooks/Authentication";
import { useCreateProductDeal } from "../_CustomHooks/ProductServices";
import { isAuthRefreshDiscardedError } from "@supabase/supabase-js";

export default function CreateDealModal({ visible, setIsVisible }) {
  // State definitions for your filter metrics

  const [openDropdown, setOpenDropdown] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [],
      name: "",
      year: "",
      model: "",
      description: "",
      currency: "RWF",
      more: "",
      brand: "",
      price: "",
      createdBy: "",
    },
  });

  /////////////
  const [currencyItems, setCurrencyItems] = useState([
    { label: "RWF 🇷🇼", value: "RWF" },
    { label: "USD 🇺🇸", value: "USD" },
    { label: "EUR 🇪🇺", value: "EUR" },
    { label: "GBP 🇬🇧", value: "GBP" },
  ]);

  const {
    mutate: mutationDeal,
    isPending: isPendingDeal,
    isError: isErrorDeal,
    error: errorDeal,
  } = useCreateProductDeal();

  // About the  user
  const currentUser = supabase.auth.user ? supabase.auth.user() : null;
  // Note: If using newer Supabase V2 JS libraries, use:da
  const {
    data: user,
    isPending: isLoadingUser,
    isError: isErrorUser,
  } = useGetCurrentUser();

  const userId = user?.id;
 

  // Pull out the active array state in real time
  const capturedImages = watch("images") || [];
  const Navigation = useNavigation();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const PermissionResponse = await requestPermission();
      return PermissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera Permissions to use this app",
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [16, 9],
    });

    if (image.canceled) {
      return;
    }

    const newPhotoUri = image?.assets[0].uri;
    const currentPhotos = watch("images") || [];

    // Safety check to ensure we stop exactly at 4 photos
    if (currentPhotos.length >= 3) {
      Alert.alert(
        "Limit Reached",
        "You can only upload a maximum of 3 images.",
      );
      return;
    }

    setValue("images", [newPhotoUri, ...currentPhotos], {
      shouldValidate: true,
    });
  }

  function submitHandler(data) {
    mutationDeal(
      { ...data, userId },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success 👋",
            text2: "Deal added successfully!",
            position: "top", // or "bottom"
            visibilityTime: 3000,
          });
          reset({
            name: "",
            brand: "",
            model: "",
            year: "",
            details: "",
            currency: "RWF",
            price: "",
          });
          setIsVisible(false);
          queryClient.invalidateQueries("allDeals");
        },
      },
    );
  }


  return (
    <Modal
      visible={visible}
      animationType="slide"
      style={{ marginTop: 10, backgroundColor: "white" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={modalStyles.modalOverlay}>
          <ScrollView style={[styles.container, modalStyles.modalContent]}>
            <View>
              <Pressable
                style={[
                  styles.bordeR,
                  {
                    backgroundColor: GlobalStyles.Primary_Green,
                    alignSelf: "flex-end",
                  },
                ]}
                onPress={() => {
                  setIsVisible(false);
                }}
              >
                <Ionicons style={{}} name={"close"} size={30} />
              </Pressable>
              {/* FIX 1: Safe wrapper View layout around typography icon blocks */}

              <View
                style={[
                  styles.smallMVertical,
                  { flexDirection: "row", gap: 6 },
                ]}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={20}
                  color={GlobalStyles.Primary_Green}
                />
                <Text
                  style={[
                    styles.paragraph,
                    styles.bold,
                    { color: GlobalStyles.Primary_Green },
                  ]}
                >
                  Diru zimara amasaha 24 gusa !!!!
                </Text>
              </View>
            </View>

            {/* DYNAMIC VISUAL ELEMENT: Horizontal Captured Photo Gallery Row */}
            {capturedImages.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 10 }}
                contentContainerStyle={{ gap: 8 }}
              >
                {capturedImages.map((uri, index) => (
                  <View
                    key={index}
                    style={[styles.bordeR, { position: "relative" }]}
                  >
                    <Image
                      source={{ uri }}
                      style={{ width: 120, height: 90, borderRadius: 6 }}
                    />
                    <View style={styles.badgeIndex}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Camera Target Trigger Anchor Panel */}

            <View
              style={[
                {
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderColor: GlobalStyles.Primary_Grey,
                  height: 140,
                  alignSelf: "center",
                  marginHorizontal: "auto",
                  width: "50%",
                  flexDirection: "row",
                  backgroundColor: "#fafafa",

                  alignItems: "center",
                },
                styles.bordeR,
                styles.smallMVertical,
              ]}
            >
              <Controller
                control={control}
                name="images"
                rules={{
                  required: "Images are required",
                  validate: (value) => {
                    if (!value || value.length < 2) {
                      return "At least 2 images are required";
                    }
                    if (value.length > 3) return "Maximum 3 images allowed";
                    return true;
                  },
                }}
                render={() => null}
              />

              <Button
                content={
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",

                      gap: 8,
                      alignSelf: "center",
                    }}
                  >
                    <Ionicons name="camera" size={24} color="black" />
                    <Text style={{ fontWeight: "600" }}>
                      Snap Photo ({capturedImages.length}/3)
                    </Text>
                  </View>
                }
                onPress={takeImageHandler}
              />
            </View>

            {errors.images && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.images.message}
              </Text>
            )}

            {/* Product Title Section */}

            <View style={{ marginTop: 16 }}>
              <Text style={styles.headerTitle}>Deal name</Text>
              <Controller
                control={control}
                rules={{
                  maxLength: 50,
                  required: "Name is required",
                  validate: (value) =>
                    !containsContactInfo(value) ||
                    "Do not include phone numbers, email addresses, social media accounts, or links.",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder={"Izina"}
                    onBlur={onBlur}
                    maxLength={35}
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

              {errors.name && (
                <Text style={{ color: "red" }}>{errors.name.message}</Text>
              )}
            </View>

            {/* Row Split Fields Grid */}
            <View
              style={[
                styles.row,

                {
                  marginTop: 12,
                },
              ]}
            >
              <View style={{ width: "25%" }}>
                <Text style={styles.headerTitle}>Brand</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Brand is Required",

                    validate: (value) =>
                      !containsContactInfo(value) ||
                      "Do not include phone numbers, email addresses, social media accounts, or links.",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"Toyota"}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      onBlur={onBlur}
                      onChange={onChange}
                      maxLength={25}
                      value={value}
                      styled={[
                        {
                          borderColor: GlobalStyles.Primary_Grey,
                          borderWidth: 1,
                        },
                        styles.bordeR,
                        styles.paddingLg,
                      ]}
                    />
                  )}
                  name="brand"
                />
                {errors.brand && (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {errors.brand.message}
                  </Text>
                )}
              </View>

              <View style={{ width: "25%" }}>
                <Text style={styles.headerTitle}>Model</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Model is required",
                    validate: (value) =>
                      !containsContactInfo(value) ||
                      "Do not include phone numbers, email addresses, social media accounts, or links.",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"Hilux"}
                      onBlur={onBlur}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      onChange={onChange}
                      maxLength={25}
                      value={value}
                      styled={[
                        {
                          borderColor: GlobalStyles.Primary_Grey,
                          borderWidth: 1,
                        },
                        styles.bordeR,
                        styles.paddingLg,
                      ]}
                    />
                  )}
                  name="model"
                />
                {errors.model && (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {errors.model.message}
                  </Text>
                )}
              </View>

              <View style={{ width: "25%" }}>
                <Text style={styles.headerTitle}>Year</Text>
                <Controller
                  control={control}
                  rules={{ required: "Year is required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"2019"}
                      onBlur={onBlur}
                      onChange={onChange}
                      maxLength={25}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      value={value}
                      styled={[
                        {
                          borderColor: GlobalStyles.Primary_Grey,
                          borderWidth: 1,
                        },
                        styles.bordeR,
                        styles.paddingLg,
                      ]}
                    />
                  )}
                  name="year"
                />
                {errors.year && (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {errors.year.message}
                  </Text>
                )}
              </View>
              <View style={{ width: "25%" }}>
                <Text style={styles.headerTitle}>more</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"hyrid/An140"}
                      onBlur={onBlur}
                      onChange={onChange}
                      maxLength={25}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      value={value}
                      styled={[
                        {
                          borderColor: GlobalStyles.Primary_Grey,
                          borderWidth: 1,
                        },
                        styles.bordeR,
                        styles.paddingLg,
                      ]}
                    />
                  )}
                  name="more"
                />
                {errors.more && (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {errors.more.message}
                  </Text>
                )}
              </View>
            </View>

            {/* Description details input window */}
            <View style={{ marginTop: 16 }}>
              <Text style={styles.headerTitle}>Details</Text>
              <Controller
                control={control}
                rules={{
                  required: "Details are required",
                  validate: (value) =>
                    !containsContactInfo(value) ||
                    "Do not include phone numbers, email addresses, social media accounts, or links.",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder={
                      "Moteri  igurishwa turaguha guaranty yamezi abiri"
                    }
                    onBlur={onBlur}
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onChange={onChange}
                    maxLength={200}
                    value={value}
                    styled={[
                      {
                        borderColor: GlobalStyles.Primary_Grey,
                        borderWidth: 1,
                        minHeight: 60,
                      },
                      styles.bordeR,
                      styles.paddingLg,
                    ]}
                  />
                )}
                name="description"
              />
              {errors.description && (
                <Text style={{ color: "red", fontSize: 11 }}>
                  {errors.description.message}
                </Text>
              )}
            </View>

            {/* Pricing block */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginTop: 16, width: "70%" }}>
                <Text style={styles.headerTitle}>Price (optional)</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"300,000 RWF"}
                      onBlur={onBlur}
                      maxLength={20}
                      keyBoardType={"numeric"}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      onChange={onChange}
                      value={value}
                      styled={[
                        {
                          borderColor: GlobalStyles.Primary_Grey,
                          borderWidth: 1,
                        },
                        styles.bordeR,
                        styles.paddingLg,
                      ]}
                    />
                  )}
                  name="price"
                />
              </View>

              <View style={{ alignSelf: "flex-end", height: 50, width: 90 }}>
                <Controller
                  control={control}
                  name="currency"
                  render={({ field: { onChange, value } }) => (
                    <AppDropdown
                      value={value}
                      items={currencyItems}
                      open={openDropdown}
                      setOpen={setOpenDropdown}
                      setItems={setCurrencyItems}
                      setValue={(callback) => {
                        const newValue =
                          typeof callback === "function"
                            ? callback(value)
                            : callback;

                        onChange(newValue);
                      }}
                    />
                  )}
                />
              </View>
            </View>

            {/* Submission Actions Row */}
            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-between",
                  marginTop: 30,
                  marginBottom: 20,
                },
              ]}
            >
              <Button
                onPress={() => {
                  setIsVisible(false);
                }}
                content="Cancel"
                disable={isPendingDeal}
                styles={[
                  styles.bordeR,
                  styles.paddingLg,

                  {
                    borderColor: GlobalStyles.Primary_Grey,
                    borderWidth: 1,
                    width: "90%",

                    alignItems: "center",
                  },
                ]}
              />
              <Button
                onPress={handleSubmit(submitHandler)}
                // disable={isPending}
                disable={isPendingDeal}
                content="Submit "
                styles={[
                  {
                    backgroundColor: GlobalStyles.Primary_Yellow,
                    width: "90%",

                    alignItems: "center",
                  },
                  styles.bordeR,
                  styles.paddingLg,
                ]}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// Layout sheet specifically managing overlay positions alongside your inherited core styles
const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
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
  },
  paddingLg: {
    padding: 8,
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
