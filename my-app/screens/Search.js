import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { GlobalStyles } from "../Constants";
import InputText from "../Components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import { useGetAllProducts } from "../_CustomHooks/ProductServices";
import Button from "../Components/Button";
import ProductCard from "../Components/ProductCard";
import { useRoute } from "@react-navigation/native";
import { queryClient } from "../App";
import NoProductsProfile from "../Components/NoProductsProfile";
import LargeSpinner from "../Components/LargSpinner";
import {
  useGetCurrentUser,
  useGetCurrentProfile,
} from "../_CustomHooks/Authentication";
import ProductFilterModal from "../Components/FilterModal";
import LoadingPaging from "../Components/LoadingPaging";

export default function Search() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const route = useRoute();
  console.log("copulo", route.params);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchQuery, setIsSearchQuery] = useState("");
  const [isInputQuery, setIsInputQuery] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const [isTempFilter, setIsTempFilter] = useState({
    brand: "",
    model: "",
    year: "",
    condition: "",
    category: "",
  });
  const [appliedFilter, setAppliedFilter] = useState({});

  // Fetch hook
  const { data, isPending, isFetching } = useGetAllProducts(
    {
      ...appliedFilter,
      shouldSearch,
      search: isSearchQuery,
    },
    page,
  );
  useEffect(() => {
    if (route.params?.query) {
      setAppliedFilter({ category: route.params?.query });
      setShouldSearch(true);
      queryClient.invalidateQueries("getallProductspagination");
      setHasSearched(true);
    }

    return () => {
      // Optional cleanup
    };
  }, [route.params?.query]);
  const { data: user, isPending: pendingUser } = useGetCurrentUser();
  const { data: currentProfile, isPending: isPendingProfile } =
    useGetCurrentProfile(user?.id);

  // ✅ FIX 1: Handle fresh search / filter updates safely
  const triggerNewSearch = () => {
    setProducts([]); // Clear existing items
    setPage(1); // Reset back to Page 1
    setIsSearchQuery(isInputQuery);
    setAppliedFilter(isTempFilter);
    setShouldSearch(true);
    setHasSearched(true);
  };

  // ✅ FIX 2: Append incoming page data or reset array when back at page 1
  useEffect(() => {
    if (data && data.length > 0) {
      if (page === 1) {
        setProducts(data);
      } else {
        setProducts((prev) => {
          // Avoid duplicate key warnings by checking existing IDs
          const existingIds = new Set(prev.map((item) => item.id));
          const newUniqueProducts = data.filter(
            (item) => !existingIds.has(item.id),
          );
          return [...prev, ...newUniqueProducts];
        });
      }
    }
  }, [data, page]);

  if (pendingUser || isPendingProfile) {
    return <LoadingPaging />;
  }

  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 4, flex: 1 }}>
      {/* Search Header Bar */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={[
            styles.row,
            styles.bordeR,
            styles.smallMVertical,
            {
              borderColor: GlobalStyles.Primary_Grey,
              borderWidth: 1,
              width: "85%",
              justifyContent: "flex-end",
            },
          ]}
        >
          <InputText
            placeholder={"Search parts, brands, models"}
            value={isInputQuery}
            onChange={(value) => {
              setShouldSearch(false);
              if (value === "") {
                setIsSearchQuery("");
              }
              setIsInputQuery(value);
            }}
            styles={[styles.bordeR, styles.paddingSm, { width: "70%" }]}
          />

          <Button
            onPress={triggerNewSearch}
            content={<Text style={styles.smallT}>Search</Text>}
          />
        </View>

        <View
          style={[
            {
              alignSelf: "center",
              justifyContent: "center",
              height: 35,
              width: 50,
              marginHorizontal: "auto",
              backgroundColor: GlobalStyles.Primary_Yellow,
            },
            styles.bordeR,
          ]}
        >
          <Button
            onPress={() => setIsFilterOpen(true)}
            content={<Ionicons name="options" size={32} color="black" />}
            styles={{ alignSelf: "center" }}
          />
        </View>
      </View>

      {/* Filter Modal */}
      {isFilterOpen && (
        <ProductFilterModal
          setIsFilterOpen={setIsFilterOpen}
          setIsTempFilter={setIsTempFilter}
          isTempFilter={isTempFilter}
          setAppliedFilter={setAppliedFilter}
          setHasSearched={setHasSearched}
          setShouldSearch={setShouldSearch}
        />
      )}

      {/* Applied Filters Badges */}
      <View style={styles.column}>
        <Text style={[styles.smallT, styles.italic]}>Applied Filters</Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 4,
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {Object.entries(appliedFilter).map(([key, val]) => {
            if (!val) return null;
            return (
              <Pressable
                key={key}
                onPress={() => {
                  setAppliedFilter((prev) => ({ ...prev, [key]: "" }));
                  setIsTempFilter((prev) => ({ ...prev, [key]: "" }));
                  setProducts([]);
                  setPage(1);
                }}
              >
                <View
                  style={[
                    styles.bordeR,
                    styles.smallT,
                    styles.italic,
                    {
                      borderWidth: 1,
                      padding: 4,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                      borderColor: GlobalStyles.Primary_Green,
                      borderStyle: "dashed",
                    },
                  ]}
                >
                  <Text>{val}</Text>
                  <Ionicons name="close" color="red" size={12} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Initial State - Has Not Searched Yet */}
      {!hasSearched && (
        <View
          style={{
            marginTop: 150,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Text style={[styles.smallText]}>No search yet!!</Text>
          <Text style={[styles.smallText]}>
            Your search results will appear here
          </Text>
          <Button
            content={"Start to Filter"}
            styles={[
              { backgroundColor: GlobalStyles.Primary_Yellow },
              styles.padding,
              styles.bordeR,
              styles.smallMTop,
            ]}
            onPress={() => setIsFilterOpen(true)}
          />
        </View>
      )}

      {/* Loading State - Page 1 Initial Search */}
      {(isPending || isFetching) && page === 1 && shouldSearch && (
        <View style={{ alignSelf: "center", marginTop: 150 }}>
          <LargeSpinner />
        </View>
      )}

      {/* ✅ FIX 3: Empty State - Only show when NOT fetching AND products list is genuinely empty */}
      {!isFetching &&
        !isPending &&
        products.length === 0 &&
        shouldSearch &&
        hasSearched && (
          <NoProductsProfile
            message={"No products were found"}
            ButtonContent={"Try again"}
            style={{ marginTop: 150 }}
            onPress={() => {
              setShouldSearch(false);
              setIsSearchQuery("");
              setIsInputQuery("");
              setProducts([]);
              setPage(1);
            }}
          />
        )}

      {/* ✅ FIX 4: FlatList with Pagination Lock and Footer Loader */}
      {products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ gap: 8, marginBottom: 10 }}
          contentContainerStyle={{ padding: 8 }}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              Stylesy={{ width: "32%" }}
              isImageLoaded={isImageLoaded}
              setIsImageLoaded={setIsImageLoaded}
              imageHeight={"10%"}
              data={item}
              profile={currentProfile}
            />
          )}
          // Lock pagination: only increment page if not currently fetching & last batch had a full page of 15
          onEndReached={() => {
            if (!isFetching && data?.length === 15) {
              setPage((prev) => prev + 1);
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  smallT: { fontFamily: "Roboto-regular", fontSize: 12 },
  smallMVertical: { marginVertical: 8 },
  smallMTop: { marginTop: 8 },
  padding: { padding: 8 },
  paddingSm: { padding: 2 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  column: { flexDirection: "column" },
  smallText: { fontSize: 16, fontFamily: "Roboto-Light" },
  italic: { fontFamily: "Roboto-italic" },
  bordeR: { borderRadius: 6, overflow: "hidden" },
});
