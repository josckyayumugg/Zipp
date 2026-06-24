import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { GlobalStyles } from "../Constants";
import { supabase } from "../_lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import InputText from "../Components/TextInput";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../_CustomHooks/Authentication";
import { useForm, Controller } from "react-hook-form";

export default function Login() {
  const Navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const { mutate, isError, isPending, error, isSuccess } = useLogin();
  function loginHandler(data) {
    mutate(data, {
      onSuccess: async () => {
        // 🔥 check session after login
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          Navigation.reset({
            index: 0,
            routes: [{ name: "Tabs" }],
          });
        } else {
          console.log("kigoye");
        }
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
        <View style={[styles.blackBg, styles.headerBranding]}>
          <Ionicons
            name="car-outline"
            size={60}
            color={GlobalStyles.Primary_Yellow}
          />
          <Text style={[styles.mainTitle, styles.whiteT]}>Welcome Back</Text>
          <Text style={[styles.paragraph, styles.greyT]}>
            Sign in to continue exploring parts
          </Text>
        </View>

        <View style={styles.formContainer}>
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
                rules={{ required: "invalid Email" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder={"yourEmail@gmail.com"}
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    styled={[{ width: "90%" }]}
                  />
                )}
                name="email"
              />
            </View>
            {errors.email && (
              <Text style={{ color: "red", fontSize: 11 }}>
                {errors.email.message}
              </Text>
            )}
          </View>

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
                rules={{ required: "invalid password" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    placeholder={"******"}
                    placeholderTextColor={GlobalStyles.Primary_Grey}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    styled={[{ width: "90%" }]}
                  />
                )}
                name="password"
              />
            </View>
            {errors.password && (
              <Text style={{ color: "red", fontSize: 11 }}>
                {errors.password.message}
              </Text>
            )}
          </View>
          {isError && (
            <Text style={[styles.paragraph, { color: "red" }]}>
              {error.message}
            </Text>
          )}
          {/* Core Action Button Trigger */}
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
                {isPending ? "...loading" : "login"}
              </Text>
            }
            onPress={handleSubmit(loginHandler)}
            styles={[styles.bordeR, styles.submitButton]}
          />

          {/* Navigation Redirection Path */}
          <View
            style={[styles.row, { justifyContent: "center", marginTop: 20 }]}
          >
            <Text style={styles.Roboto}>Don't have an account? </Text>
            <Button
              content={
                <Text style={[styles.bold, styles.yellow]}>Register</Text>
              }
              onPress={() => {
                Navigation.navigate("signUp");
              }}
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
    paddingVertical: 50,
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

  // Explicitly copied style properties from your Home matrix
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
  bordeR: {
    borderRadius: 12,
    overflow: "hidden",
  },
});
