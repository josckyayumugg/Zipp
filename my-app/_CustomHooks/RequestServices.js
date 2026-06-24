import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export async function createRequest({ data }) {
  return useMutation({
    queryKey: ["createRequest"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Requests")
        .insert([{ data }])
        .select();
    },
  });
}
export function deleteRequest({ data }) {
  return useMutation({
    queryKey: ["deleteReques"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Requests")
        .insert([{ data }])
        .select();
    },
  });
}
export function editRequest({ id }) {
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
export function createResponse({ id }) {
  return useQuery({
    queryKey: ["response"],
    queryFn: async () => {
      let { data: Responses, error } = await supabase
        .from("Responses")
        .select("*");
    },
  });
}
export function deleteResponse({ id }) {
  return useQuery({
    queryKey: ["response"],
    queryFn: async () => {
      const { error } = await supabase.from("Responses").delete().eq("id", id);
    },
  });
}
export function responseSubscribe({ id }) {
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
export function editResponse({ id }) {
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
