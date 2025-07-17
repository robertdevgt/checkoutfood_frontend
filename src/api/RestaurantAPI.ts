import type { Coords } from "@/components/Map";
import api from "@/lib/axios";
import { ProductsSchema } from "@/schemas/productSchemas";
import { NerbyRestaurantsSchema, RestaurantSchema, RestaurantsSchema } from "@/schemas/restaurantSchemas";
import type { Product, ProductForm } from "@/type/productTypes";
import type { Restaurant, RestaurantForm } from "@/type/restaurantTypes";
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

export async function getRestaurantById({ restaurantId }: { restaurantId: Restaurant['_id'] }) {
    try {
        const url = `/restaurants/${restaurantId}`;
        const { data } = await api(url);

        const result = RestaurantSchema.safeParse(data);

        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllRestaurantProducts({ restaurantId, query }: { restaurantId: Restaurant['_id'], query: string }) {
    try {
        const url = `/restaurants/products/${restaurantId}?query=${query}`;
        const { data } = await api(url);

        const result = ProductsSchema.safeParse(data);

        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAvailableRestaurantProducts({ restaurantId, filters }: { restaurantId: Restaurant['_id'], filters: string }) {
    try {
        const url = `/restaurants/products/${restaurantId}?${filters}&status=true`;
        const { data } = await api(url);

        const result = ProductsSchema.safeParse(data);

        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function addProduct({ product, restaurantId }: { product: ProductForm, restaurantId: Restaurant['_id'] }) {
    try {
        const url = `/restaurants/add-product/${restaurantId}`;
        const formData = new FormData();
        formData.append("img", product.img);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price.toString());
        formData.append("category", product.category);

        const { data } = await api.post(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changeProductStatus({ productId }: { productId: Product['_id'] }) {
    try {
        const url = `/restaurants/updateproduct-status/${productId}`;
        const { data } = await api.patch(url);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}