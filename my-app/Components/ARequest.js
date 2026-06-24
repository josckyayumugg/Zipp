import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";
import Span from "./Span";
import { formatDateTime } from "../Helpers";
import Button from "./Button";
import NewRequestModal from "./NewRequest";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useNavigationIndependentTree,
} from "@react-navigation/native";
import { useState } from "react";
import EditRequestModal from "./EditRequestModal";

export default function ARequest({
  requestType,
  isConfirmOpen,
  setIsConfirmOpen,
  setIsVisible,
}) {
  const Navigation = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const Data = {
    id: 1,
    productName: "Suzuki right door",
    status: "active",
    date: "12/8/2023",
    specifications: ["Suzuki", "2012", "AN12", "SUV"],
    description:
      "We need a right door of the suzuki car(dukeneye urugi rwiburyo rwa suzuki)",
  };
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
      ]}
    >
      <View style={styles.rowBtn}>
        <Text style={[styles.smallT, { color: styles.Primary_Grey3 }]}>
          <Ionicons
            name="calendar"
            size={20}
            color={GlobalStyles.Primary_Grey3}
          />
          {formatDateTime(Data.date)}
        </Text>
        {requestType === "myRequest" && (
          <View
            style={[
              styles.smallT,
              styles.row,

              { color: styles.Primary_Grey3, gap: 8, width: "50%" },
            ]}
          >
            <Button
              onPress={() => {
                setIsEditModalVisible(true);
              }}
              styles={[
                styles.bordeR,
                styles.paddingSm,
                { borderWidth: 1, borderColor: GlobalStyles.Primary_Grey },
              ]}
              content={
                <View style={styles.row}>
                  <Ionicons name="pencil-outline" size={20} color={"black"} />
                  <Text style={styles.paragraph}>Edit</Text>
                </View>
              }
            />
            <Button
              onPress={() => {
                setIsConfirmOpen(true);
              }}
              styles={[
                styles.bordeR,
                styles.paddingSm,
                { borderWidth: 1, borderColor: GlobalStyles.Primary_Grey },
              ]}
              content={
                <View style={styles.row}>
                  <Ionicons
                    name="trash-bin-outline"
                    size={20}
                    color={"black"}
                  />
                  <Text style={styles.paragraph}>Delete</Text>
                </View>
              }
            />
            <EditRequestModal
              setIsModalVisible={setIsEditModalVisible}
              isModalVisible={isEditModalVisible}
              id={Data.id}
            />
          </View>
        )}
      </View>
      <View
        style={[
          {
            flexDirection: "column",
            gap: 8,
            borderBottomColor: GlobalStyles.Primary_Grey3,
            borderBottomWidth: 1,
          },
          styles.smallMVertical,
          styles.smallMVertical,
          styles.paddingLg,
        ]}
      >
        <Text style={[styles.bigText, styles.bold]}>{Data.productName}</Text>
        <Text style={styles.paragraph}> {Data.description}</Text>
        <View style={[styles.row, { gap: 8 }]}>
          {Data.specifications.map((item, i) => (
            <Span
              key={i}
              content={item}
              styles={[
                {
                  borderWidth: 1,
                  borderColor: GlobalStyles.Primary_Grey2,
                },
                styles.bordeR,
                styles.smallText,
                styles.paddingSm,
              ]}
            />
          ))}
        </View>
        <Text style={[styles.paragraph, styles.bold]}>
          300,000Rwf-400,000Rwf
        </Text>
      </View>
      <View style={[styles.row, {}]}>
        {requestType === "allRequests" && (
          <Button
            onPress={() => Navigation.navigate("Respond")}
            styles={[
              styles.bordeR,
              styles.paddingLg,

              {
                backgroundColor: GlobalStyles.Primary_Grey3,
                borderColor: GlobalStyles.Primary_Yellow,
                borderWidth: 1,
              },
            ]}
            content={
              <Text style={[{}]}>
                <Ionicons name="chatbox-outline" size={18} />
                Respond
              </Text>
            }
          />
        )}
        {requestType === "myRequest" && (
          <Button
            onPress={() => Navigation.navigate("Replies")}
            styles={[
              styles.bordeR,
              styles.paddingLg,

              {
                backgroundColor: GlobalStyles.Primary_Grey3,
                borderColor: GlobalStyles.Primary_Yellow,
                borderWidth: 1,
              },
            ]}
            content={
              <Text style={[{}]}>
                <Ionicons name="chatbubble-outline" size={18} />
                View Replies
              </Text>
            }
          />
        )}
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
