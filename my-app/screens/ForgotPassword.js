import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { supabase } from "../_lib/supabase";
import { useRequireToken } from "../_CustomHooks/Authentication";
import { GlobalStyles } from "../Constants";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });
  const { mutate, isPending, error } = useRequireToken();
  const Navigation = useNavigation();
  async function handleForgotPassword(data) {
    if (data?.email) {
      mutate(
        { email: data?.email?.trim() },
        {
          onSuccess: async () => {
            Navigation.reset({
              routes: [
                {
                  name: "PasswordTokenPage",
                  params: {
                    email: data?.email,
                  },
                },
              ],
            });
          },
        },
      );
      return;
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>

      <Text style={styles.description}>
        Enter the email address associated with your account.
      </Text>
      <Controller
        control={control}
        rules={{ required: "Email is Required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="youremail@gmail.com"
            value={value}
            onChangeText={onChange}
            placeholderTextColor={GlobalStyles.Primary_Grey}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        )}
        name={"email"}
      />
      {errors?.email || error ? (
        <Text style={{ color: "red" }}>
          {errors?.email.message || error?.message}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={handleSubmit(handleForgotPassword)}
        disabled={isPending}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isPending ? "Sending..." : "Send Reset Link"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#000",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
