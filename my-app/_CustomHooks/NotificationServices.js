import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";

export function useGetMyNotifications(profileId) {
  const pageSize = 20;

  return useInfiniteQuery({
    queryKey: ["myNotifications", profileId],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabase
        .from("Notifications")
        .select("*")
        .eq("profileId", profileId)
        .order("createdAt", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return data ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < pageSize) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
    enabled: !!profileId,
  });
}

export function useMarkNotificationRead() {
  return useMutation({
    mutationFn: async (notificationId) => {
      const { error } = await supabase
        .from("Notifications")
        .update({ isRead: true })
        .eq("id", notificationId);

      if (error) throw error;
    },
  });
}
