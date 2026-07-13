import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";

export function useCreateRequest() {
  return useMutation({
    mutationFn: async (data) => {
      console.log("mbaho se");
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
export function useGetAllMyRequests(id) {
  return useQuery({
    queryKey: ["AllMyRequests", id],
    queryFn: async () => {
      try {
        const { data: spData, error } = await supabase
          .from("Requests")
          .select("*")
          .eq("createdBy", id)
          .order("createdAt", { ascending: false });

        if (error) {
          throw error;
        }

        return spData;
      } catch (error) {
        console.error("Error fetching all requests:", error);
        throw error; // React Query needs this so it knows the query failed.
      }
    },
    enabled: !!id,
  });
}

export function useEditRequest() {
  return useMutation({
    mutationFn: async (updatedData) => {
      console.log("44", updatedData);
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
