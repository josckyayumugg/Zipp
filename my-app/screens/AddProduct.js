import React from "react";
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
import * as ImageManipulator from "expo-image-manipulator";
import { GlobalStyles } from "../Constants";
import { supabase } from "../_lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import InputText from "../Components/TextInput";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import LoadingPaging from "../Components/LoadingPaging";
import AppDropdown from "../Components/Dropdown";
import {
  useCreateProduct,
  useGetSingleProduct,
} from "../_CustomHooks/ProductServices";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useEditProduct } from "../_CustomHooks/ProductServices";
import { containsContactInfo } from "../Helpers";
import BecomeButton from "../Components/BecomButton";

import {
  useGetCurrentProfile,
  useGetCurrentUser,
} from "../_CustomHooks/Authentication";
import { useCreateProductDeal } from "../_CustomHooks/ProductServices";
import Profile from "./Profile";

export default function AddProduct({ route, navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);
  const productId = route.params?.productId;

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
      more: "",
      details: "",
      condition: "",
      type: "",
      currency: "RWF",
      brand: "",
      price: "",
      profileId: "",
    },
  });
  /////////////
  const [currencyItems, setCurrencyItems] = useState([
    { label: "RWF 🇷🇼", value: "RWF" },
    { label: "USD 🇺🇸", value: "USD" },
    { label: "EUR 🇪🇺", value: "EUR" },
    { label: "GBP 🇬🇧", value: "GBP" },
  ]);
  const [typeItems, setIsTypeItem] = useState([
    { label: "Body part(ibice by'imodoka)", value: "RWF" },
    { label: "Engine(moteri)", value: "engine" },
    { label: "Electricity", value: "electricity" },
    { label: "Light(amatara)", value: "light" },
    { label: "Brakes(Feri)", value: "brakes" },
    { label: "Suspension", value: "suspension" },
    { label: "others(ibindi", value: "others" },
  ]);
  const [conditionItem, setIsConditionItem] = useState([
    { label: "New(nshyashya)", value: "new" },
    { label: "used(okaziyo)", value: "used" },
    { label: "refurbished(yasubiwemo)", value: "refurbished" },
  ]);

  // About Editing
  useEffect(() => {
    if (productId) {
      setIsEditing(true);
      setValue("productId", productId);
    }
  }, [productId, setValue]);

  const {
    data: editProduct,
    isLoading: editPending,
    isError: editIsError,
    error: editError,
  } = useGetSingleProduct(productId);

  useEffect(() => {
    if (!editProduct || !isEditing) return;

    reset({
      name: editProduct.name,
      brand: editProduct.brand,
      model: editProduct.model,
      year: editProduct.year,
      condition: editProduct.condition,
      type: editProduct.type,
      edit: editProduct.currency,
      details: editProduct.details,
      price: String(editProduct.price),
    });
  }, [editProduct, reset, isEditing]);

  const {
    mutate: mutationEditing,
    isPending: isWaitingEditing,
    isError: isErrorEditing,
    error: EditingError,
  } = useEditProduct(productId);
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
  const {
    data: profile,
    isPending: isPendingProfile,
    isError: isErrorProfile,
    error: errorProfile,
  } = useGetCurrentProfile(user?.id);

  // Pull out the active array state in real time
  const capturedImages = watch("images") || [];
  const Navigation = useNavigation();
  const { mutate, isError, isPending, error } = useCreateProduct();

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
    console.log(1234, data);
    if (isEditing) {
      return mutationEditing(
        { ...data, id: productId },
        {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "Success 👋",
              text2: "Edit was successful!",
              position: "top", // or "bottom"
              visibilityTime: 3000,
            });
            reset({
              name: "",
              brand: "",
              model: "",
              year: "",
              details: "",
              condition: "",
              type: "",
              currency: "RWF",
              price: "",
            });
            setIsEditing(false);
          },
        },
      );
    }
    mutate(
      { ...data, userId },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success 👋",
            text2: "Product added successfully!",
            position: "top", // or "bottom"
            visibilityTime: 3000,
          });
          reset();
        },
      },
    );
  }
  if (editPending || isWaitingEditing) return <LoadingPaging />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView
        style={[{ backgroundColor: "#fff" }]}
        contentContainerStyle={{
          borderTopColor: GlobalStyles.Primary_Grey,
          borderTopWidth: 1,
          padding: 12,
        }}
      >
        <View>
          <Text style={styles.headerTitle}>Product images</Text>
          {/* FIX 1: Safe wrapper View layout around typography icon blocks */}
          {!isEditing && (
            <View style={[styles.row, styles.smallMVertical, { gap: 6 }]}>
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={GlobalStyles.Primary_Green}
              />
              {profile?.type === "seller" ? (
                <Text
                  style={[
                    styles.paragraph,
                    { color: GlobalStyles.Primary_Green },
                  ]}
                >
                  Please provide different angles (Max 4)
                </Text>
              ) : (
                <Text
                  style={[
                    styles.paragraph,
                    styles.italic,
                    { color: GlobalStyles.Kn_orange },
                  ]}
                >
                  Iyi service ni iyabacuruzi gusa
                </Text>
              )}
            </View>
          )}
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
                    style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                  >
                    {index + 1}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        {/* Camera Target Trigger Anchor Panel */}
        {!isEditing && (
          <View
            style={[
              {
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: GlobalStyles.Primary_Grey,
                height: 60,
                alignSelf: "center",
                width: "60%",
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
                required: "Images required",
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
        )}
        {errors.images && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.images.message}
          </Text>
        )}
        {/* Product Title Section */}
        <View style={{ marginTop: 16 }}>
          <Text style={styles.headerTitle}>Product Title</Text>
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
                placeholder={"Izina ry'igicuruzwa"}
                onBlur={onBlur}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
                styled={[
                  { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
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
        <View style={[styles.row, { marginTop: 12 }]}>
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
                  maxLength={50}
                  value={value}
                  styled={[
                    { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
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
                  maxLength={50}
                  value={value}
                  styled={[
                    { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
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
                  maxLength={50}
                  placeholderTextColor={GlobalStyles.Primary_Grey}
                  value={value}
                  styled={[
                    { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
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
                  placeholder={"hybrid/AN120"}
                  onBlur={onBlur}
                  onChange={onChange}
                  maxLength={50}
                  placeholderTextColor={GlobalStyles.Primary_Grey}
                  value={value}
                  styled={[
                    { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
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
                placeholder={"Ni nshyashya,iva Dubai,ikorerwa China........"}
                onBlur={onBlur}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                onChange={onChange}
                maxLength={300}
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
            name="details"
          />
          {errors.details && (
            <Text style={{ color: "red", fontSize: 11 }}>
              {errors.details.message}
            </Text>
          )}
        </View>
        <View
          style={[
            { flexDirection: "row", gap: 20, marginBottom: 30 },
            styles.smallMVertical,
          ]}
        >
          <View
            style={{
              alignSelf: "flex-end",
              flexDirection: "column",
              height: 50,
              width: 150,
            }}
          >
            <Text style={styles.headerTitle}>Type</Text>
            <Controller
              control={control}
              name="type"
              rules={{ required: "Type is required" }}
              render={({ field: { onChange, value } }) => (
                <AppDropdown
                  placeholder="select type"
                  value={value}
                  type={isTypeOpen}
                  items={typeItems}
                  open={openDropdown === "type"}
                  setOpen={(isOpen) => setOpenDropdown(isOpen ? "type" : null)}
                  setItems={setIsTypeItem}
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
          <View
            style={{
              alignSelf: "flex-end",
              height: 50,
              width: 150,
              flexDirection: "column",
            }}
          >
            <Text style={styles.headerTitle}>Conditions</Text>
            <Controller
              control={control}
              name="condition"
              rules={{ required: "Type is required" }}
              render={({ field: { onChange, value } }) => (
                <AppDropdown
                  value={value}
                  isConditionOpen={isConditionOpen}
                  open={openDropdown === "condition"}
                  setOpen={(isOpen) =>
                    setOpenDropdown(isOpen ? "condition" : null)
                  }
                  placeholder="select condition"
                  items={conditionItem}
                  setItems={setIsConditionItem}
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
                  placeholderTextColor={GlobalStyles.Primary_Grey}
                  onChange={onChange}
                  keyBoardType={"numeric"}
                  value={value}
                  styled={[
                    { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
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
                  isCurrencyOpen={isCurrencyOpen}
                  open={openDropdown === "currency"}
                  setOpen={(isOpen) =>
                    setOpenDropdown(isOpen ? "currency" : null)
                  }
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
        {profile?.type === "seller" ? (
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
                Navigation.goBack();
              }}
              content="Cancel"
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
              disable={isPending}
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
        ) : (
          <BecomeButton
            styles={[
              {
                backgroundColor: GlobalStyles.Primary_Green,
                width: "100%",
                marginVertical: 30,
                alignItems: "center",
              },
              styles.bordeR,
              styles.paddingLg,
            ]}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  italic: {
    fontFamily: "Roboto-italic",
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
  headerTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 18,
    paddingBottom: 4,
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
    backgroundColor: GlobalStyles.Primary_Yellow2,
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
