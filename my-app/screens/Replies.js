import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";

import { useGetReqResponses } from "../_CustomHooks/ResponseServices";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";

import NoProductsProfile from "../Components/NoProductsProfile";
import { useNavigation } from "@react-navigation/native";
import ErrorPage from "../Components/ErrorPage";

import { FlatList } from "react-native";
import Reply from "../Components/Reply";
import { useGetSingleRequest } from "../_CustomHooks/RequestServices";
export default function ViewReplies({ route, navigation }) {
  // Fallback test variables f context route params aren't passed yet
  const navigator = useNavigation();
  const requestName = route?.params?.requestName;
  const relatedRequestId = route?.params?.relatedId;

  const {
    data: Responses,
    isError: isErrorResponse,
    hasNextPage,
    isFetching,
    fetchNextPage,

    isPending: isPendingResponses,
    error: errorResponse,
  } = useGetReqResponses(route?.params?.requestId || relatedRequestId);

  const {
    data: responseToReply,
    isError: isErrorTo,
    error: errorTo,
    isPending: isPendingTo,
  } = useGetSingleRequest(relatedRequestId);

  if (isErrorResponse) {
    return <ErrorPage message={errorResponse.message} />;
  }

  if (isErrorTo) {
    return <ErrorPage message={errorTo.message} />;
  }

  let dataResponses = Responses?.pages?.flat() ?? [];
  return (
    <View style={styles.screenWrapper}>
      {/* Active Context Bar */}

      <View style={styles.topAlertBar}>
        <Text style={styles.contextSubText}>
          <Text style={{ marginHorizontal: 8 }}>{dataResponses?.length}</Text>
          available Replies for:
        </Text>
        <Text style={styles.contextTitleText}>
          {requestName || responseToReply?.name}
        </Text>
      </View>

      {dataResponses?.length <= 0 ? (
        <NoProductsProfile message={"No Replies yet"} />
      ) : (
        <FlatList
          data={dataResponses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Reply response={item} />}
          onEndReached={() => {
            if (hasNextPage && !isFetching) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topAlertBar: {
    backgroundColor: GlobalStyles.Black || "#1A1A1A",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.Primary_Grey,
  },
  contextSubText: {
    color: GlobalStyles.Primary_Green || "#4CAF50",
    fontSize: 12,
    fontFamily: "Roboto-regular",
    textTransform: "uppercase",
  },
  contextTitleText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
    marginTop: 2,
  },
  scrollContent: {
    padding: 12,
    gap: 12,
  },
  offerCard: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  shopNameText: {
    fontSize: 16,
    fontFamily: "Roboto-semibold",
    fontWeight: "700",
    color: "#222",
  },
  locationText: {
    fontSize: 13,
    color: "#666",
  },
  conditionBadge: {
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 11,
  },
  notesText: {
    fontFamily: "Roboto-Light",
    fontSize: 14,
    color: "#444",
    marginVertical: 12,
    fontStyle: "italic",
    lineHeight: 18,
  },
  borderTopSection: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 10,
    marginTop: 4,
  },
  priceLabel: {
    fontSize: 11,
    color: "#777",
    textTransform: "uppercase",
  },
  priceValue: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
    fontWeight: "700",
    color: GlobalStyles.Primary_Green || "green",
  },
  callButton: {
    backgroundColor: GlobalStyles.Primary_Yellow,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
  },
  callButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 14,
  },
  bordeR: { borderRadius: 6 },
});
