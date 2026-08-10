import {
  useQuery,
  mutationFn,
  useMutation,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import { TouchableWithoutFeedbackBase } from "react-native";

export function useGetAllProducts(filters, page) {
  return useInfiniteQuery({
    queryKey: ["getallProductspagination", filters, page],
    queryFn: async () => {
      const pageSize = 15;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase.from("Products").select("*");

      // Add filters here...
      if (filters?.brand) {
        query = query.eq("brand", filters.brand);
      }

      if (filters?.year) {
        query = query.eq("year", filters.year);
      }
      if (filters?.condition) {
        query = query.eq("condition", filters.condition);
      }
      if (filters?.category) {
        query = query.eq("category", filters.category);
      }
      if (filters?.model) {
        query = query.eq("model", filters.model);
      }

      if (filters?.search && filters.search.trim() !== "") {
        const cleanSearch = filters.search.trim();
        query = query.or(
          `name.ilike.%${cleanSearch}%,details.ilike.%${cleanSearch}%,brand.ilike.%${cleanSearch}%,model.ilike.%${cleanSearch}%,more.ilike.%${cleanSearch}%`,
        );
      }

      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        console.log("error fetching product", error);
        throw error;
      }

      return data;
    },
    enabled: filters.shouldSearch,
    placeholderData: keepPreviousData,
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
      let to = from + 9;

      // 💡 2. Use .eq() to filter by the product ID column
      const { data, error } = await supabase
        .from("Deals")
        .select("*")

        .gte("created_at", twentyFourHoursAgo)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      return data || [];
    },
    refetchInterval: 30 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      // If last fetched page had fewer items than pageSize, we hit the end
      if (lastPage.length < pageSize) {
        return undefined; // No more pages
      }
      return allPages.length; // Next page number (0, 1, 2...)
    },
    initialPageParam: 0,
  });
}
export function useGetAllMyProductDealsWithInvisible(id) {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: ["noFilterDeals"],
    queryFn: async ({ pageParam }) => {
      let from = pageParam * 10;
      let to = from + 9;

      // 💡 2. Use .eq() to filter by the product ID column
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
      // If last fetched page had fewer items than pageSize, we hit the end
      if (lastPage.length < pageSize) {
        return undefined; // No more pages
      }
      return allPages.length; // Next page number (0, 1, 2...)
    },
    initialPageParam: 0,
  });
}
export function useGetNewProductsHome() {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: ["homeProducts"],
    queryFn: async ({ pageParam }) => {
      let from = pageParam * 10;
      let to = from + 9;

      // 💡 2. Use .eq() to filter by the product ID column
      const { data, error } = await supabase
        .from("Products")
        .select("*")

        .order("createdAt", { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }
      return data || [];
    },
    refetchInterval: 20 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      // If last fetched page had fewer items than pageSize, we hit the end
      if (lastPage.length < pageSize) {
        return undefined; // No more pages
      }
      return allPages.length; // Next page number (0, 1, 2...)
    },
    initialPageParam: 0,
  });
}

