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