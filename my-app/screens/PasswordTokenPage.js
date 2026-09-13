import React3 from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useConfirm, useConfirmPassword } from "../_CustomHooks/Authentication";
import { supabase } from "../_lib/supabase";
import { useForm, Controller } from "react-hook-form";
import InputText from "../Components/TextInput";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../Constants";
import { useRoute } from "@react-navigation/native";
import ErrorPage from "../Components/ErrorPage";
export default function PasswordTokenPage({ navigation }) {
  const route = useRoute();
  const Navigation = useNavigation();

  const email = route?.params?.email;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { token: "" } });
  const { mutate, isPending, error } = useConfirmPassword();

  function submitHandler(data) {
    mutate(
      { email: email, token: data?.token },
      {
        onSuccess: async () => {
          // 🔥 check session after login

          Navigation.reset({
            index: 0,
            routes: [
              {
                name: "ChangeForgottenPassword",
                params: { type: "ForgotPassword", email: email },
              },
            ],
          });
        },
      },
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Token</Text>
      <Text style={styles.description}>Enter digits sent to you email</Text>
      <Text
        style={[
          styles.description,
          { color: GlobalStyles.Primary_Green, marginBottom: 8 },
        ]}
      >
        Shyiramo imibare yoherejwe kuri email yawe
      </Text>

      <View>
        <Controller
          control={control}
          rules={{ required: "invalid Email" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              placeholder={"*****"}
              placeholderTextColor={GlobalStyles.Primary_Grey}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              styled={[{ width: "90%" }, styles.input]}
            />
          )}
          name="token"
        />
        {errors.token ? (
          <Text style={{ color: "red" }}>{errors.token.message}</Text>
        ) : null}
      </View>
      {error ? (
        <Text
          style={{ color: "red", fontSize: 14, fontFamily: "Roboto-regular" }}
        >
          {error?.message}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={handleSubmit(submitHandler)}
        disabled={isPending}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isPending ? "verifying..." : "Verify"}
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
    marginVertical: 4,
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
