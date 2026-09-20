import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";

export function useGetAllProducts(filters) {
  const pageSize = 15;
  return useInfiniteQuery({
    queryKey: ["getallProductspagination", filters],
    queryFn: async ({ pageParam }) => {
      const from = pageParam * pageSize;
      const to = from + pageSize - 1;

      let query = supabase.from("Products").select("*");

      if (filters?.brand) {
        query = query.eq("brand", filters?.brand);
      }

      if (filters?.year) {
        query = query.eq("year", filters?.year);
      }
      if (filters?.condition) {
        query = query.eq("condition", filters?.condition);
      }
      if (filters?.category) {
        query = query.eq("category", filters?.category);
      }
      if (filters?.model) {
        query = query.eq("model", filters?.model);
      }

      if (filters?.search && filters?.search.trim() !== "") {
        const cleanSearch = filters?.search.trim();
        query = query.or(
          `name.ilike.%${cleanSearch}%,details.ilike.%${cleanSearch}%,brand.ilike.%${cleanSearch}%,model.ilike.%${cleanSearch}%,more.ilike.%${cleanSearch}%`,
        );
      }

      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < pageSize) {
        return undefined;
      }
      return allPages.length;
    },

    enabled: !!filters?.shouldSearch,
  });
}

export function useGetAllProductDeals() {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: ["allDeals"],
    queryFn: async ({ pageParam }) => {
      const twentyFourHoursAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000,
      ).toISOString();
      let from = pageParam * 10;
      let to = from + pageSize - 1;

      const { data, error } = await supabase
        .from("Deals")
        .select("*")
        .gte("lastUpdatedAt", twentyFourHoursAgo)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      return data || [];
    },
    refetchInterval: 30 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < pageSize) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
  });
}
export function useGetAllMyProductDealsWithInvisible(id) {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: ["noFilterDeals", id],
    queryFn: async ({ pageParam }) => {
      let from = pageParam * 10;
      let to = from + pageSize - 1;

      const { data, error } = await supabase
        .from("Deals")
        .select("*")
        .eq("createdBy", id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      return data || [];
    },
    refetchInterval: 30 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < pageSize) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
    enabled: !!id,
  });
}
export function useGetNewProductsHome() {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: ["homeProducts"],
    queryFn: async ({ pageParam }) => {
      let from = pageParam * pageSize;
      let to = from + pageSize - 1;

      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("reported", false)

        .order("createdAt", { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      return data || [];
    },
    refetchInterval: 20 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < pageSize) {
        return undefined;
      }
      return allPages?.length;
    },
    initialPageParam: 0,
  });
}

