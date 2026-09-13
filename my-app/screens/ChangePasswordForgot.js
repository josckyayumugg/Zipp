import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useGetCurrentUser, useLogin } from "../_CustomHooks/Authentication";
import { useUpdateUser } from "../_CustomHooks/Authentication";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import { Controller, useForm } from "react-hook-form";
import InputText from "../Components/TextInput";
import ErrorPage from "../Components/ErrorPage";
import LoadingPaging from "../Components/LoadingPaging";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function ChangeForgottenPassword() {
  const [showCurrent, setShowCurrent] = useState(true);
  const [showNewP, setShowNewP] = useState(true);
  const [showConfirm, setConfirm] = useState(true);
  const route = useRoute();
  const Navigation = useNavigation();
  const {
    isPendingUser,
    data: user,
    isError: isErrorUser,
    error: errorUser,
  } = useGetCurrentUser();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useUpdateUser();

  if (isErrorUser) {
    return <ErrorPage message={errorUser.message} />;
  }
  if (isPendingUser) {
    return <LoadingPaging />;
  }

  const email = route?.params?.email;
  function submitHandler(data) {
    mutateUpdate(
      { email: user?.email, password: data?.newPassword },
      {
        onSuccess: async () => {
          Toast.show({
            type: "success",
            text1: "Success 👋",
            text2: "Password Updated successfully!",
            position: "top", // or "bottom"
            visibilityTime: 3000,
          });
          Navigation.navigate("Tabs", {
            screen: "Home",
          });
        },
      },
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>New Password</Text>
        <View style={{ flexDirection: "row" }}>
          <Controller
            control={control}
            rules={{
              maxLength: 60,
              required: "New password is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.input}
                onBlur={onBlur}
                placeholder={"**********"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
                secure={showNewP}
              />
            )}
            name="newPassword"
          />
          <Pressable
            style={{ alignSelf: "center" }}
            onPress={() => {
              setShowNewP((val) => !val);
            }}
          >
            <Ionicons
              name={showNewP ? "eye-off" : "eye"}
              size={14}
              color={"grey"}
              style={{ marginVertical: "auto" }}
            />
          </Pressable>
        </View>
        {errors?.newPassword && (
          <Text style={[{ color: "red", fontSize: 12 }]}>
            {errors?.newPassword?.message}
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={{ flexDirection: "row" }}>
          <Controller
            control={control}
            rules={{
              required: "please confirm your new password",
              maxLength: 60,
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.input}
                onBlur={onBlur}
                placeholder={"**********"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
                secure={showConfirm}
              />
            )}
            name="confirmPassword"
          />
          <Pressable
            onPress={() => setConfirm((val) => !val)}
            style={{ alignSelf: "center" }}
          >
            <Ionicons
              name={showConfirm ? "eye-off" : "eye"}
              size={16}
              color={"grey"}
            />
          </Pressable>
        </View>
        {errors?.confirmPassword && (
          <Text style={{ color: "red" }}>
            {errors.confirmPassword?.message}
          </Text>
        )}
      </View>
      {isErrorUpdate ? (
        <Text style={{ color: "red" }}>{errorUpdate?.message}</Text>
      ) : null}
      <Pressable
        style={styles.button}
        onPress={handleSubmit(submitHandler)}
        disabled={isPendingUpdate}
      >
        <Text style={styles.buttonText}>
          {isPendingUpdate ? "Saving Changes..." : "Save Changes"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    height: 50,
  },

  note: {
    marginTop: 10,
    color: "#666",
    fontSize: 13,
  },

  button: {
    marginTop: 30,
    backgroundColor: GlobalStyles.Primary_Green,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
