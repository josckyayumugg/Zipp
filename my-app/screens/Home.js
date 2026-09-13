import { FlatList, View, StyleSheet, Pressable } from "react-native";

import { GlobalStyles } from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import FullWidthStoryCard from "../Components/FullCard";
import ProductCardHome from "../Components/ProductCardHom";
import Categories from "../Components/Categories";
import CreateDealModal from "../Components/CreateDealModal";

import {
  useGetAllProductDeals,
  useGetNewProductsHome,
} from "../_CustomHooks/ProductServices";

import FullWidthNoData from "../Components/FullCardNoData";
import LoadingPaging from "../Components/LoadingPaging";

export default function Home({ route }) {
  const Navigation = useNavigation();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isCreateDealOpen, setIsCreateDealOpen] = useState(false);
  const flatListRef = useRef(null);
  const [isCurrentDeal, setIsCurrentDeal] = useState(0);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isPending: isPendingDeals,
  } = useGetAllProductDeals();

  const dataDeals = data ? data?.pages.flatMap((page) => page) : [];

  const handleNext = () => {
    if (dataDeals.length === 0) return;

    if (
      isCurrentDeal >= dataDeals.length - 2 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }

    setIsCurrentDeal((prev) => (prev === dataDeals.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (dataDeals.length === 0) return;
    setIsCurrentDeal((prev) => (prev === 0 ? dataDeals.length - 1 : prev - 1));
  };

  const {
    data: dataHome,
    isLoading: isLoadingHomeProducts,
    hasNextPage: hasNextPageHomeProducts,
    isPending: pendingHomeProducts,
    fetchNextPage: fetchNextPageHomeProducts,
    isFetchingNextPage: isFetchingNextPageHomeProducts,
    error: errorHomeProducts,
  } = useGetNewProductsHome();
  const homeData = dataHome ? dataHome?.pages.flatMap((page) => page) : [];
  const activeProduct = dataDeals?.[isCurrentDeal];

  if (pendingHomeProducts) return <LoadingPaging />;

  return (
    <View style={[styles.container]}>
      <FlatList
        style={{ position: "relative" }}
        data={homeData}
        ref={flatListRef}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!isFetchingNextPageHomeProducts && hasNextPageHomeProducts) {
            fetchNextPageHomeProducts();
          }
        }}
        contentContainerStyle={{ padding: 2 }}
        renderItem={({ item }) => (
          <ProductCardHome
            Stylesy={{
              width: "85%",
              marginHorizontal: "auto",
            }}
            product={item}
            setIsImageLoaded={setIsImageLoaded}
            isImageLoaded={isImageLoaded}
            isFetchingNextPageHomeProducts={isFetchingNextPageHomeProducts}
            hasNextPageHomeProducts={hasNextPageHomeProducts}
            fetchNextPageHomeProducts={fetchNextPageHomeProducts}
            data={item}
          />
        )}
        ListHeaderComponent={
          <>
            {isCreateDealOpen && (
              <CreateDealModal
                visible={isCreateDealOpen}
                setIsVisible={setIsCreateDealOpen}
              />
            )}
            {dataDeals.length <= 0 ? (
              <FullWidthNoData
                isPending={isPendingDeals}
                setIsVisible={setIsCreateDealOpen}
              />
            ) : (
              <FullWidthStoryCard
                setIsCreateDealOpen={setIsCreateDealOpen}
                item={activeProduct}
                dataLength={dataDeals?.length}
                handleNext={handleNext}
                totalItems={dataDeals.length}
                currentIndex={isCurrentDeal}
                handlePrev={handlePrev}
              />
            )}
            <Categories />
          </>
        }
      />
      <View>
        <Pressable
          onPress={scrollToTop}
          style={[
            {
              backgroundColor: "black",
              position: "absolute",
              bottom: 4,
              left: 7,
              borderRadius: 50,
            },
          ]}
        >
          <Ionicons name={"arrow-up"} size={30} color={"white"} />
        </Pressable>
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
  italic: {
    fontFamily: "Roboto-italic",
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
  padding: {
    padding: 8,
  },
  paddingSm: {
    padding: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
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
  yellow: {
    color: GlobalStyles.Primary_Yellow,
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
    backgroundColor: GlobalStyles.Primary_Grey,

    margin: 6,
    borderWidth: 1,
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
    fontSize: 24,
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
  },

  bordeR: {
    borderRadius: 12,
    overflow: "hidden",
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
