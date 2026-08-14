import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RowMenu from "./RowMenu";
import { formatDateTime } from "../Helpers";
import { ActivityIndicator } from "react-native";

export default function ProductProfileRow({ Data }) {
  const navigation = useNavigation();

  const creationDate = formatDateTime(Data?.createdAt);
  return (
    <View
      style={[
        styles.row,
        styles.bordeR,
        styles.paddingLg,
        styles.smallMVertical,
        { borderWidth: 1, borderColor: GlobalStyles.Primary_Grey2 },
      ]}
    >
      <View style={[styles.info]}>
        <Text style={[styles.smallText, styles.bold]}>{Data.name}</Text>
        <View
          style={{
            flexDirection: "column",
            gap: 8,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        ></View>

        <Text style={styles.smallT}>
          Product reports:{Data.reports ? Data.reports : 0}
        </Text>
        <Text style={styles.smallT}>{creationDate}</Text>
      </View>
      <View
        style={{
          width: "35%",
          flexDirection: "column",
        }}
      >
        {Data?.reported > 1 ? (
          <Button
            styles={[
              {
                backgroundColor: GlobalStyles.Primary_Yellow,
                marginVertical: 8,
              },
              styles.bordeR,
              styles.paddingSm,
            ]}
            content={<Text>Activate</Text>}
          />
        ) : null}
        <RowMenu productId={Data.id} item={Data.name} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  info: {
    flex: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
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
    color: GlobalStyles.Primary_Grey,
  },
  greenT: {
    color: GlobalStyles.Primary_Green,
  },
  smallText: {
    fontSize: 16,
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
    fontSize: 24,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  paragraph: {
    fontFamily: "Roboto-Light",
    fontSize: 20,
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
