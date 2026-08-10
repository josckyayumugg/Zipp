import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { useCreateResponse } from "../_CustomHooks/ResponseServices";
import { queryClient } from "../App";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useGetReqResponse } from "../_CustomHooks/ResponseServices";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import InputText from "../Components/TextInput";
import AppDropdown from "../Components/Dropdown";
import Button from "../Components/Button";
import { containsContactInfo } from "../Helpers";
// import Picked from "../Components/Picker";
import { useGetReqResponses } from "../_CustomHooks/ResponseServices";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";
import LoadingPaging from "../Components/LoadingPaging";

export default function RespondToRequest() {
  const route = useRoute();
  const navigation = useNavigation();
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [currencyItems, setCurrencyItems] = useState([
    { label: "RWF 🇷🇼", value: "RWF" },
    { label: "USD 🇺🇸", value: "USD" },
    { label: "EUR 🇪🇺", value: "EUR" },
    { label: "GBP 🇬🇧", value: "GBP" },
  ]);

  const { request } = route?.params;

  const {
    data: user,
    isPending: isPendingAuth,
    isError: isErrorAuth,
    error: errorAuth,
  } = useGetCurrentUser();
  const {
    data: Responses,
    isError: isErrorResponse,
    isPending: isPendingResponses,
    error: errorResponse,
  } = useGetReqResponses();

  const {
    data: userData,
    isError: isErrorUser,
    error: errorUser,
    isPending: isPendingUser,
  } = useGetCurrentProfile(user?.id);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: "",
      condition: "",
      note: "",
      currency: "RWF",
      location: "",
      businessNames: "",
    },
  });

  const [conditionItem, setIsConditionItem] = useState([
    { label: "New(nshyashya)", value: "new" },
    { label: "used(okaziyo)", value: "used" },
    { label: "refurbished(yasubiwemo)", value: "refurbished" },
  ]);

  const { mutate, isError, error, isPending } = useCreateResponse(request.id);
  function submitOfferHandler(data) {
    mutate(
      {
        ...data,
        createdBy: user?.id,
        request: request.id,
        location: userData?.directions,
        businessNames: userData?.businessNames,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success 👋",
            text2: "Response was created successfully!",
            position: "top",
            visibilityTime: 3000,
          });

          reset({
            price: "",
            condition: "",
            note: "",
            currency: "RWF",
            location: "",
            businessNames: "",
          });

          queryClient.invalidateQueries({
            queryKey: ["responses", user.id],
          });

          navigation.goBack();
        },

        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Failed to create response",
            text2: error?.message || "Something went wrong.",
            position: "top",
            visibilityTime: 4000,
          });
        },
      },
    );
  }
  /////creaeting the response//
  if (isErrorAuth) {
    return (
      <View style={styles.centered}>
        <Text>Couldn't verify your account. Please try again.</Text>
      </View>
    );
  }

  if (isErrorResponse) {
    return (
      <View style={styles.centered}>
        <Text>Couldn't load responses. Please try again.</Text>
      </View>
    );
  }

  if (isErrorUser) {
    return (
      <View style={styles.centered}>
        <Text>Couldn't load your profile. Please try again.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView contentContainerStyle={styles.containerStyle}>
        {/* Dynamic header detail section card */}
        <View style={styles.requestOverviewCard}>
          <Text style={styles.labelSubText}>
            You are providing an offer for:
          </Text>
          <Text style={styles.targetItemName}>{request?.name}</Text>
        </View>

        {/* Form Container Structure */}
        <View style={{ marginTop: 16, gap: 16 }}>
          {/* Form Row 1: Price Entry Input Field */}
          <View>
            <Text style={styles.fieldLabelTitle}>Your Price Offer</Text>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <View style={{ width: "70%" }}>
                <Controller
                  control={control}
                  rules={{
                    maxLength: 30,
                    required: "Price is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputText
                      placeholder={"500 000"}
                      onBlur={onBlur}
                      maxLength={50}
                      placeholderTextColor={GlobalStyles.Primary_Grey}
                      value={value}
                      keyBoardType={"numeric"}
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
                  name="price"
                />
                {errors.price && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {errors.price.message}
                  </Text>
                )}
              </View>
              <View
                style={{
                  height: 80,
                  width: 100,
                  marginTop: 8,
                  alignSelf: "flex-start",
                }}
              >
                <Controller
                  control={control}
                  name="currency"
                  render={({ field: { onChange, value } }) => (
                    // <Picked
                    //   selectedValue={value}
                    //   options={[
                    //     { label: "RWF 🇷🇼", value: "RWF" },
                    //     { label: "USD 🇺🇸", value: "USD" },
                    //     { label: "EUR 🇪🇺", value: "EUR" },
                    //     { label: "GBP 🇬🇧", value: "GBP" },
                    //   ]}
                    // />
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
          </View>

          {/* Form Row 2: Condition Parameter Tag Box */}
          <View>
            <Text style={styles.fieldLabelTitle}>Part Condition / Status</Text>

            <Controller
              control={control}
              name="condition"
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
            {errors.condition && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.condition.message}
              </Text>
            )}
          </View>

          {/* Form Row 3: Additional details textarea entry block */}
          <View>
            <Text style={styles.fieldLabelTitle}>
              Additional Notes (Colors, warranty, conditions)
            </Text>

            <Controller
              control={control}
              rules={{
                required: "Notes are required",
                maxLength: 100,
                validate: (value) =>
                  !containsContactInfo(value) ||
                  "Do not include phone numbers, email addresses, social media accounts, or links.",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  placeholder={"Delivery,stock,ibara,garanti"}
                  onBlur={onBlur}
                  placeholderTextColor={GlobalStyles.Primary_Grey}
                  value={value}
                  onChange={onChange}
                  maxLength={100}
                  styled={[
                    {
                      borderColor: GlobalStyles.Primary_Grey,
                      borderWidth: 1,
                      height: "80",
                    },
                    styles.paddingLg,
                  ]}
                />
              )}
              name="note"
            />
            {errors.note && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.note.message}
              </Text>
            )}
          </View>
        </View>

        {/* Action Controls Footer Grid Layout */}
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", marginTop: 40 },
          ]}
        >
          <Button
            content="Discard"
            onPress={() => navigation && navigation.goBack()}
            styles={[
              styles.paddingLg,
              styles.bordeR,
              {
                borderColor: GlobalStyles.Primary_Grey,
                borderWidth: 1,
                width: "90%",
                alignItems: "center",
              },
            ]}
          />
          <Button
            onPress={handleSubmit(submitOfferHandler)}
            content="Send Offer"
            disable={isPending}
            styles={[
              styles.paddingLg,
              styles.bordeR,
              {
                backgroundColor: GlobalStyles.Primary_Yellow,
                width: "90%",

                alignItems: "center",
              },
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 16,
  },
  requestOverviewCard: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    borderRadius: 8,
    padding: 14,
  },
  labelSubText: {
    color: "#666",
    fontSize: 12,
    fontFamily: "Roboto-Light",
  },
  targetItemName: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
    fontWeight: "700",
    color: "black",
    marginTop: 4,
  },
  fieldLabelTitle: {
    fontFamily: "Roboto-semibold",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  centered: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  customInputField: {
    borderColor: GlobalStyles.Primary_Grey,
    borderWidth: 1,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  bordeR: {
    borderRadius: 8,
    overflow: "hidden",
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
