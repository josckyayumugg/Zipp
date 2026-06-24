import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// this function will look into the computer memory and look at the avalibal session and then after usere load the app without login he can still be logged in :
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  return data?.user;
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
export function useSignedUpData() {
  return useQuery({
    queryFn: async ({ email, password }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }
      return true;
    },
  });
}
export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      return true;
    },
  });
}
export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      let { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
  });
}

export async function updateUser({ email, password }) {
  return useQuery({
    queryKey: ["updateUser"],
    queryFn: async () => {
      let { data, error } = await supabase.auth.updateUser({
        email: "new@email.com",
        password: "new-password",
        data: { hello: "world" },
      });
    },
  });
}

export function useCreateProfile() {
  return useMutation({
    mutationFn: async (data) => {
      let { spData, error } = await supabase
        .from("Profiles")
        .insert([
          {
            businessNames: data.businessNames,
            sellerNames: data.ownerNames,
            whatsapp: data.whatsapp,
            businessEmail: data.email,
            tin: data.tin,
            profileId: data.userId,
            website: data.website,
            directions: data.directions,
          },
        ])
        .select()
        .single(); // 👈 returns one object instead of array

      if (error) {
        throw error;
      }

      return spData;
    },
  });
}

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      // This returns the user object (containing the id) out of the async block safely
      return user;
    },
  });
}
