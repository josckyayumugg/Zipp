import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../Constants";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import NoProductsProfile from "./NoProductsProfile";
import ProductProfileRow from "./ProfileProductRow";
import { useEffect, useState } from "react";

import { useCountMyResponses } from "../_CustomHooks/ResponseServices";
import { FlatList } from "react-native";
import { getYear } from "../Helpers";
import { useCountMyRequests } from "../_CustomHooks/RequestServices";
import {
  useCountProducts,
  useCountProductsDeals,
  useGetAllMyProducts,
} from "../_CustomHooks/ProductServices";
import ErrorPage from "./ErrorPage";
import {
  NavigationRouteContext,
  useNavigation,
} from "@react-navigation/native";

export default function ProfileSelling({ profileId, creationYear }) {
  const [isSellingFilter, setIsSellingFilter] = useState("yourProducts");

  const [page, setPage] = useState(1);
  const sinceYear = getYear(creationYear);
  const navigator = useNavigation();
  const {
    data: productsNumber,
    isPending: isPendingPNumber,
    isError: isErrorPNumber,
    error: errorPNumber,
  } = useCountProducts(profileId);
  const {
    data: NumberDeals,
    isError: isErrorDeals,
    error: errorDeals,
    isPending,
  } = useCountProductsDeals(profileId);
  const {
    data: NumberReplies,
    isPending: isPendingReplies,
    isError: isErrorReplies,
    error: errorReplies,
  } = useCountMyResponses(profileId);

  const {
    data: AllMyProducts,
    isPending: isPendingProducts,
    isError: isErrorProducts,
    error: errorProducts,
    isFetching,
  } = useGetAllMyProducts(profileId);
  const {
    data: requestNumber,
    isPending: isPendingRNumber,
    isError: isErrorRNumber,
    error: errorRNumber,
  } = useCountMyRequests(profileId);

  if (isErrorPNumber) {
    return <ErrorPage message={errorPNumber?.message} />;
  }
  if (isErrorDeals) {
    return <ErrorPage message={errorDeals?.message} />;
  }
  if (isErrorReplies) {
    return <ErrorPage message={errorDeals?.message} />;
  }
  if (isErrorPNumber) {
    return <ErrorPage message={errorProducts?.message} />;
  }
  if (isErrorRNumber) {
    return <ErrorPage message={errorRNumber?.message} />;
  }

  return (
    <View style={styles.paddingLg}>
      <View style={styles.rowBtn}>
        <Pressable
          onPress={() => {
            navigator.navigate("My Products", { type: "Products" });
          }}
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
            <Text style={[styles.paragraph]}>Total Products</Text>
            <Text style={[styles.paragraph, styles.bold, styles.bigText]}>
              {productsNumber ? productsNumber : 0}
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigator.navigate("My Deals", { type: "Deals" });
          }}
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
            <Text style={[styles.paragraph]}>Active Deals</Text>
            <Text style={[styles.paragraph, styles.bold, styles.bigText]}>
              {NumberDeals ? NumberDeals : 0}
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.rowBtn}>
        <Pressable
          onPress={() => {
            navigator.navigate("My Responses", { type: "Responses" });
          }}
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
            <Text style={[styles.paragraph]}>Total Proforma</Text>
            <Text style={[styles.paragraph, styles.bold, styles.bigText]}>
              {NumberReplies ? NumberReplies : 0}
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigator.navigate("Tabs", {
              screen: "Request",
              params: { type: "myRequest" },
            });
          }}
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
              {requestNumber ? requestNumber : 0}
            </Text>
          </View>
        </Pressable>
      </View>

      <Text style={{ textAlign: "center", marginTop: 30 }}>
        Member since {sinceYear}
      </Text>
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
