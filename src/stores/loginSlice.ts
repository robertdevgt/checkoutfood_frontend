import type { LoginForm } from "@/type/authTypes";
import type { StateCreator } from "zustand";
import { isAxiosError } from "axios";
import api from "@/lib/axios";

export interface LoginSlice {
    login: (formData: LoginForm) => Promise<string>,
    logout: () => void,
    logedIn: boolean;
}

export const createLoginSlice: StateCreator<LoginSlice, [], []> = (set) => ({
    logedIn: localStorage.getItem('AUTH_TOKEN') ? true : false,
    login: async (formData) => {
        try {
            const url = '/auth/login';

            const { data } = await api.post(url, formData);

            localStorage.setItem('AUTH_TOKEN', data);

            set({
                logedIn: true
            });

            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.error);
            }
        }
    },
    logout: () => {
        localStorage.removeItem('AUTH_TOKEN');
        set({
            logedIn: false
        });
    }
});