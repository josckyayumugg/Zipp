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
import { useGetCurrentUser } from "../_CustomHooks/Authentication";
import {
  useGetAllMyRequests,
  useGetAllRequests,
} from "../_CustomHooks/RequestServices";
import LoadingPaging from "../Components/LoadingPaging";
import { FlatList } from "react-native";
import EditRequestModal from "../Components/EditRequestModal";


export default function Request() {
  //getuser
  const {
    data: user,
    isPending: isPendingUser,
    error: errorUser,
    isError: isErrorUser,
  } = useGetCurrentUser();
  //hooks
  const Navigation = useNavigation();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [requestType, setRequestType] = useState("myRequest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSelectedRequest, setIsSelectedRequest] = useState(null);
  console.log({ SElected: isSelectedRequest });
  ////

  const profileId = user?.id;
  const {
    data: MyRequests,
    isError,
    error,
    isPending,
  } = useGetAllMyRequests(profileId);

  useEffect(() => {
    if (MyRequests) {
      console.log(user);
      console.log("Products loaded:", MyRequests);
    }
  }, [MyRequests]);

  if (isPending || isPendingUser) {
    return <LoadingPaging />;
  }
  return (
    <ScrollView style={styles.paddingSm}>
      <View style={styles.rowBtn}>
        <Text style={styles.mainTitle}>Part Request</Text>
        <Button
          onPress={() => {
            setIsCreateModalOpen((prev) => !prev);
          }}
          styles={[
            {
              width: "50%",
              backgroundColor: GlobalStyles.Primary_Yellow,
              alignSelf: "flex-end",
            },
            styles.paddingLg,
            styles.bordeR,
          ]}
          content={
            <Text style={[styles.paragraph, styles.row]}>
              <Ionicons name="add-outline" color={"black"} size={13} />
              New request
            </Text>
          }
        />
      </View>
      <View
        style={[
          styles.row,
          styles.bordeR,
          styles.smallMVertical,
          { borderColor: GlobalStyles.Primary_Grey, borderWidth: 1 },
        ]}
      >
        <Ionicons name="search" size={20} />

        <InputText
          placeholder={"Search parts,brands,models"}
          styles={[styles.bordeR, styles.paddingSm, { width: "100%" }]}
        />

        <Button content={"Search"} />
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
          content="All Requests"
          onPress={() => {
            setRequestType("allRequests");
          }}
        />
        <Button
          styles={[
            requestType === "myRequest" && { backgroundColor: "white" },
            { height: 35 },
            styles.bordeR,
          ]}
          content="My Requests"
          onPress={() => {
            setRequestType("myRequest");
          }}
        />
      </View>
      <FlatList
        data={MyRequests}
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
      />
      {isCreateModalOpen && (
        <NewRequestModal
          setIsCreateModalOpen={setIsCreateModalOpen}
          setRequestType={setRequestType}
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
    </ScrollView>
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
