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
      const { data: spData, error } = await supabase
        .from("Requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return spData;
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
export function useGetAllRequests(filter, bool, search, profileId) {
  const pageSize = 10;

  return useInfiniteQuery({
    queryKey: ["AllRequests", filter, bool, search, profileId],
    queryFn: async ({ pageParam }) => {
      const from = pageSize * pageParam;
      const to = from + pageSize - 1;
      let query = supabase.from("Requests").select("*");

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,brand.ilike.%${search}%,description.ilike.%${search}%,modal.ilike.%${search}%,more.ilike.%${search}%`,
        );
      }
      if (profileId) {
        query = query.neq("createdBy", profileId);
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
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < pageSize) {
        return undefined;
      }
      return allPages.length;
    },
    enabled: !!profileId,
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
        throw error;
      }
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
        throw error;
      }
      return spData;
    },
  });
}

export function useCountProducts(id) {
  return useQuery({
    queryKey: ["productsNumber", id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("Products")
        .select("id", { count: "exact" })
        .eq("profileId", id);

      if (error) {
        throw new Error(error.message || "Failed to count products");
      }

      return count ?? 0;
    },

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
        throw new Error(error.message);
      }

      return count ?? 0;
    },

    enabled: !!id,
  });
}
