import { create } from "zustand";
import { createLoginSlice, type LoginSlice } from "@/stores/loginSlice";
import { createCartSlice, type CartSlice } from "./stores/cartSlice";

export const useAppStore = create<LoginSlice & CartSlice>((...a) => ( {
    ...createLoginSlice(...a),
    ...createCartSlice(...a)
}));