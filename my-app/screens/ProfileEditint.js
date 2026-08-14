import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Components/Button";
import { GlobalStyles } from "../Constants";
import { useForm, Controller } from "react-hook-form";
import InputText from "../Components/TextInput";
import { useUpdateProfile } from "../_CustomHooks/Authentication";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { queryClient } from "../App";
import {
  useGetCurrentProfile,
  useGetCurrentUser,
} from "../_CustomHooks/Authentication";
import ErrorPage from "../Components/ErrorPage";
import LoadingPaging from "../Components/LoadingPaging";

export default function EditProfile() {
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
      sellerNames: "",
      directions: "",
      tin: "",
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
        },
      },
      queryClient.invalidateQueries("profile"),
    );
  }
  useEffect(() => {
    if (profile) {
      reset({
        sellerNames: profile.sellerNames,
        directions: profile.directions,
        tin: profile.tin,
      });
    }
  }, [profile]);

  if (isError) return <ErrorPage message={error.message} />;
  if (isErrorProfile) return <ErrorPage message={errorProfile.message} />;
  if (isErrorUser) return <ErrorPage message={isErrorUser.message} />;

  if (isPendingUser) return <LoadingPaging />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={50} color={GlobalStyles.Primary_Grey} />
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View>
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 60,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.input}
                onBlur={onBlur}
                placeholder={"jean claude"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="sellerNames"
          />
        </View>
        <View>
          <Text style={styles.label}>Location</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 60,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.input}
                onBlur={onBlur}
                placeholder={"Kigali,Gasabo,Gatsata,KG 774 street"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="directions"
          />
        </View>
        <View>
          <Text style={styles.label}>Tin number</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 60,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                styled={styles.input}
                onBlur={onBlur}
                placeholder={"112400409"}
                maxLength={50}
                placeholderTextColor={GlobalStyles.Primary_Grey}
                value={value}
                onChange={onChange}
              />
            )}
            name="tin"
          />
        </View>
      </View>

      {/* Account Type */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Type</Text>

        <View style={styles.roleBox}>
          <Text>{profile?.type}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>ID</Text>

        <View style={styles.roleBox}>
          <Text>{profile?.id}</Text>
        </View>
      </View>

      <Button
        content="Save Changes"
        styles={styles.saveBtn}
        onPress={handleSubmit(submitHandler)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 40,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: GlobalStyles.Primary_Grey3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  changePhotoBtn: {
    height: 40,
    borderRadius: 8,
  },

  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Roboto-semibold",
    marginBottom: 12,
  },

  label: {
    marginBottom: 6,
    fontFamily: "Roboto-semibold",
  },

  input: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontFamily: "Roboto-Light",
  },

  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },

  roleBox: {
    padding: 12,
    backgroundColor: GlobalStyles.Primary_Grey3,
    borderRadius: 8,
  },

  saveBtn: {
    marginTop: 10,
    height: 50,
    borderRadius: 10,
  },
});
