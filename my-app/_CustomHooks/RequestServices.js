import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";

export function useCreateRequest() {
  return useMutation({
    mutationFn: async (data) => {
      const { data: spData, error } = await supabase
        .from("Requests")
        .insert([data])
        .select();
      if (error) {
        console.error("Error creating  request:", error.message);
        throw error;
      }
      return spData;
    },
  });
}
export function useDeleteRequest() {
  return useMutation({
    mutationFn: async (id) => {
      const { data: spData, error } = await supabase
        .from("Requests")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        throw error;
      }
      return spData;
    },
  });
}

export function useGetSingleRequest(id) {
  return useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      try {
        const { data: spData, error } = await supabase
          .from("Requests")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        return spData;
      } catch (error) {
        console.error("Error fetching request:", error);
        throw error; // Let React Query know the query failed.
      }
    },
    enabled: !!id,
  });
}
export function useGetAllMyRequests(id, query) {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: ["AllMyRequests", id, query],

    queryFn: async ({ pageParam }) => {
      const from = pageParam * pageSize;

      const to = from + pageSize - 1;

      let request = supabase.from("Requests").select("*").eq("createdBy", id);

      if (query) {
        request = request.or(
          `name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`,
        );
      }

      request = request
        .order("createdAt", {
          ascending: false,
        })
        .range(from, to);

      const { data, error } = await request;

      if (error) throw error;

      return data || [];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < pageSize) {
        return undefined;
      }
      return allPages.length;
    },

    enabled: !!id,
  });
}
export function useGetAllRequests(filter, bool, search) {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: ["AllRequests", filter, bool, search],
    queryFn: async ({ pageParam }) => {
      const from = pageSize * pageParam;
      const to = from + pageSize - 1;
      let query = supabase.from("Requests").select("*");

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,brand.ilike.%${search}%,description.ilike.%${search}%,modal.ilike.%${search}%,more.ilike.%${search}%`,
        );
      }

      query = query
        .order(`${filter}`, {
          ascending: bool,
        })
        .range(from, to);

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // cache is fresh for 5 minutes
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If last fetched page had fewer items than pageSize, we hit the end
      if (lastPage.length < pageSize) {
        return undefined; // No more pages
      }
      return allPages.length; // Next page number (0, 1, 2...)
    },
  });
}
export function useEditResponse() {
  return useMutation({
    mutationFn: async (updatedData) => {
      const { data, error } = await supabase
        .from("Responses")
        .update(updatedData)
        .eq("id", updatedData.id)
        .select()
        .single();
      if (error) {
        throw error;
      }
      return data;
    },
  });
}
export function useEditRequest() {
  return useMutation({
    mutationFn: async (updatedData) => {
      try {
        const { data, error } = await supabase
          .from("Requests")
          .update(updatedData)
          .eq("id", updatedData.id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.error("Error updating request:", error);
        throw error;
      }
    },
  });
}

export function subscribeToRequests({ data }) {
  return useQuery({
    queryKey: ["subscribe"],
    queryFn: async () => {
      const Requests = supabase
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "Requests" },
          (payload) => {
            console.log("Change received!", payload);
          },
        )
        .subscribe();
    },
  });
}
export function useGetAllResponses({ id }) {
  return useQuery({
    queryKey: ["response"],
    queryFn: async () => {
      let { data: spData, error } = await supabase
        .from("Responses")
        .select("*");
      if (error) {
        console.error("Error fetching single product:", error.message);
        throw error;
      }
      return spData;
    },
  });
}

export function useSubscribeResponse({ id }) {
  return useQuery({
    queryKey: ["subscribeResponse"],
    queryFn: async () => {
      const Responses = supabase
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "Responses" },
          (payload) => {
            console.log("Change received!", payload);
          },
        )
        .subscribe();
    },
  });
}

export function useCountProducts(id) {
  return useQuery({
    queryKey: ["productsNumber", id],
    queryFn: async () => {
      console.log("Fetching product count for profileId:", id);

      const { count, error } = await supabase
        .from("Products")
        .select("id", { count: "exact" })
        .eq("profileId", id);

      if (error) {
        throw new Error(error.message || "Failed to count products");
      }

      return count ?? 0;
    },
    // 🛑 CRITICAL: Do NOT run this query until a valid 'id' is passed
    enabled: !!id,
  });
}
export function useCountMyRequests(id) {
  return useQuery({
    queryKey: ["MyRequestsNumber", id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("Requests")
        .select("id", { count: "exact", head: true })
        .eq("createdBy", id);

      if (error) {
        // Log all error properties explicitly

        throw new Error(error.message);
      }

      return count ?? 0;
    },
    // 🛑 CRITICAL: Do NOT run this query until a valid 'id' is passed
    enabled: !!id,
  });
}
