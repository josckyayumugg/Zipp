import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../Constants";
import { formatDateTime } from "../Helpers";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../Helpers";
export default function ARequest({
  user,
  onEdit,
  onDelete,
  profileType,
  stylee,
  Data,
  id,
}) {
  const Navigation = useNavigation();

  return (
    <View
      style={[
        styles.bordeR,

        styles.paddingLg,
        styles.smallMTop,
        styles.smallMVertical,

        {
          shadowOffset: {
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
          flexDirection: "column",
        },
        stylee,
      ]}
    >
      <View style={[styles.rowBtn, { width: "100%" }]}>
        <View
          style={[
            styles.smallText,
            styles.rowBtn,

            {
              color: styles.Primary_Grey3,
              flexDirection: "row",
              width: "40%",

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
        </View>

        <View
          style={[
            styles.smallT,
            styles.row,

            {
              color: styles.Primary_Grey3,
              gap: 8,
              width: "40%",
            },
          ]}
        >
          <Pressable
            onPress={onEdit}
            style={[
              styles.bordeR,
              styles.paddingSm,
              {
                borderWidth: 1,
                borderColor: GlobalStyles.Primary_Grey,

                width: "50%",
              },
            ]}
          >
            <View style={styles.row}>
              <Ionicons name="pencil-outline" size={12} color={"black"} />
              <Text style={styles.smallT}>Edit</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={onDelete}
            style={[
              styles.bordeR,
              styles.paddingSm,
              { borderWidth: 1, borderColor: GlobalStyles.Primary_Grey },
            ]}
          >
            <View style={styles.row}>
              <Ionicons name="trash-bin-outline" size={12} color={"black"} />
              <Text style={styles.smallT}>Delete</Text>
            </View>
          </Pressable>
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
          {Data?.brand ? (
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
          {Data?.modal ? (
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
          {Data?.year ? (
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
          {Data?.more ? (
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
        {Data?.budget ? (
          <Text style={[styles.paragraph, styles.bold, styles.greenT]}>
            {formatNumber(Data?.budget)}
            {Data?.currency}
          </Text>
        ) : null}
      </View>
      <View style={[styles.row]}>
        <Button
          onPress={() =>
            Navigation.navigate("Replies", {
              requestId: Data?.id,
              requestName: Data?.name,
            })
          }
          styles={[
            styles.bordeR,
            styles.paddingLg,

            {
              backgroundColor: GlobalStyles.Primary_Yellow2,
              borderColor: GlobalStyles.Primary_Yellow,
              borderWidth: 1,
            },
          ]}
          content={
            <Text style={[{}, styles.bold]}>
              <Ionicons name="chatbubble-outline" size={18} />
              View Replies
            </Text>
          }
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
