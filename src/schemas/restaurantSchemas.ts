import { z } from "zod";
import { ProductSchema } from "./productSchemas";

export const RestaurantSchema = z.object({
    _id: z.string(),
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    logo: z.string(),
    manager: z.string(),
    description: z.string(),
});

export const RestaurantsSchema = z.array(RestaurantSchema);
export const NerbyRestaurantsSchema = z.array(RestaurantSchema.pick({_id: true, name: true, address: true, logo: true}).extend({
    distance: z.number()
}));


export const RestaurantPublicViewSchema = RestaurantSchema.pick({_id: true, name: true, address: true, latitude: true, longitude:true, logo: true, description:true}).extend({
    products: z.array(ProductSchema)
});

export const RestaurantDetailsSchema = RestaurantSchema.pick({_id: true, name: true, address:true, latitude: true, longitude:true, logo:true, description:true, manager:true}).extend({
    products: z.array(ProductSchema)
})