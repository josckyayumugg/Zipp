import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Components/Button";
import InputText from "../Components/TextInput";
import Span from "../Components/Span";
import { useNavigation } from "@react-navigation/native";
import ViewReplies from "./Replies";
import { useEffect, useReducer, useState } from "react";
import NewRequestModal from "../Components/NewRequest";
import ARequest from "../Components/ARequest";

import ConfirmDeleteRequest from "../Components/ConfirmDeleteRequest";
import {
  useGetCurrentProfile,
  useGetCurrentUser,
} from "../_CustomHooks/Authentication";
import { useGetAllMyRequests } from "../_CustomHooks/RequestServices";
import LoadingPaging from "../Components/LoadingPaging";
import { FlatList } from "react-native";
import EditRequestModal from "../Components/EditRequestModal";
import { useGetAllRequests } from "../_CustomHooks/RequestServices";
import { ActivityIndicator } from "react-native";
import NoProductsProfile from "../Components/NoProductsProfile";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { queryClient } from "../App";
import Profile from "./Profile";
import ErrorPage from "../Components/ErrorPage";
import BecomeButton from "../Components/BecomButton";
import { Watch } from "react-hook-form";

export default function Request() {
  const route = useRoute();
  const fromProfile = route?.params?.type || "myRequest";

  //getuser
  const {
    data: user,
    isPending: isPendingUser,
    error: errorUser,
    isError: isErrorUser,
  } = useGetCurrentUser();

  const {
    data: profile,
    isError: isErrorProfile,
    error: errorProfile,
    isPending: isPendingError,
  } = useGetCurrentProfile(user?.id);
  //hooks
  const Navigation = useNavigation();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [requestType, setRequestType] = useState("myRequest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSelectedRequest, setIsSelectedRequest] = useState(null);
  const [isFilterType, setIsFilterType] = useState("createdAt");
  const [isSortBoolean, setIsBoolean] = useState(true);
  const [isSearchQuery, setIsSearchQuery] = useState(null);
  const [isMySearchQuery, setIsMySearchQuery] = useState(null);
  const [isSearchInput, setIsSearchInput] = useState(null);

  ////

  const profileId = user?.id;
  const {
    data: MyRequests,
    isError,
    error,
    isPending,
    hasNextPage: hasNextPageMy,

    isFetching: isFetchingMy,
    fetchNextPage: fetchNextPageMy,
  } = useGetAllMyRequests(profileId, isMySearchQuery);

  /////Getttin all requests
  useFocusEffect(
    useCallback(() => {
      setRequestType(route?.params?.type || "myRequest");
    }, [route?.params?.type]),
  );

  const {
    isPending: isPendingAll,
    error: errorAll,

    data: dataAll,
    isError: isErrorAll,
    hasNextPage: hasNextPageAll,
    isFetching: isFetchingAll,
    fetchNextPage: fetchNextPageAll,
  } = useGetAllRequests(isFilterType, isSortBoolean, isSearchQuery);

  if (isPendingUser) {
    return <LoadingPaging />;
  }
  if (isError) return <ErrorPage message={error.message} />;
  if (isErrorProfile) return <ErrorPage message={error.message} />;
  if (isErrorAll) return <ErrorPage message={errorAll.message} />;
  if (isErrorUser) return <ErrorPage message={errorAll.message} />;
  if (isErrorUser) return <ErrorPage message={errorUser.message} />;
  const myRequestedData = MyRequests?.pages.flat() ?? [];
  const AllRequestData = dataAll?.pages.flat() ?? [];
  return (
    <View style={[styles.paddingSm, { flex: 1 }]}>
      {requestType === "myRequest" && (
        <View style={styles.rowBtn}>
          <Text style={styles.mainTitle}>Part Request</Text>
          <Button
            onPress={() => {
              setIsCreateModalOpen((prev) => !prev);
            }}
            styles={[
              {
                width: "75%",
                backgroundColor: GlobalStyles.Primary_Yellow,
                alignSelf: "flex-end",
              },
              styles.paddingLg,
              styles.bordeR,
            ]}
            content={
              <View style={[styles.paragraph, styles.row]}>
                <Ionicons name="add-outline" color={"black"} size={13} />
                <Text style={[styles.paragraph, styles.bold]}>Request</Text>
              </View>
            }
          />
        </View>
      )}
      <View style={[styles.column]}>
        <View
          style={[
            styles.row,
            styles.bordeR,

            {
              borderColor: GlobalStyles.Primary_Grey,
              borderWidth: 1,
              marginVertical: 3,
            },
          ]}
        >
          <Ionicons name="search" size={20} />

          <InputText
            placeholder="Search Request"
            onChange={(value) => {
              if (value === "" && requestType === "allRequests") {
                setIsSearchQuery("");
              }
              if (value === "" && requestType === "myRequest")
                setIsMySearchQuery("");

              setIsSearchInput(value);
            }}
            styles={[styles.bordeR, styles.paddingSm, { width: "70%" }]}
          />

          <Button
            onPress={() => {
              if (requestType === "allRequests") {
                setIsSearchQuery(isSearchInput);
              }
              if (requestType === "myRequest") {
                setIsMySearchQuery(isSearchInput);
              }
            }}
            content={<Text style={styles.smallT}>search</Text>}
          />
        </View>
        {requestType === "allRequests" && (
          <View
            style={[
              {
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 6,
              },
            ]}
          >
            <View
              style={{ flexDirection: "row", width: "30%", gap: 4, height: 30 }}
            >
              <View
                style={[
                  styles.bordeR,
                  isFilterType === "createdAt" && styles.greenBg,
                  {
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",

                    padding: 2,
                    paddingHorizontal: 4,
                    borderColor: GlobalStyles.Primary_Green,
                    flexDirection: "row",
                    color: GlobalStyles.Primary_Grey5,
                  },
                ]}
              >
                <Ionicons name={"time"} size={12} />
                <Button
                  styles={[styles.smallT, styles.bold]}
                  onPress={() => {
                    setIsFilterType("createdAt");
                  }}
                  content={<Text style={styles.smallT}>Time</Text>}
                />
              </View>
              <View
                style={[
                  styles.bordeR,
                  isFilterType === "budget" && styles.greenBg,
                  {
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",

                    padding: 2,

                    paddingHorizontal: 4,
                    borderColor: GlobalStyles.Primary_Green,
                    flexDirection: "row",
                    color: GlobalStyles.Primary_Grey5,
                  },
                ]}
              >
                <Span content={"$"} styles={styles.bold} />
                <Button
                  styles={[
                    styles.smallT,
                    styles.bold,
                    
                  ]}
                  onPress={() => {
                    setIsFilterType("budget");
                  }}
                  content={<Text style={styles.smallT}>Price</Text>}
                />
              </View>
            </View>
            <Button
              styles={[
                {
                  alignSelf: "flex-end",
                  paddingHorizontal: 4,
                  marginRight: 8,
                  backgroundColor: GlobalStyles.Primary_Yellow,
                },
                styles.bordeR,
              ]}
              onPress={() => {
                setIsBoolean((prev) => !prev);
              }}
              content={
                <Text>
                  <Ionicons
                    name="swap-vertical-outline"
                    size={25}
                    color={"black"}
                  />
                </Text>
              }
            />
          </View>
        )}
      </View>
      <View
        style={[
          { backgroundColor: GlobalStyles.Primary_Grey3 },
          styles.row,
          styles.paddingLg,
        ]}
      >
        <Button
          styles={[
            requestType === "allRequests" && { backgroundColor: "white" },
            { height: 35 },
            styles.bordeR,
          ]}
          content={
            <Text style={[styles.paragraph, styles.bold]}>All Requests</Text>
          }
          onPress={() => {
            setRequestType("allRequests");
            queryClient.invalidateQueries("AllRequests");
          }}
        />
        <Button
          styles={[
            requestType === "myRequest" && { backgroundColor: "white" },
            { height: 35 },
            styles.bordeR,
          ]}
          content={
            <Text style={[styles.paragraph, styles.bold]}>My requests</Text>
          }
          onPress={() => {
            setRequestType("myRequest");
          }}
        />
      </View>
      {requestType === "myRequest" && (
        <View style={{ flex: 1 }}>
          {isPending && <ActivityIndicator style={{ marginTop: 150 }} />}

          {myRequestedData?.length <= 0 && (
            <NoProductsProfile
              message={"No requests found"}
              ButtonContent={"Reload"}
              style={{
                marginTop: 100,
              }}
              onPress={() => queryClient.invalidateQueries("AllMyRequests")}
            />
          )}

          <FlatList
            data={myRequestedData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ARequest
                Data={item}
                requestType={requestType}
                id={item.id}
                onEdit={() => {
                  setIsSelectedRequest(item);
                  setIsEditModalVisible(true);
                }}
                onDelete={() => {
                  setIsSelectedRequest(item);
                  setIsConfirmDeleteOpen(true);
                }}
              />
            )}
            onEndReached={() => {
              if (hasNextPageMy && !isFetchingMy) {
                fetchNextPageMy();
              }
            }}
            onEndReachedThreshold={0.4}
          />
        </View>
      )}
      {requestType === "allRequests" && (
        <View style={{ flex: 1 }}>
          {isPendingAll && <ActivityIndicator style={{ marginTop: 150 }} />}
          {AllRequestData?.length <= 0 && profile?.type === "seller" ? (
            <NoProductsProfile
              message={"No Requests   found"}
              ButtonContent={"Reload"}
              style={{ marginTop: 100 }}
              onPress={() => setIsSearchQuery("")}
            />
          ) : null}
          {profile?.type === "seller" ? (
            <FlatList
              data={AllRequestData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ARequest
                  Data={item}
                  user={user}
                  requestType={requestType}
                  id={item.id}
                  onEdit={() => {
                    setIsSelectedRequest(item);
                    setIsEditModalVisible(true);
                  }}
                  onDelete={() => {
                    setIsSelectedRequest(item);
                    setIsConfirmDeleteOpen(true);
                  }}
                />
              )}
              onEndReached={() => {
                if (hasNextPageAll && !isFetchingAll) {
                  fetchNextPageAll();
                }
              }}
            />
          ) : (
            <View style={{ width: "100%", marginTop: 100 }}>
              <Text
                style={[
                  styles.italic,
                  styles.smallMVertical,
                  { color: GlobalStyles.Kn_orange },
                ]}
              >
                Gushyira ibiciro kuri requests z’abandi bisaba kuba uri
                umucuruzi.
              </Text>
              <BecomeButton styles={{ height: 40 }} />
            </View>
          )}
        </View>
      )}
      {isCreateModalOpen && (
        <NewRequestModal
          setIsCreateModalOpen={setIsCreateModalOpen}
          setRequestType={setRequestType}
          user={user}
        />
      )}
      {isEditModalVisible && (
        <EditRequestModal
          isSelectedRequest={isSelectedRequest}
          setIsEditModalVisible={setIsEditModalVisible}
          isEditModalVisible={isEditModalVisible}
          item={isSelectedRequest}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDeleteRequest
          item={isSelectedRequest}
          setIsConfirmDeleteOpen={setIsConfirmDeleteOpen}
        />
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
  greenBg: {
    backgroundColor: GlobalStyles.Primary_Green2,
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
    fontSize: 24,
    fontFamily: "Roboto-Light",
    marginRight: 20,
  },
  italic: {
    fontSize: 16,
    fontFamily: "Roboto-italic",
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
    padding: 8,
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
