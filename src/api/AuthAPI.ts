import type { RegisterForm } from "types/authTypes";
import { isAxiosError } from "axios";
import api from "@/lib/axios";

export async function createAccount({ formData }: { formData: RegisterForm }) {
    try {
        const url = '/auth/create-account';
        const { data } = await api.post(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function confirmAccount(token: string) {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post(url, { token });

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function requestNewConfirmationCode(email: string) {
    try {
        const url = '/auth/request-token';

        const { data } = await api.post(url, { email });

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}