import { useQuery, mutationFn, useMutation } from "@tanstack/react-query";
import { supabase } from "../_lib/supabase";

export async function getAllProducts() {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      let { data: Products, error } = await supabase
        .from("Products")
        .select("*");
    },
  });
}
export async function getAllProductsWithPagination() {
  return useQuery({
    queryKey: ["getallProductspagination"],
    queryFn: async () => {
      let { data: Products, error } = await supabase
        .from("Products")
        .select("*")
        .range(0, 9);
    },
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

export function useCreateProduct() {
  console.log("stargin to create the product");
  //createProduct
  // URL: //xznllnvmbydybkpxcivo.supabase.co/storage/v1/object/sign/Images/Screenshot%202026-06-08%20175245.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTc0NDRhZC0xMWU1LTRiMzAtODY0YS0xNjNhZmVjZWQ1YzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvU2NyZWVuc2hvdCAyMDI2LTA2LTA4IDE3NTI0NS5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMDU1Mzk5LCJleHAiOjIwOTc0MTUzOTl9.d7jTRp1etEzPmOxG5FPvf9McBRyUotrkG0-T7m3p6So

  return useMutation({
    mutationFn: async (data) => {
      console.log("Incoming data:", data);

      const imageUrls = [];

      // 1. UPLOAD IMAGES FIRST
      for (const [i, imageUri] of data.images.entries()) {
        // convert blob URL -> real file
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // create unique file name
        const fileName = `${data.userId}/${Date.now()}-${i}.jpg`;

        // upload to Supabase Storage
        const { data: uploadData, error: storageError } = await supabase.storage
          .from("Images") // ⚠️ must match bucket name exactly
          .upload(fileName, blob, {
            contentType: "image/jpeg",
          });

        if (storageError) {
          console.log("Upload error:", storageError);
          throw storageError;
        }

        // 2. GET PUBLIC URL
        const { data: publicUrlData } = supabase.storage
          .from("Images")
          .getPublicUrl(uploadData.path);

        imageUrls.push(publicUrlData.publicUrl);
      }

      // 3. INSERT PRODUCT AFTER UPLOADS
      const { data: spData, error } = await supabase
        .from("Products")
        .insert([
          {
            name: data.name,
            price: data.price,
            brand: data.brand,
            modal: data.modal,
            details: data.details,
            year: data.year,
            images: imageUrls, // ✅ final URLs
            profileId: data.userId,
          },
        ])
        .select();

      if (error) {
        console.log("DB error:", error);
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
