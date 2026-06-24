import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import Span from "../Components/Span";
import Specifications from "../Components/Specifications";
import Button from "../Components/Button";

import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../Constants";
import Specification from "../Components/Specification";

const { width, height } = Dimensions.get("window");

export default function ProductPage() {
  const data = {
    productImages: [1, 2, 3, 4, 5],
    About: ["Toyota", "Hilux", "2019", "AN120"],
    engine: "diesel",
    engineSize: "3.0L",
    transmission: "Automatic",
    driveType: "AWD",
    location: "Kigali/Gatsata",
    description:
      "It is a  pr,oduct that means tht we can be the same kind of people and this  more than what we want and his will not be thesame thins again",
  };
  const [isViewSeller, SetIsViewSeller] = useState("false");
  const images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1503602642458-232111445657",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ScrollView style={{ flexDirection: "column", padding: 4 }}>
      {/* IMAGE SLIDER */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        style={{ position: "relative" }}
      >
        {images.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
            <Image source={{ uri: img }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.smallMVertical]}>
        <Text style={[styles.bigText, styles.bold, styles.smallMVertical]}>
          Toyota Front Bumper
        </Text>
        <View
          style={[
            styles.rownBtn,

            {
              borderBottomColor: GlobalStyles.Primary_Grey,
              borderBottomWidth: 1,
              paddingBottom: 8,
            },
          ]}
        >
          {data.About.map((item, i) => (
            <Span
              key={i}
              content={item}
              styles={[
                styles.bordeR,
                styles.paddingSm,
                styles.smallT,
                { borderWidth: 1 },
              ]}
            />
          ))}
        </View>
      </View>
      {
        <View style={styles.smallMVertical}>
          <Text style={styles.headerTitle}>Price</Text>
          <Text
            style={[
              styles.paragraph,
              styles.paddingSm,
              {
                backgroundColor: GlobalStyles.Primary_Green2,
                alignSelf: "flex-start",
              },
            ]}
          >
            300 000Rwf
          </Text>
        </View>
      }
      <View
        style={[
          {
            borderBottomColor: GlobalStyles.Primary_Grey,
            borderBottomWidth: 1,
            borderTopColor: GlobalStyles.Primary_Grey,
            borderTopWidth: 1,
            paddingVertical: 8,
          },
          styles.smallMVertical,
        ]}
      >
        <Text style={styles.headerTitle}>Description</Text>
        <Text style={styles.paragraph}>{data?.description}</Text>
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.headerTitle}>Product Location</Text>
        <View
          style={[styles.row, { backgroundColor: GlobalStyles.Primary_Grey3 }]}
        >
          <Ionicons
            name="location"
            size={13}
            color={GlobalStyles.Primary_Yellow}
          />
          <View style={[styles.bold]}>
            <Text>{data?.location}</Text>
          </View>
        </View>
      </View>
      {!isViewSeller && (
        <Button
          onPress={() => {
            SetIsViewSeller((prev) => !prev);
          }}
          content={
            isViewSeller && (
              <Text style={{ flexDirection: "row" }}>
                <Ionicons
                  name="eye-outline"
                  size={18}
                  style={{ marginHorizontal: 4 }}
                />
                View Seller
              </Text>
            )
          }
          styles={[
            {
              backgroundColor: GlobalStyles.Primary_Yellow,
              marginBottom: 100,
              height: 40,
            },
            styles.bordeR,

            styles.smallMVertical,
          ]}
        />
      )}
      {isViewSeller && (
        <View
          style={[
            styles.bordeR,
            styles.paddingSm,
            styles.smallMVertical,
            {
              borderWidth: 1,
              borderColor: GlobalStyles.Primary_Grey,
              backgroundColor: "white",
            },
          ]}
        >
          <Text style={styles.headerTitle}>About Seller</Text>

          {/* Seller Info */}
          <View
            style={[styles.row, { marginTop: 12, alignItems: "flex-start" }]}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: GlobalStyles.Primary_Grey3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="person"
                size={30}
                color={GlobalStyles.Primary_Grey}
              />
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.paragraph, styles.bold]}>
                Auto Parts Rwanda Ltd
              </Text>

              <Text style={[styles.smallT, styles.greyT]}>Verified Seller</Text>

              <Text style={[styles.smallT, styles.greyT]}>
                Member since January 2024
              </Text>

              <Text style={[styles.smallT, styles.greyT]}>
                156 Listings Published
              </Text>

              <Text style={[styles.smallT, styles.greyT]}>
                ⭐ 4.8 Seller Rating
              </Text>
            </View>
          </View>

          {/* Contact Details */}
          <View style={{ marginTop: 20, gap: 10 }}>
            <View style={styles.row}>
              <Ionicons name="call-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>+250 788 123 456</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="mail-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>sales@autoparts.rw</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="globe-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>www.autoparts.rw</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>Kigali, Gatsata</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>
                Available: Mon - Sat, 8AM - 6PM
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="call-outline" size={16} />
              <Text> Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="chatbubble-outline" size={16} />
              <Text> Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="mail-outline" size={16} />
              <Text> Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="logo-whatsapp" size={16} />
              <Text> WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="globe-outline" size={16} />
              <Text> Website</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="map-outline" size={16} />
              <Text> Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="person-outline" size={16} />
              <Text> Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="share-social-outline" size={16} />
              <Text> Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 350,
    resizeMode: "cover",
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
  rownBtn: {
    flexDirection: "row",
    alignItems: "center",

    gap: 8,
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
