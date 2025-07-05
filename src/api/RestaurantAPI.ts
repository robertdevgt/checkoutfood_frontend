import type { Coords } from "@/components/Map";
import api from "@/lib/axios";
import { NerbyRestaurantsSchema, RestaurantsSchema } from "@/schemas/restaurantSchemas";
import type { RestaurantForm } from "@/type/restaurantTypes";
import { isAxiosError } from "axios";

export async function createRestaurant(restaurant: RestaurantForm) {
    try {
        const url = '/restaurants/';
        const formData = new FormData();
        formData.append("img", restaurant.logo[0]);
        formData.append("name", restaurant.name);
        formData.append("description", restaurant.description);
        formData.append("address", restaurant.address);
        formData.append("latitude", restaurant.latitude.toString());
        formData.append("longitude", restaurant.longitude.toString());

        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllRestaurants() {
    try {
        const url = '/restaurants/';
        const { data } = await api(url);
        const result = RestaurantsSchema.safeParse(data);

        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getNerbyRestaurants({ position }: { position: Coords }) {
    try {
        const url = `/restaurants/nerby/${position.lat}/${position.lng}`;
        const { data } = await api(url);

        const result = NerbyRestaurantsSchema.safeParse(data);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}