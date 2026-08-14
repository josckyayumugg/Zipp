import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";
import { enableFreeze } from "react-native-screens";

export function useCreateResponse(data) {
  return useMutation({
    mutationFn: async (data) => {
      const { data: spData, error } = await supabase
        .from("Responses")
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

export function useDeleteResponses() {
  return useMutation({
    mutationFn: async (id) => {
      const { data: spData, error } = await supabase
        .from("Responses")
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

export function useGetAllResponses(id, query) {
  return useQuery({
    queryKey: ["allResponses", id, query],

    queryFn: async () => {
      //i used request instead of responses//
      try {
        let request = supabase
          .from("Responses")
          .select("*")
          .eq("createdBy", id);

        if (query) {
          request = request.or(
            `name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`,
          );
        }

        request = request.order("createdAt", {
          ascending: false,
        });

        const { data, error } = await request;

        if (error) throw error;

        return data;
      } catch (error) {
        console.error("Error fetching all requests:", error);
        throw error;
      }
    },

    enabled: !!id,
  });
}
export function useGetAllMyResponses(id) {
  //it is the same as usegetallresponses

  const pageSize = 15;
  return useInfiniteQuery({
    queryKey: ["allMyResponses", id],

    queryFn: async ({ pageParam }) => {
      let from = pageParam * pageSize;
      let to = from + 14;

      const { data, error } = await supabase
        .from("Responses")
        .select("*")
        .eq("createdBy", id)

        .order("createdAt", {
          ascending: false,
        })
        .range(from, to);

      if (error) {
        console.log("inyungu", error);
        throw error;
      }

      return data || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      // If last fetched page had fewer items than pageSize, we hit the end
      if (lastPage.length < pageSize) {
        return undefined; // No more pages
      }
      return allPages.length; // Next page number (0, 1, 2...)
    },
    initialPageParam: 0,
    enabled: !!id,
  });
}
export function useGetReqResponses(id) {
  return useQuery({
    queryKey: ["requests", id],
    queryFn: async () => {
      console.log("ingiga");
      const { data, error } = await supabase
        .from("Responses")
        .select("*")
        .eq("request", id);

      if (error) {
        console.log({ errorResponses: error });
        throw error;
      }

      return data;
    },
    enabled: !!id,
  });
}
export function useGetSingleResponse(id) {
  return useQuery({
    queryKey: ["response", id],
    queryFn: async () => {
      console.log("doreko", "mwigize");
      const { data, error } = await supabase
        .from("Responses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log({ errorSingleResponse: error });
        throw error;
      }

      return data;
    },
    enabled: !!id,
  });
}
// export function useEditResponse() {
//   return useMutation({
//     mutationFn: async (updatedData) => {
//       try {
//         const { data, error } = await supabase
//           .from("Responses")
//           .update(updatedData)
//           .eq("id", updatedData.id)
//           .select()
//           .single();

//         if (error) {
//           throw error;
//         }

//         return data;
//       } catch (error) {
//         console.error("Error updating request:", error);
//         throw error;
//       }
//     },
//   });
// }

export function useCountMyResponses(id) {
  return useQuery({
    queryKey: ["countedDeals", id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("Responses")
        .select("id", { count: "exact", head: true })
        .eq("createdBy", id);

      if (error) {
        // Log all error properties explicitly

        throw error;
      }

      return count ?? 0;
    },
    // 🛑 CRITICAL: Do NOT run this query until a valid 'id' is passed
    enabled: !!id,
  });
}
// export function useDeleteResponse({ id }) {
//   return useQuery({
//     queryKey: ["deleteResponse"],
//     queryFn: async () => {
//       const { error } = await supabase.from("Responses").delete().eq("id", id);
//     },
//   });
// }

export function useEditResponse() {
  return useMutation({
    mutationFn: async (updatedData) => {
      console.log("zunguzayi", updatedData);
      const { id, ...editFields } = updatedData;
      const { data, error } = await supabase
        .from("Responses")
        .update(editFields)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
