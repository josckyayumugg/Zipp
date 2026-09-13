import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../Constants";
import { useGetCurrentUser } from "../_CustomHooks/Authentication";

import {
  useGetMyNotifications,
  useMarkNotificationRead,
} from "../_CustomHooks/NotificationServices";
import { formatDateTime } from "../Helpers";
import LoadingPaging from "../Components/LoadingPaging";
import ErrorPage from "../Components/ErrorPage";
import NoProductsProfile from "../Components/NoProductsProfile";
import { useNavigation } from "@react-navigation/native";

export default function NotificationsPage() {
  const navigator = useNavigation();
  const { data: user, isPending: isPendingUser } = useGetCurrentUser();

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMyNotifications(user?.id);

  const { mutate: markRead } = useMarkNotificationRead();

  if (isPendingUser || isPending) return <LoadingPaging />;
  if (isError) return <ErrorPage message={error?.message} />;

  const notifications = data?.pages?.flat() ?? [];

  if (notifications.length <= 0) {
    return <NoProductsProfile message={"No notifications yet"} />;
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            if (!item.isRead) markRead(item.id);
            if (item.type === "new_request") {
              navigator.navigate("Tabs", {
                screen: "Request",
                params: { type: "allRequests", RequestId: item?.relatedId },
              });
            }
            if (item.type === "new_response") {
              navigator.navigate("Replies", { relatedId: item?.relatedId });
            }
            // navigate somewhere based on item.type / item.relatedId if needed
          }}
          style={({ pressed }) => [
            pressed && styles.pressed,
            styles.card,
            !item.isRead
              ? { backgroundColor: "#FFF8E1" }
              : { backgroundColor: GlobalStyles.Primary_Grey3 },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
          <Text style={styles.date}>{formatDateTime(item.createdAt)}</Text>
        </Pressable>
      )}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.4}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: GlobalStyles.Primary_Grey,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  title: { fontFamily: "Roboto-semibold", fontSize: 15 },
  body: { fontFamily: "Roboto-Light", fontSize: 13, marginTop: 2 },
  date: { fontSize: 11, color: GlobalStyles.Primary_Grey4, marginTop: 6 },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
