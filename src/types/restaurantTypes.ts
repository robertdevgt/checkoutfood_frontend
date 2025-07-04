import type { RestaurantSchema } from "@/schemas/restaurantSchemas";
import type { z } from "zod";

export type Restaurant = z.infer<typeof RestaurantSchema>;
export type RestaurantForm = Pick<Restaurant, 'address' |'description' |'latitude'|'longitude'|'manager'|'name'> & {
    logo: FileList
};