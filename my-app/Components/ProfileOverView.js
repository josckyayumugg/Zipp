import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import VerificationRow from "./VerficaionRow";
import { useNavigation } from "@react-navigation/native";
import { useLogout } from "../_CustomHooks/Authentication";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";
import { openWebsite } from "../Helpers";
import ErrorPage from "./ErrorPage";

export default function ProfileOverView({ profileId }) {
  const navigation = useNavigation();
  const { mutate, isPending, error, isError } = useLogout();

  const {
    isPendingProfile,
    isErrorProfile,
    errorProfile,
    data: dataProfile,
  } = useGetCurrentProfile(profileId);

  if (isError) {
    return <ErrorPage message={errorProfile.message} />;
  }

  function LogoutHandler() {
    mutate(undefined, {
      onSuccess: () => {
        navigation.navigate("login");
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Logout failed",
          text2: error.message,
        });
      },
    });
  }

  return (
    <View>
      <View
        style={[
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,

            // Android shadow
            elevation: 8,
          },
          styles.bordeR,
        ]}
      >
        <Text style={[styles.bigText, styles.bold, styles.smallMVertical]}>
          <Ionicons name="document" size={18} />
          Verification Status
        </Text>
        <View style={{ flexDirection: "column", gap: 12, padding: 8 }}>
          <VerificationRow title={"Tin Number"} data={dataProfile?.tin} />
          <VerificationRow
            title={"Id Number"}
            data={dataProfile?.nationalId || dataProfile?.id}
          />
        </View>
      </View>
      <View
        style={[
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,

            // Android shadow
            elevation: 8,
          },
          styles.bordeR,
          styles.paddingLg,
          styles.smallMTop,
          styles.smallMVertical,
        ]}
      >
        <Text style={[styles.bigText, styles.bold, styles.smallMVertical]}>
          <Ionicons name="folder" size={18} style={{ marginHorizontal: 8 }} />
          contact information
        </Text>
        <View style={styles.column}>
          <Text>
            <Ionicons name="send-sharp" size={13} />
            {dataProfile?.businessEmail}
          </Text>
          <Text>
            <Ionicons name="phone-portrait-sharp" size={13} />
            {dataProfile?.phone}
          </Text>
          <Text>
            <Ionicons name="location" size={13} />
            {dataProfile?.directions}
          </Text>
          <Pressable
            style={styles.row}
            onPress={() => openWebsite(dataProfile?.website)}
          >
            <Ionicons name="globe" size={13} />

            <Text style={{ color: "blue" }}>{dataProfile?.website}</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,

            // Android shadow
            elevation: 8,

            paddingVertical: 8,

            flexDirection: "column",
            gap: 4,
          },
        ]}
      >
        <Button
          onPress={() => {
            navigation.navigate("Settings");
          }}
          styles={[
            styles.smallMVertical,
            { borderWidth: 1 },
            styles.bordeR,
            styles.paddingLg,
          ]}
          content={
            <Text>
              <Ionicons
                name="settings"
                size={18}
                style={{ marginHorizontal: 8 }}
              />
              Account Settings
            </Text>
          }
        />
        <Button
          onPress={LogoutHandler}
          styles={[
            styles.smallMVertical,
            { borderWidth: 1, borderColor: "red" },
            styles.paddingLg,
            styles.bordeR,
          ]}
          content={<Text style={{ color: "red" }}>Logout</Text>}
        />
      </View>
    </View>
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
  smallMVertical: {
    marginVertical: 8,
  },
  largeMTop: {
    marginTop: 50,
  },
  smallMTop: {
    marginTop: 12,
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
    fontFamily: "Roboto-Light",
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
    fontSize: 20,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
    lineHeight: 16,
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
