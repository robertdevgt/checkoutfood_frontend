import type { StateCreator } from "zustand";

export interface CartSlice {
    cart: []
}

export const createCartSlice: StateCreator<CartSlice, [], []> = () => ({
    cart: []
});