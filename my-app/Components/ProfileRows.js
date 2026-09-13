import { useState } from "react";
import ProductProfileRow from "./ProfileProductRow";

import { FlatList } from "react-native";
import { GlobalStyles } from "../Constants";
import { useGetAllMyProducts } from "../_CustomHooks/ProductServices";

import { useGetCurrentUser } from "../_CustomHooks/Authentication";

import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import ProfileFlatListHeader from "./ProfileFlatlistHeader";
import NoProductsProfile from "./NoProductsProfile";
import ErrorPage from "./ErrorPage";
import LoadingPaging from "./LoadingPaging";

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

    error: errorUser,
  } = useGetCurrentUser();

  const {
    data: productsData,
    isPending: isPendingProducts,

    error: errorProducts,
    isFetching: isFetchingProducts,
    fetchNextPage: fetchNextPageProducts,
    hasNextPage: hasNextPageProducts,
  } = useGetAllMyProducts(dataUser?.id);

  const AllMyProducts = productsData?.pages.flat() ?? [];

  if (isPendingUser) {
    <LoadingPaging />;
  }
  if (AllMyProducts?.length <= 0 && !isPendingProducts) {
    return <NoProductsProfile message={"You have no products yet "} />;
  }
  if (errorUser) {
    <ErrorPage message={error?.message} />;
  }
  if (errorProducts) {
    <ErrorPage message={errorProducts?.message} />;
  }
  return (
    <View style={{ padding: 8, flex: 1 }}>
      <FlatList
        data={AllMyProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductProfileRow Data={item} />}
        onEndReached={() => {
          if (hasNextPageProducts && !isFetchingProducts) {
            fetchNextPageProducts();
          }
        }}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <ProfileFlatListHeader message={"Ibicuruzwa byawe abandi babona"} />
        }
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
