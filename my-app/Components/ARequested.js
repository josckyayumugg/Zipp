import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";

import { formatDateTime } from "../Helpers";
import Button from "./Button";

import { Ionicons } from "@expo/vector-icons";
import BecomeButton from "./BecomButton";
import { useNavigation } from "@react-navigation/native";

import ConfirmDeleteRequest from "./ConfirmDeleteRequest";
import { useGetSingleProduct } from "../_CustomHooks/ProductServices";

import { formatNumber } from "../Helpers";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";
import { useGetRelatedResponses } from "../_CustomHooks/ResponseServices";
import { useGetReqResponses } from "../_CustomHooks/ResponseServices";
export default function ARequest({ profileType, stylee, user, Data }) {
  const Navigation = useNavigation();

  const {
    data: response,
    isError: isE,
    error: e,
  } = useGetRelatedResponses(Data?.id);

  const isResponded =
    response?.some((item) => item?.createdBy === user?.id) ?? false;
  if (e) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{e.message}</Text>;
      </View>
    );
  }
  return (
    <View
      style={[
        styles.bordeR,

        styles.paddingLg,
        styles.smallMTop,
        styles.smallMVertical,
        {
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,

          borderWidth: 1,

          margin: 4,
          marginVertical: 8,
          borderColor: GlobalStyles.Primary_Grey,
          shadowRadius: 6,
          paddingVertical: 20,
          // Android shadow
          elevation: 8,
        },
        stylee,
      ]}
    >
      <View style={styles.rowBtn}>
        <View
          style={[
            styles.smallText,
            styles.rowBtn,

            {
              color: styles.Primary_Grey3,
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            },
          ]}
        >
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Ionicons
              name="calendar"
              size={13}
              color={GlobalStyles.Primary_Grey2}
            />
            <Text style={styles.smallT}>{formatDateTime(Data?.createdAt)}</Text>
          </View>

          {isResponded && (
            <Ionicons
              name="checkmark-done-outline"
              size={24}
              color={GlobalStyles.Primary_Green}
            />
          )}
        </View>
      </View>
      <View
        style={[
          {
            flexDirection: "column",
            gap: 8,
            borderBottomColor: GlobalStyles.Primary_Grey3,
            borderBottomWidth: 1,
          },

          styles.paddingLg,
        ]}
      >
        <Text style={[styles.bigText, styles.bold]}>{Data?.name}</Text>
        <Text style={[styles.paragraph, styles.italic, styles.greyT]}>
          {`"${Data?.description}"`}
        </Text>
        <View style={[styles.row, { flexWrap: "wrap", gap: 8 }]}>
          {Data.brand ? (
            <Text
              style={[
                styles.bordeR,
                { borderWidth: 1 },
                styles.paddingSm,
                styles.smallT,
              ]}
            >
              {Data?.brand}
            </Text>
          ) : null}
          {Data.modal ? (
            <Text
              style={[
                styles.bordeR,
                { borderWidth: 1 },
                styles.paddingSm,
                styles.smallT,
              ]}
            >
              {Data?.modal}
            </Text>
          ) : null}
          {Data.year ? (
            <Text
              style={[
                styles.bordeR,
                { borderWidth: 1 },
                styles.paddingSm,
                styles.smallT,
              ]}
            >
              {Data?.year}
            </Text>
          ) : null}
          {Data.more ? (
            <Text
              style={[
                styles.bordeR,
                { borderWidth: 1 },
                styles.paddingSm,
                styles.smallT,
              ]}
            >
              {Data?.more}
            </Text>
          ) : null}
        </View>
        {Data.budget ? (
          <Text style={[styles.paragraph, styles.bold, styles.greenT]}>
            {formatNumber(Data?.budget)}
            {Data.currency}
          </Text>
        ) : null}
      </View>
      {isResponded ? null : (
        <View style={[styles.row]}>
          {profileType === "seller" ? (
            <Button
              onPress={() =>
                Navigation.navigate("Respond", {
                  user,
                  request: Data,
                })
              }
              styles={[
                styles.bordeR,
                styles.paddingLg,

                {
                  backgroundColor: GlobalStyles.Primary_Yellow,
                  borderColor: GlobalStyles.Primary_Yellow,
                  borderWidth: 1,
                },
              ]}
              content={
                <Text style={[{}, styles.bold]}>
                  <Ionicons name="chatbox-outline" size={18} />
                  Respond
                </Text>
              }
            />
          ) : null}
          {profileType === "garage" ? <BecomeButton /> : null}
          {profileType === "buyer" ? <BecomeButton /> : null}
          {profileType === "mechanic" ? <BecomeButton /> : null}
        </View>
      )}
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
    fontWeight: 500,
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
  italic: {
    fontFamily: "Roboto-italic",
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
    color: GlobalStyles.Primary_Grey5,
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
