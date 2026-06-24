import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAllPatients(id) {
  return useQuery({
    queryKey: ["AllPatients"],
    queryFn: async () => {
      let { data, error } = await supabase
        .from("Patients")
        .select("*")
        .eq("hospitalId", id);
      if (error) {
        throw error;
      }
      return data;
    },
  });
}

