import { useState } from "react";
import ProductProfileRow from "./ProfileProductRow";
import ProfileProformaRow from "./ProfileProformaRow";
import { FlatList } from "react-native";
import { GlobalStyles } from "../Constants";
import {
  useGetAllMyProducts,
  useGetAllProductDeals,
} from "../_CustomHooks/ProductServices";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";
import { useGetAllResponses } from "../_CustomHooks/ResponseServices";
import { useGetAllRequests } from "../_CustomHooks/RequestServices";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

export default function ProfileRows({ Data }) {
  const [isType, setIsType] = useState("");
  const [page, setPage] = useState(0);
  const route = useRoute();

  useEffect(() => {
    setIsType(route?.params?.type);
  }, [route.params?.type]);

  const {
    data: dataUser,
    isPending: isPendingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetCurrentUser();
  const {
    data: dataDeals,
    isPending: isPendingDeals,
    isError: isErrorDeals,
    error: errorDeals,
  } = useGetAllProductDeals(dataUser?.id);

  const {
    data: productsData,
    isPending: isPendingProducts,
    isError: isErrorProducts,
    error: errorProducts,
    isFetching: isFetchingProducts,
    fetchNextPage: fetchNextPageProducts,
    hasNextPage: hasNextPageProducts,
  } = useGetAllMyProducts(dataUser?.id);
  const {
    data: AllMyProforma,
    isPending: isPendingProforma,
    isError: isErrorProforma,
    error: errorProforma,
    isFetching: isFetchingResponse,
    fetchNextPage: isFetchingNextPageResponse,
    hasNextPage: hasNextPageResponse,
  } = useGetAllResponses(dataUser?.id);
  const {
    isPending: isPendingRequests,
    isError: isErrorRequests,
    error: errorRequests,
    data: dataRequests,
  } = useGetAllRequests(dataUser?.id);
  const AllMyProducts = productsData?.pages.flat() ?? [];

  return (
    <View style={{ padding: 8, flex: 1 }}>
      <FlatList
        data={AllMyProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductProfileRow Data={item} />}
        // Lock pagination: only increment page if not currently fetching & last batch had a full page of 15
        onEndReached={() => {
          if (hasNextPageProducts && !isFetchingProducts) {
            fetchNextPageProducts();
          }
        }}
        onEndReachedThreshold={0.4}
        // Small activity spinner at the bottom when fetching page 2, 3, 4...
        ListFooterComponent={
          isFetchingProducts && page > 1 ? (
            <ActivityIndicator
              size="small"
              color={GlobalStyles.Primary_Green}
              style={{ marginVertical: 16 }}
            />
          ) : null
        }
      />
    </View>
  );
}