export function useGetSingleProduct(id) {
  return useQuery({
    // 💡 1. Put 'id' in the key so query refetches when ID changes
    queryKey: ["getProduct", id],
    queryFn: async () => {
      console.log("kigali house", id);
      // 💡 2. Use .eq() to filter by the product ID column
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("id", id)
        .single(); // Grab just the single object instead of an array

      if (error) {
        console.error("Error fetching single product:", error.message);
        throw error;
      }

      return data;
    },
    // 💡 3. Only run this network request if an actual ID is passed in
    enabled: !!id,
  });
}
export function useGetSingleProductDeal(id) {
  return useQuery({
    // 💡 1. Put 'id' in the key so query refetches when ID changes
    queryKey: ["getDeal", id],
    queryFn: async () => {
      // 💡 2. Use .eq() to filter by the product ID column
      const { data, error } = await supabase
        .from("Deals")
        .select("*")
        .eq("id", id)
        .single(); // Grab just the single object instead of an array

      if (error) {
        console.error("Error fetching single product:", error.message);
        throw error;
      }
      console.log("wetin", data);
      return data;
    },
    // 💡 3. Only run this network request if an actual ID is passed in
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

      if (error) throw error;

      return data; // ✅ this line is the fix
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < pageSize) return undefined;
      return allPages.length;
    },
    initialPageParam: 0, // ✅ also needed
    enabled: !!id,
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (data) => {
      console.log("Starting product creation with data:", data);

      const imageUrls = [];
      const uploadedFilePaths = [];

      // 1. UPLOAD IMAGES
      for (const [i, imageUri] of data.images.entries()) {
        try {
          // Convert local Expo image URI to binary buffer
          const response = await fetch(imageUri);
          const arrayBuffer = await response.arrayBuffer();

          // ⚠️ HARDCODED CLEAN PATH: Completely ignores raw imageUri extension quirks
          const fileName = `${data.userId}/${Date.now()}-${i}.jpg`;

          // Upload to Supabase
          const { data: uploadData, error: storageError } =
            await supabase.storage
              .from("Images")
              .upload(fileName, arrayBuffer, {
                contentType: "image/jpeg",
                upsert: true,
              });

          if (storageError) {
            console.error("Storage upload error:", storageError);
            throw storageError;
          }
          uploadedFilePaths.push(uploadData.path);

          // Get permanent public URL
          const { data: publicUrlData } = supabase.storage
            .from("Images")
            .getPublicUrl(uploadData.path);

          if (publicUrlData?.publicUrl) {
            imageUrls.push(publicUrlData.publicUrl);
          }
        } catch (err) {
          console.error(`Failed to process image ${i}:`, err);

          // Rollback any images uploaded before this failure
          if (uploadedFilePaths.length > 0) {
            await supabase.storage.from("Images").remove(uploadedFilePaths);
          }
          throw err;
        }
      }

      // 2. INSERT INTO DATABASE
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
            category: data.type,
            more: data.more,
            currency: data.currency,
            images: imageUrls, // Guaranteed clean URLs ending in .jpg
            profileId: data.userId,
          },
        ])
        .select();

      if (error) {
        console.log({ createProductError: error });
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
      console.log("kido", data);
      const imageUrls = [];
      const uploadedFilePaths = [];

      // 1. UPLOAD IMAGES
      for (const [i, imageUri] of data.images.entries()) {
        try {
          // Convert local Expo image URI to binary buffer
          const response = await fetch(imageUri);
          const arrayBuffer = await response.arrayBuffer();

          // ⚠️ HARDCODED CLEAN PATH: Completely ignores raw imageUri extension quirks
          const fileName = `${data.userId}/${Date.now()}-${i}.jpg`;

          // Upload to Supabase
          const { data: uploadData, error: storageError } =
            await supabase.storage
              .from("Images")
              .upload(fileName, arrayBuffer, {
                contentType: "image/jpeg",
                upsert: true,
              });

          if (storageError) {
            console.error("Storage upload error:", storageError);
            throw storageError;
          }
          uploadedFilePaths.push(uploadData.path);

          // Get permanent public URL
          const { data: publicUrlData } = supabase.storage
            .from("Images")
            .getPublicUrl(uploadData.path);

          if (publicUrlData?.publicUrl) {
            imageUrls.push(publicUrlData.publicUrl);
          }
        } catch (err) {
          console.error(`Failed to process image ${i}:`, err);

          // Rollback any images uploaded before this failure
          if (uploadedFilePaths.length > 0) {
            await supabase.storage.from("Images").remove(uploadedFilePaths);
          }
          throw err;
        }
      }

      // 2. INSERT INTO DATABASE
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
            images: imageUrls, // Guaranteed clean URLs ending in .jpg
            createdBy: data.userId,
          },
        ])
        .select();

      if (error) {
        console.log("createProduct", error);
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
      console.log("trying to edit");

      const { id, ...updateFields } = productData;

      const { data, error } = await supabase
        .from("Products")
        .update(updateFields)
        .eq("id", id)
        .select(); // optional but useful to return updated row

      if (error) {
        console.log("DB error:", error);
        throw error;
      }

      return data;
    },
  });
}
export function useEditProductDeal() {
  return useMutation({
    mutationFn: async (dealData) => {
      console.log("trying to edit deal");

      const { id, ...updateFields } = dealData;

      const { data, error } = await supabase
        .from("Deals")
        .update(updateFields)
        .eq("id", id)
        .select(); // optional but useful to return updated row

      if (error) {
        console.log("DB error:", error);
        throw error;
      }

      return data;
    },
  });
}
export function useDeleteProduct() {
  return useMutation({
    mutationFn: async (id) => {
      const { error, spData } = await supabase
        .from("Products")
        .delete()
        .eq("id", id);
      if (error) {
        console.log("DB error:", error);
        throw error;
      }
      return spData;
    },
  });
}
export function useDeleteProductDeal() {
  return useMutation({
    mutationFn: async (id) => {
      console.log("imyeyo", id);
      const { error, spData } = await supabase
        .from("Deals")
        .delete()
        .eq("id", id);
      if (error) {
        console.log("DB error:", error);
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
      console.log("Fetching product count for profileId:", id);

      const { count, error } = await supabase
        .from("Products")
        .select("id", { count: "exact" })
        .eq("profileId", id);

      if (error) {
        throw new Error(error.message || "Failed to count products");
      }

      return count ?? 0;
    },
    // 🛑 CRITICAL: Do NOT run this query until a valid 'id' is passed
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
        .select("id", { count: "exact", head: true })
        .eq("createdBy", id)
        .gte("created_at", twentyFourHoursAgo);

      if (error) {
        // Log all error properties explicitly

        throw new Error(error.message);
      }

      return count ?? 0;
    },
    // 🛑 CRITICAL: Do NOT run this query until a valid 'id' is passed
    enabled: !!id,
  });
}
