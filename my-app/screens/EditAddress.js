import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";
import { useUpdateProfile } from "../_CustomHooks/Authentication";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import InputText from "../Components/TextInput";
import { formatDateTime } from "../Helpers";
import Button from "../Components/Button";
import { queryClient } from "../_lib/queryClient";
import ErrorPage from "../Components/ErrorPage";
import LoadingPaging from "../Components/LoadingPaging";

export default function EditAddress() {
  const {
    data: user,
    isError: isErrorUser,
    error: errorUser,
    isPending: isPendingUser,
  } = useGetCurrentUser();

  const {
    data: profile,
    isError: isErrorProfile,
    error: errorProfile,
    isPending: isPendingProfile,
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
      businessNames: "",
      businessEmail: "",

      phone: "",
      whatsapp: "",
      website: "",
    },
  });
  const { mutate, isPending, isError, error } = useUpdateProfile();

  function submitHandler(data) {
    mutate(
      { id: profile?.id, ...data },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success 👋",
            text2: "Profile Updated successfully!",
            position: "top", // or "bottom"
            visibilityTime: 3000,
          });
          queryClient.invalidateQueries("profile");
        },
      },
    );
  }
  useEffect(() => {
    if (profile) {
      reset({
        phone: profile?.phone,
        whatsapp: profile?.whatsapp,
        businessNames: profile.businessNames,
        businessEmail: profile?.businessEmail,
        website: profile?.website,
      });
    }
  }, [profile]);

  if (error) return <ErrorPage message={error.message} />;
  if (errorProfile) return <ErrorPage message={errorProfile.message} />;
  if (errorUser) return <ErrorPage message={errorUser.message} />;

  if (isPendingUser) return <LoadingPaging />;

  const formattedDate = formatDateTime(profile?.createdAt);
  return (
    <ScrollView style={styles.container}>
      {/* Phones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phone Numbers</Text>

        <View style={{ padding: 8, paddingBottom: 20 }}>
          <Text style={[styles.label]}>Phone</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 60,
              required: "Number is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={[styles.value, { marginBottom: 12 }]}
                onBlur={onBlur}
                placeholder={"078000000"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="phone"
          />
          <Text style={styles.label}>Whatsapp</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 60,
              required: "Whatsapp is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.value}
                onBlur={onBlur}
                placeholder={"078000000"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="whatsapp"
          />
          <Text>{errors?.whatsapp?.message}</Text>
        </View>
      </View>

      {/* Emails */}
      <Text style={styles.sectionTitle}>About business</Text>
      <View
        style={[
          styles.section,
          { padding: 8, flexDirection: "column", gap: 6 },
        ]}
      >
        <View>
          <Text style={styles.label}>businessNames</Text>

          <Controller
            control={control}
            rules={{
              maxLength: 60,
              required: "businessNames is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.value}
                onBlur={onBlur}
                placeholder={"K Smarting Auto"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="businessNames"
          />
          <Text style={{ color: "red" }}>{errors?.businessNames?.message}</Text>
        </View>
        <View>
          <Text style={styles.label}>Email</Text>

          <Controller
            control={control}
            rules={{
              maxLength: 60,
              required: "Your business Email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.value}
                onBlur={onBlur}
                placeholder={"ksmarting@gmail.com"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="businessEmail"
          />
          <Text>{errors?.businessEmail?.message}</Text>
        </View>
        <View>
          <Text style={styles.label}>website link</Text>

          <Controller
            control={control}
            rules={{
              maxLength: 60,
              required: "Your Link website is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.value}
                onBlur={onBlur}
                placeholder={"https//....."}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="website"
          />
          <Text>{errors?.website?.message}</Text>
        </View>
      </View>

      {/* Addresses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About business</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>type</Text>

            <Text style={styles.subValue}>{profile?.type}</Text>
          </View>

          <Ionicons
            name="ellipsis-vertical"
            size={18}
            color={GlobalStyles.Primary_Grey}
          />
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Creation Date</Text>

            <Text style={styles.subValue}>{formattedDate}</Text>
          </View>

          <Ionicons
            name="ellipsis-vertical"
            size={18}
            color={GlobalStyles.Primary_Grey}
          />
        </View>
      </View>
      <Button
        content={"save changes"}
        styles={{ marginHorizontal: "auto" }}
        disable={isPending}
        onPress={handleSubmit(submitHandler)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  section: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    padding: 14,
    backgroundColor: GlobalStyles.Primary_Grey3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  value: {
    fontSize: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
  },

  subValue: {
    color: "gray",
    marginTop: 3,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
  },

  addText: {
    color: GlobalStyles.Primary_Green,
    fontWeight: "600",
  },
});
