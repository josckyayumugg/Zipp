import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";

export function useCreateResponse(data) {
  return useMutation({
    mutationFn: async (data) => {
      console.log({ dore: data });
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
      console.log("here to delete", id);
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

export function useGetAllResponses(id, query) {
  return useQuery({
    queryKey: ["AllMyRequests", id, query],

    queryFn: async () => {
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
export function useEditResponse() {
  return useMutation({
    mutationFn: async (updatedData) => {
      try {
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
      } catch (error) {
        console.error("Error updating request:", error);
        throw error;
      }
    },
  });
}
