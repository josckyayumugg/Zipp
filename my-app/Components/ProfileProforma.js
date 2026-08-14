import { useState } from "react";
import ProductProfileRow from "./ProfileProductRow";

import { FlatList } from "react-native";
import { GlobalStyles } from "../Constants";
import { useGetAllMyProductDealsWithInvisible } from "../_CustomHooks/ProductServices";
import { useGetCurrentProfile } from "../_CustomHooks/Authentication";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";
import { useGetAllMyResponses } from "../_CustomHooks/ResponseServices";
import {
  useGetAllMyRequests,
  useGetAllRequests,
} from "../_CustomHooks/RequestServices";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import NoProductsProfile from "./NoProductsProfile";
import DealProfileRow from "./DealProfileRow";
import { useDeleteProductDeal } from "../_CustomHooks/ProductServices";
import LoadingPaging from "./LoadingPaging";
import ErrorPage from "./ErrorPage";
import ProfileResponseRow from "./ResponseProfileRow";
import ProfileFlatListHeader from "./ProfileFlatlistHeader";

export default function ProformaRows({ Data }) {
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
    data: dataMyResponses,
    isPending: isPendingResponse,
    isError: isErrorResponses,
    error: errorResponses,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllMyResponses(dataUser?.id);

  const AllMyResponses = dataMyResponses?.pages?.flat() ?? [];

  if (isErrorResponses) {
    return <ErrorPage message={errorResponses?.message} />;
  }
  if (isErrorUser) {
    return <ErrorPage message={errorUser?.message} />;
  }

  if (AllMyResponses.length <= 0) {
    return (
      <NoProductsProfile message={"You have no Proforma(Responses) yet!"} />
    );
  }
  console.log("Urukundo", AllMyResponses);
  return (
    <View style={{ padding: 8, flex: 1 }}>
      <FlatList
        data={AllMyResponses}
        keyExtractor={(item) => item.id?.toString()}
        ListHeaderComponent={
          <ProfileFlatListHeader
            message={'Ibiciro Washyize kuri "REQUEST"  Zitandukanye'}
          />
        }
        renderItem={({ item, index }) => (
          <ProfileResponseRow Data={item} itemIndex={index + 1} />
        )}
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