export function useGetSingleProduct(id) {
  return useQuery({
    queryKey: ["getProduct", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    enabled: !!id,
  });
}
export function useReportProduct() {
  return useMutation({
    mutationFn: async ({ id, reported }) => {
      const { data, error } = await supabase
        .from("Products")
        .update({
          reported: reported,
          lastUpdatedAt: new Date().toISOString(),
        })
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

export function useGetSingleProductDeal(id) {
  return useQuery({
    queryKey: ["getDeal", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Deals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    enabled: !!id,
  });
}
export function useGetAllMyProducts(id) {
  const pageSize = 15;

  return useInfiniteQuery({
    queryKey: ["getMyAllProducts", id],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("profileId", id)
        .range(from, to)
        .order("createdAt", { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < pageSize) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
    enabled: !!id,
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (data) => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      const imageUrls = [];
      const uploadedFilePaths = [];

      for (const [i, imageUri] of data.images.entries()) {
        try {
          const response = await fetch(imageUri);
          const arrayBuffer = await response.arrayBuffer();

          const fileName = `${data.userId}/${Date.now()}-${i}.jpg`;

          const { data: uploadData, error: storageError } =
            await supabase.storage
              .from("Images")
              .upload(fileName, arrayBuffer, {
                contentType: "image/jpeg",
                upsert: false,
              });

          if (storageError) {
            throw storageError;
          }
          uploadedFilePaths.push(uploadData.path);

          const { data: publicUrlData } = supabase.storage
            .from("Images")
            .getPublicUrl(uploadData.path);

          if (publicUrlData?.publicUrl) {
            imageUrls.push(publicUrlData.publicUrl);
          }
        } catch (err) {
          if (uploadedFilePaths.length > 0) {
            await supabase.storage.from("Images").remove(uploadedFilePaths);
          }
          throw err;
        }
      }

      const { data: spData, error } = await supabase

        .from("Products")
        .insert([
          {
            name: data.name,
            price: data.price,
            brand: data.brand,
            model: data.model,
            details: data.details,
            year: data.year,
            condition: data.condition,
            category: data.category,
            more: data.more,
            currency: data.currency,
            images: imageUrls,
            profileId: data.userId,
          },
        ])
        .select();

      if (error) {
        if (uploadedFilePaths.length > 0) {
          const { data, error: removeError } = await supabase.storage
            .from("Images")
            .remove(uploadedFilePaths);
        }
        throw error;
      }

      return spData;
    },
  });
}
export function useCreateProductDeal() {
  return useMutation({
    mutationFn: async (data) => {
      const imageUrls = [];
      const uploadedFilePaths = [];

      for (const [i, imageUri] of data.images.entries()) {
        try {
          const response = await fetch(imageUri);
          const arrayBuffer = await response.arrayBuffer();

          const fileName = `${data.userId}/${Date.now()}-${i}.jpg`;

          const { data: uploadData, error: storageError } =
            await supabase.storage
              .from("Images")
              .upload(fileName, arrayBuffer, {
                contentType: "image/jpeg",
                upsert: false,
              });

          if (storageError) {
            throw storageError;
          }
          uploadedFilePaths.push(uploadData.path);

          const { data: publicUrlData } = supabase.storage
            .from("Images")
            .getPublicUrl(uploadData.path);

          if (publicUrlData?.publicUrl) {
            imageUrls.push(publicUrlData.publicUrl);
          }
        } catch (err) {
          if (uploadedFilePaths.length > 0) {
            await supabase.storage.from("Images").remove(uploadedFilePaths);
          }
          throw err;
        }
      }

      const { data: spData, error } = await supabase
        .from("Deals")
        .insert([
          {
            name: data.name,
            price: data.price,
            brand: data.brand,
            model: data.model,
            more: data.more,
            description: data.description,
            currency: data.currency,
            year: data.year,
            images: imageUrls,
            createdBy: data.userId,
          },
        ])
        .select();

      if (error) {
        if (uploadedFilePaths.length > 0) {
          const { data, error: removeError } = await supabase.storage
            .from("Images")
            .remove(uploadedFilePaths);
        }
        throw error;
      }

      return spData;
    },
  });
}
export function useEditProduct() {
  return useMutation({
    mutationFn: async (productData) => {
      const { id, ...updateFields } = productData;

      const { data, error } = await supabase
        .from("Products")
        .update(updateFields)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
export function useEditProductDeal() {
  return useMutation({
    mutationFn: async (dealData) => {
      const { id, ...updateFields } = dealData;

      const { data, error } = await supabase
        .from("Deals")
        .update(updateFields)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      return data;
    },
  });
}

export function useActivateProductDeal() {
  return useMutation({
    mutationFn: async (id) => {
      const { data, error } = await supabase
        .from("Deals")
        .update({ lastUpdatedAt: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: async (id) => {
      const { error, data: spData } = await supabase
        .from("Products")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      return spData;
    },
  });
}
export function useDeleteProductDeal() {
  return useMutation({
    mutationFn: async (id) => {
      const { error, data: spData } = await supabase
        .from("Deals")
        .delete()
        .eq("id", id);
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
export function useCountProductsDeals(id) {
  return useQuery({
    queryKey: ["DealsNumber", id],
    queryFn: async () => {
      const twentyFourHoursAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000,
      ).toISOString();
      const { count, error } = await supabase
        .from("Deals")
        .select("id", { count: "exact" })
        .eq("createdBy", id)
        .gte("lastUpdatedAt", twentyFourHoursAgo);

      if (error) {
        throw new Error(error.message);
      }

      return count ?? 0;
    },

    enabled: !!id,
  });
}
