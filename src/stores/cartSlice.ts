import type { CartItem, Product } from "@/type/productTypes";
import type { StateCreator } from "zustand";

export interface CartSlice {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    modal: boolean;
    changeModal: () => void;
}

const storedCart = localStorage.getItem('cart');

export const createCartSlice: StateCreator<CartSlice, [], []> = (set, get) => ({
    cart: storedCart ? JSON.parse(storedCart) : [],
    modal: false,
    addToCart: (product) => {
        const cart = get().cart;

        const itemExists = cart.find(item => item.product_id === product._id);
        let updatedCart: CartItem[];

        if (itemExists) {
            updatedCart = cart.map(item => {
                if (item.product_id === product._id) {
                    const newQuantity = item.quantity + 1;
                    return {
                        ...item,
                        quantity: newQuantity,
                        sub_total: newQuantity * item.price
                    }
                }

                return item;
            })
        } else {
            const item: CartItem = {
                product_id: product._id,
                product_name: product.name,
                quantity: 1,
                price: product.price,
                sub_total: 1 * product.price,
                img: product.img
            }

            updatedCart = [...cart, item];
        }

        set(() => ({
            cart: updatedCart,
            modal: true
        }))

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    },
    changeModal: () => {
        const modal = get().modal;
        set({
            modal: !modal
        })
    }
});