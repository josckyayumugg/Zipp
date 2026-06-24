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

export async function getSingleProduct(id) {
  return useQuery({
    queryKey: ["getProduct"],
    queryFn: async () => {
      let { data: Products, error } = await supabase
        .from("Products")
        .select(id);
    },
  });
}

export function useCreateProduct() {
  console.log("stargin to create the product");
  //createProduct
  // URL: //xznllnvmbydybkpxcivo.supabase.co/storage/v1/object/sign/Images/Screenshot%202026-06-08%20175245.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTc0NDRhZC0xMWU1LTRiMzAtODY0YS0xNjNhZmVjZWQ1YzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvU2NyZWVuc2hvdCAyMDI2LTA2LTA4IDE3NTI0NS5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMDU1Mzk5LCJleHAiOjIwOTc0MTUzOTl9.d7jTRp1etEzPmOxG5FPvf9McBRyUotrkG0-T7m3p6So

  return useMutation({
    mutationFn: async (data) => {
      console.log(222,data);
      const names = data?.images.map((item, i) =>
        `${i}-${item}`.replaceAll("/", ""),
      );
      const imagePaths = names.map(
        (el) =>
          `${"https://xznllnvmbydybkpxcivo.supabase.co"}/storage/v1/object/sign/Images/${el}`,
      );

      const { spData, error } = await supabase
        .from("Products")
        .insert([
          {
            name: data.title,
            price: data.price,
            brand: data.brand,
            modal: data.modal,
            details: data.details,
            year: data.year,
            images: imagePaths,
            profileId: data.userId,
          },
        ])
        .select();
      if (error) {
        console.log(error);
        throw error;
      }
      return spData;
    },
  });
}
export async function editProduct({ data }) {
  return useQuery({
    queryKey: ["editProduct"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Products")
        .insert([{ some_column: "someValue", other_column: "otherValue" }])
        .select();
    },
  });
}
export async function deleteProduct(id) {
  return useQuery({
    queryKey: ["deleteProduct"],
    queryFn: async () => {
      const { error } = await supabase.from("Products").delete().eq("id", id);
    },
  });
}
