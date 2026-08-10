import { useState } from "react";
import ProductProfileRow from "./ProfileProductRow";
import ProfileProformaRow from "./ProfileProformaRow";
import { FlatList } from "react-native";
import { GlobalStyles } from "../Constants";
import {

  useGetAllMyProductDealsWithInvisible,
} from "../_CustomHooks/ProductServices";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";
import { useGetAllResponses } from "../_CustomHooks/ResponseServices";
import { useGetAllRequests } from "../_CustomHooks/RequestServices";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import NoProductsProfile from "./NoProductsProfile";
import DealProfileRow from "./DealProfileRow";
import { useDeleteProductDeal } from "../_CustomHooks/ProductServices";
import LoadingPaging from "./LoadingPaging";
import ErrorPage from "./ErrorPage";

export default function DealsRow({ Data }) {
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
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllMyProductDealsWithInvisible(dataUser?.id);

  const AllMyDeals = dataDeals?.pages.flat() ?? [];

  if (isErrorDeals) {
    return <ErrorPage message={errorDeals?.message} />;
  }

  if (AllMyDeals.length <= 0) {
    return <NoProductsProfile message={"You have no Deals yet!"} />;
  }
  return (
    <View style={{ padding: 8, flex: 1 }}>
      <FlatList
        data={AllMyDeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DealProfileRow Data={item} />}
        // Lock pagination: only increment page if not currently fetching & last batch had a full page of 15
        onEndReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.4}
        // Small activity spinner at the bottom when fetching page 2, 3, 4...
        ListFooterComponent={
          isFetching && page > 1 ? (
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
