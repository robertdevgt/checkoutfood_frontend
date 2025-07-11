import { z } from "zod";

export const ProductSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    img: z.string(),
    status: z.boolean(),
}); 

export const CartItemSchema = z.object({
    product_id: z.string(),
    product_name: z.string(),
    price: z.number(),
    quantity: z.number(),
    sub_total: z.number(),
    img: z.string()
});

export const ProductsSchema = z.array(ProductSchema);