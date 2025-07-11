import type { CartItemSchema, ProductSchema } from "@/schemas/productSchemas";
import type { z } from "zod";

export type Product = z.infer<typeof ProductSchema>;
export type ProductForm = Pick<Product, 'category' | 'description' | 'name' | 'price'> & {
    img: File
};

export type CartItem = z.infer<typeof CartItemSchema>;