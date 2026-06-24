import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import NoProductsProfile from "./NoProductsProfile";
import ProductProfileRow from "./ProfileProductRow";
import ProfileBuyingRequestRow from "./ProfileBuyingRequestRow";
export default function ProfileBuying() {
  const Data = {
    requests: [
      {
        requestProductTitle: "suzuki front door",
        requestDate: 12 / 12 / 2024,
        year: 2012,
        modal: "hilux",
        brand: "suzuki",
        status: "expired",
      },
    ],
  };
  return (
    <View style={styles.paddingLg}>
      <View style={styles.rowBtn}>
        <View
          style={[
            styles.paddingLg,
            styles.row,
            styles.smallMVertical,
            styles.bordeR,
            {
              width: "48%",
              gap: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 6,

              // Android shadow
              elevation: 8,

              height: 100,
              borderWidth: 1,
              borderColor: GlobalStyles.Primary_Grey,
            },
          ]}
        >
          <Ionicons
            name="cube-outline"
            style={[
              styles.bordeR,
              {
                borderRadius: 30,
                padding: 4,
                borderColor: GlobalStyles.Primary_Grey2,
                borderWidth: 1,
                backgroundColor: GlobalStyles.Primary_Yellow2,
              },
            ]}
          />
          <View style={[styles.column]}>
            <Text style={[styles.paragraph]}>Total products</Text>
            <Text style={[styles.paragraph, styles.bold, styles.bigText]}>
              0
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.paddingLg,
            styles.row,
            styles.smallMVertical,
            styles.bordeR,
            {
              width: "48%",
              gap: 12,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 6,

              // Android shadow
              elevation: 8,

              height: 100,
              borderWidth: 1,
              borderColor: GlobalStyles.Primary_Grey,
            },
          ]}
        >
          <Ionicons
            name="cube-outline"
            style={[
              styles.bordeR,
              {
                borderRadius: 30,
                padding: 4,
                borderColor: GlobalStyles.Primary_Grey2,
                borderWidth: 1,
                backgroundColor: GlobalStyles.Primary_Yellow2,
              },
            ]}
          />
          <View style={[styles.column]}>
            <Text style={[styles.paragraph]}>Active </Text>
            <Text style={[styles.paragraph, styles.bold, styles.bigText]}>
              0
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rowBtn}>
        <View
          style={[
            styles.paddingLg,
            styles.row,
            styles.bordeR,
            {
              width: "48%",
              gap: 12,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,

                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 6,

              // Android shadow
              elevation: 8,

              height: 100,
              borderWidth: 1,
              borderColor: GlobalStyles.Primary_Grey,
            },
          ]}
        >
          <Ionicons
            name="cube-outline"
            style={[
              styles.bordeR,
              {
                borderRadius: 30,
                padding: 4,
                borderColor: GlobalStyles.Primary_Grey2,
                borderWidth: 1,
                backgroundColor: GlobalStyles.Primary_Yellow2,
              },
            ]}
          />
          <View style={[styles.column]}>
            <Text style={[styles.paragraph]}>Total Requests</Text>
            <Text style={[styles.paragraph, styles.bold, styles.bigText]}>
              0
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.paddingLg,
            styles.row,
            styles.bordeR,
            {
              width: "48%",
              gap: 12,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,

                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 6,

              // Android shadow
              elevation: 8,

              height: 100,
              borderWidth: 1,
              borderColor: GlobalStyles.Primary_Grey,
            },
          ]}
        >
          <Ionicons
            name="cube-outline"
            style={[
              styles.bordeR,
              {
                borderRadius: 30,
                padding: 4,
                borderColor: GlobalStyles.Primary_Grey2,
                borderWidth: 1,
                backgroundColor: GlobalStyles.Primary_Yellow2,
              },
            ]}
          />
          <View style={[styles.column]}>
            <Text style={[styles.paragraph]}>Total responses</Text>
            <Text style={[styles.paragraph, styles.bold, styles.bigText]}>
              0
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.bordeR,
          { borderWidth: 1, borderColor: GlobalStyles.Primary_Grey },
          styles.largeMTop,
        ]}
      >
        {Data.requests <= 0 && (
          <NoProductsProfile
            ButtonContent={"Upload Product"}
            message={"You have no Products in your listing  yet"}
          />
        )}
        {Data.requests.map((item, i) => (
          <ProfileBuyingRequestRow Data={item} key={i} />
        ))}
      </View>
      <Text style={{ textAlign: "center" }}>Member since 2023</Text>
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
