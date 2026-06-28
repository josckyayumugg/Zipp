import { useQuery } from "@tanstack/react-query";
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
        console.error("Error creating  product:", error.message);
        throw error;
      }
      return spData;
    },
  });
}
export function useDeleteRequest() {
  return useMutation({
    mutationFn: async (id) => {
      const { spData, error } = await supabase
        .from("Requests")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error deleting  product:", error.message);
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
      let { data: spData, error } = await supabase
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
export function useGetAllMyRequests(id) {
  return useQuery({
    queryKey: ["AllRequests"],
    queryFn: async () => {
      let { data: spData, error } = await supabase
        .from("Requests")
        .select("*")
        .eq("profileId", profileId);

      if (error) {
        console.error("Error fetching All Products:", error.message);
        throw error;
      }
      return spData;
    },
    enabled: !!id,
  });
}

export function useEditRequest({ id }) {
  return useMutation({
    queryKey: ["editRequest"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Requests")
        .update({ other_column: "otherValue" })
        .eq("some_column", "someValue")
        .select();
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
export function useDeleteResponse({ id }) {
  return useQuery({
    queryKey: ["response"],
    queryFn: async () => {
      const { error } = await supabase.from("Responses").delete().eq("id", id);
    },
  });
}
export function useSubscribeResponse({ id }) {
  return useQuery({
    queryKey: ["response"],
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
export function useEditResponse({ id }) {
  return useQuery({
    queryKey: ["response"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Responses")
        .update({ other_column: "otherValue" })
        .eq("some_column", "someValue")
        .select();
    },
  });
}
