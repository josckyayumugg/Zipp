import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, errorUser } = await supabase.auth.getUser();

  if (errorUser) {
    throw errorUser;
  }

  return data?.user;
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signUp({
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
    queryKey: ["signedUp"],
    queryFn: async () => {
      const { user, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return true;
    },
  });
}

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) return null;
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      let { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: async (updateData) => {
      let { data, error } = await supabase.auth.updateUser({
        password: updateData.password,
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
}
export function useUpdateProfile() {
  return useMutation({
    mutationFn: async ({ id, ...dataToUpdate }) => {
      let { data, error } = await supabase
        .from("Profiles")
        .update(dataToUpdate)
        .eq("id", id)
        .select()
        .single();
      if (error) {
        throw error;
      }
      return data;
    },
  });
}

export function useCreateProfile() {
  return useMutation({
    mutationFn: async (data) => {
      
      let { data: spData, error } = await supabase
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
            phone: data.phone,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return spData;
    },
  });
}

export function useGetCurrentProfile(id) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Profiles")
        .select("*")
        .eq("profileId", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useConfirm() {
  return useMutation({
    mutationFn: async ({ email, token }) => {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: token,
        type: "email",
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
}
export function useConfirmPassword() {
  return useMutation({
    mutationFn: async ({ email, token }) => {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: token,
        type: "recovery",
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
}
export function useRequireToken() {
  return useMutation({
    mutationFn: async ({ email }) => {
      const { error, data } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw error;
      }
      return data;
    },
  });
}
