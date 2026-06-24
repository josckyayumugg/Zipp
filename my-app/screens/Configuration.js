import React, { useId } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import InputText from "../Components/TextInput";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useCreateProfile } from "../_CustomHooks/Authentication";

export default function ConfigureProfile({ route, navigation }) {
  const Navigation = useNavigation();
  const { userId } = route.params;
  console.log(333, userId);

  // 1. Setup form fields with clear validation hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      businessNames: "",
      ownerNames: "",
      whatsapp: "",
      email: "",
      tin: "",
      website: "",
      directions: "",
    },
  });

  const { mutate, isPending, isError, error } = useCreateProfile();
  // 2. Profile configuration submit action
  function saveProfileHandler(data) {
    mutate(
      { ...data, userId },
      {
        onSuccess: () => {
          Navigation.navigate("Tabs");
        },
      },
    );
  }
  if (isError) {
    console.log(error);
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Full Clean White Background Header Setup */}
        <View style={styles.whiteHeaderBranding}>
          <Ionicons
            name="options-outline"
            size={48}
            color={GlobalStyles.Black || "black"}
          />
          <Text style={[styles.mainTitle, styles.blackT]}>
            Configure Profile
          </Text>
          <Text
            style={[styles.paragraph, styles.greyT, { textAlign: "center" }]}
          >
            Set up your business presence to start receiving part requests
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* BUSINESS NAME */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              BUSINESS NAME *
            </Text>
            <View style={[styles.row, styles.bordeR, styles.inputFieldOuter]}>
              <Ionicons
                name="briefcase-outline"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={styles.iconSpacer}
              />
              <Controller
                control={control}
                rules={{ required: "Business name is required" }}
                name="businessNames"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder="e.g., Kigali Auto Spares Ltd"
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
            {errors.businessNames && (
              <Text style={styles.errorText}>
                {errors.businessNames.message}
              </Text>
            )}
          </View>
          {/* OWNER'S FULL NAME */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              OWNER'S FULL NAME *
            </Text>
            <View style={[styles.row, styles.bordeR, styles.inputFieldOuter]}>
              <Ionicons
                name="person-outline"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={styles.iconSpacer}
              />
              <Controller
                control={control}
                rules={{ required: "Owner's name is required" }}
                name="ownerNames"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder="John Doe"
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
            {errors.ownerNames && (
              <Text style={styles.errorText}>{errors.ownerNames.message}</Text>
            )}
          </View>
          {/* WHATSAPP PHONE NUMBER */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              WHATSAPP NUMBER *
            </Text>
            <View style={[styles.row, styles.bordeR, styles.inputFieldOuter]}>
              <Ionicons
                name="logo-whatsapp"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={styles.iconSpacer}
              />
              <Controller
                control={control}
                rules={{ required: "WhatsApp contact number is required" }}
                name="whatsapp"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder="e.g., 0788000000"
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    keyboardType="phone-pad"
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
            {errors.whatsapp && (
              <Text style={styles.errorText}>{errors.whatsapp.message}</Text>
            )}
          </View>
          {/* EMAIL ADDRESS */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              BUSINESS EMAIL ADDRESS *
            </Text>
            <View style={[styles.row, styles.bordeR, styles.inputFieldOuter]}>
              <Ionicons
                name="mail-outline"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={styles.iconSpacer}
              />
              <Controller
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email layout",
                  },
                }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder="business@gmail.com"
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
          {/* TIN NUMBER */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              TIN NUMBER (TAX ID) *
            </Text>
            <View style={[styles.row, styles.bordeR, styles.inputFieldOuter]}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={styles.iconSpacer}
              />
              <Controller
                control={control}
                rules={{ required: "TIN identification is required" }}
                name="tin"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder="Enter 9-digit TIN number"
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    keyboardType="number-pad"
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
            {errors.tin && (
              <Text style={styles.errorText}>{errors.tin.message}</Text>
            )}
          </View>
          {/* WEBSITE LINK */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              WEBSITE LINK (OPTIONAL)
            </Text>
            <View style={[styles.row, styles.bordeR, styles.inputFieldOuter]}>
              <Ionicons
                name="globe-outline"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={styles.iconSpacer}
              />
              <Controller
                control={control}
                name="website"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder="https://www.yourwebsite.com"
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    autoCapitalize="none"
                    keyboardType="url"
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
          </View>
          {/* DIRECTIONS / PHYSICAL LOCATION */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              DIRECTIONS / PHYSICAL ADDRESS *
            </Text>
            <View
              style={[
                styles.row,
                styles.bordeR,
                styles.inputFieldOuter,
                styles.textAreaHeight,
              ]}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={[
                  styles.iconSpacer,
                  { alignSelf: "flex-start", marginTop: 14 },
                ]}
              />
              <Controller
                control={control}
                rules={{
                  required: "Directions are required to help drivers find you",
                }}
                name="directions"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder="e.g., Nyabugogo, Matteus Building, Shop No. 12"
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    multiline={true}
                    numberOfLines={3}
                    styled={[
                      { width: "90%", height: 75, textAlignVertical: "top" },
                    ]}
                  />
                )}
              />
            </View>
            {errors.directions && (
              <Text style={styles.errorText}>{errors.directions.message}</Text>
            )}
          </View>
          <View>
            {isError && (
              <Text style={[styles.paragraph, { text: "red" }]}>
                {error.message}
              </Text>
            )}
          </View>
          <Text style={styles.paragraph}>
            Core Configuration Save Action Button
          </Text>
          <Button
            onPress={handleSubmit(saveProfileHandler)}
            styles={[
              styles.submitButton,
              styles.bordeR,
              {
                marginTop: 40,
                width: "100%",

                height: 60,
                textAlignVertical: "top",
              },
            ]}
            disable={isPending}
            content={
              <Text style={[styles.whiteT, { width: "100%", fontSize: 16 }]}>
                {isPending
                  ? "...creating Profile"
                  : "Save Profile Configuration"}
              </Text>
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
  },
  whiteHeaderBranding: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  formContainer: {
    padding: 24,
    backgroundColor: "white",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputFieldOuter: {
    borderColor: GlobalStyles.Primary_Grey,
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 12,
    height: 50,
  },
  textAreaHeight: {
    height: 90,
    alignItems: "flex-start",
  },
  iconSpacer: {
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: GlobalStyles.Black || "black",
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 30,
  },
  errorText: {
    color: "red",
    fontSize: 11,
    marginTop: 4,
  },

  // Consistent typography tokens matched from your setup
  mainTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 32,
    textAlign: "center",
    marginTop: 12,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 15,
    marginTop: 4,
  },
  smallT: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
  },
  bold: {
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  whiteT: {
    color: "white",
  },
  blackT: {
    color: "black",
  },
  greyT: {
    color: GlobalStyles.Primary_Grey,
  },
  bordeR: {
    borderRadius: 12,
    overflow: "hidden",
  },
});
