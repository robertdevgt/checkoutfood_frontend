import { z } from "zod";

export const RestaurantSchema = z.object({
    _id: z.string(),
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    logo: z.string(),
    manager: z.string(),
    description: z.string()
});

export const RestaurantsSchema = z.array(RestaurantSchema);
