import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { GlobalStyles } from "../Constants";
import { useSignUp } from "../_CustomHooks/Authentication";
import { Ionicons } from "@expo/vector-icons";
import InputText from "../Components/TextInput";
import Button from "../Components/Button";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

export default function SignUp() {
  const Navigation = useNavigation();

  // 1. Initializing React Hook Form with default values
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });
  const { mutate, isError, isPending, error, isSuccess } = useSignUp();

  // 2. Submit handler matching your login structure
  function signUpHandler(data) {
    mutate(data, {
      onSuccess: (spData) => {
        Navigation.navigate("Configuration", {
          userId: spData.user.id,
          email: spData.user.email,
        });
      },
    });
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
        {/* Top Header Branding Block */}
        <View style={[styles.blackBg, styles.headerBranding]}>
          <Ionicons
            name="person-add-outline"
            size={50}
            color={GlobalStyles.Primary_Yellow}
          />
          <Text style={[styles.mainTitle, styles.whiteT]}>Create Account</Text>
          <Text style={[styles.paragraph, styles.greyT]}>
            Join our automotive parts marketplace
          </Text>
        </View>

        {/* Input Form Fields Box */}
        <View style={styles.formContainer}>
          {/* FULL NAME INPUT FIELD */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              FULL NAME
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
                rules={{ required: "Invalid name" }}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder={"John Doe"}
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>

          {/* EMAIL ADDRESS INPUT FIELD */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              EMAIL ADDRESS
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
                  required: "Invalid email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email layout",
                  },
                }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder={"yourEmail@gmail.com"}
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

          {/* PASSWORD INPUT FIELD */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.smallT, styles.bold, { marginBottom: 6 }]}>
              PASSWORD
            </Text>
            <View style={[styles.row, styles.bordeR, styles.inputFieldOuter]}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={GlobalStyles.Primary_Grey}
                style={styles.iconSpacer}
              />
              <Controller
                control={control}
                rules={{
                  required: "Invalid password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder={"******"}
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    secureTextEntry
                    styled={[{ width: "90%" }]}
                  />
                )}
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
          {isError && (
            <Text style={{ color: "red", marginTop: 10 }}>{error.message}</Text>
          )}
          {/* Core Submit Button */}
          <Button
            disable={isPending}
            content={
              <Text
                style={[
                  styles.bold,
                  styles.whiteT,
                  { textAlign: "center", fontSize: 16 },
                ]}
              >
                {isPending ? "Creating user..." : "Register"}
              </Text>
            }
            onPress={handleSubmit(signUpHandler)}
            styles={[styles.bordeR, styles.submitButton]}
          />

          {/* Switch View Navigation Footer Link */}
          <View
            style={[
              styles.row,
              { justifyContent: "center", marginTop: 20, paddingBottom: 20 },
            ]}
          >
            <Text style={styles.Roboto}>Already have an account? </Text>
            <Button
              content={
                <Text style={[styles.bold, styles.yellow]}>Sign In</Text>
              }
              onPress={() => Navigation.navigate("login")}
              styles={[
                {
                  backgroundColor: "transparent",
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                },
              ]}
            />
          </View>
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
  headerBranding: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 45,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  formContainer: {
    padding: 24,
    marginTop: 10,
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
  iconSpacer: {
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: GlobalStyles.Black,
    paddingVertical: 14,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 11,
    marginTop: 4,
  },

  // Styles cleanly mirrored from your application's setup
  mainTitle: {
    fontFamily: "Roboto-Extrabold",
    fontSize: 35,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  smallT: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
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
  greyT: {
    color: GlobalStyles.Primary_Grey,
  },
  yellow: {
    color: GlobalStyles.Primary_Yellow,
  },
  blackBg: {
    backgroundColor: GlobalStyles.Black,
  },
  bordeR: {
    borderRadius: 12,
    overflow: "hidden",
  },
});
