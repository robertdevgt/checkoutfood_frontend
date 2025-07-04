import api from "@/lib/axios";
import { userAddressesSchema } from "@/schemas/userSchemas";
import type { userAddress, userAddressForm } from "@/type/userTypes";
import { isAxiosError } from "axios";

export async function addAddress(formData: userAddressForm) {
    try {
        const url = '/user/add-address';
        const { data } = await api.post(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function getAddresses() {
    try {
        const url = '/user/addresses';
        const { data } = await api(url);
        const result = userAddressesSchema.safeParse(data);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function deleteAddress({ id }: { id: userAddress['_id'] }) {
    try {
        const url = `/user/delete-address/${id}`;
        const { data } = await api.delete(url);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}