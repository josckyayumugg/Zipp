import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../Constants";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import Span from "./Span";
import { formatNumber, getTimeRemaining } from "../Helpers";
import NoProductsProfile from "./NoProductsProfile";
import { queryClient } from "../App";
import { ActivityIndicator } from "react-native";
import ProductCardHome from "./ProductCardHom";

export default function HomeFlatList({
  homeData,
  isFetchingNextPageHomeProducts,
  hasNextPageHomeProducts,
  fetchNextPageHomeProducts,
}) {
  console.log(20, homeData);

  return (
    <FlatList
    
      data={homeData}
      keyExtractor={(item) => item.id.toString()}
      // columnWrapperStyle={{ marginBottom: 10 }}
      contentContainerStyle={{ padding: 8 }}
      renderItem={({ item }) => (
        <ProductCardHome
          product={item}
          // isImageLoaded={isImageLoaded}
          // setIsImageLoaded={setIsImageLoaded}

          data={item}
        />
      )}
      // Lock pagination: only increment page if not currently fetching & last batch had a full page of 15
      onEndReached={() => {
        if (!isFetchingNextPageHomeProducts && hasNextPageHomeProducts) {
          fetchNextPageHomeProducts;
        }
      }}
      onEndReachedThreshold={0.4}
      // Small activity spinner at the bottom when fetching page 2, 3, 4...
      ListFooterComponent={
        isFetchingNextPageHomeProducts ? (
          <ActivityIndicator
            size="small"
            color={GlobalStyles.Primary_Green}
            style={{ marginVertical: 16 }}
          />
        ) : null
      }
    />
  );
}
